import TYPES from '@/store/types';
import { IActionContext, IDocumentState } from '@/store/interfaces';

import { ArrayUtil } from '@/ts/utils';
import { GroupModel, DocumentGroupModel, DocumentItemModel, DocumentFileModel } from '@/ts/models';
import { DocumentHelper } from '@/ts/helpers';
import { DocumentService } from '@/ts/services';

const documentService = new DocumentService();
const documentState: IDocumentState = {
    groups: [],
    groupId: undefined,

    items: [],
    itemGroups: [],
    itemId: undefined,

    files: [],
    fileId: undefined
};

export default {
    namespaced: true,
    state: documentState,
    getters: {
        firstGroupId(state: IDocumentState): number | undefined {
            let group = state.groups[0];
            return group ? group.id : undefined;
        },
        lastGroupId(state: IDocumentState): number | undefined {
            let group = state.groups[state.groups.length - 1];
            return group ? group.id : undefined;
        },
        groupName(state: IDocumentState): string {
            let group = state.groups.filter((item: DocumentGroupModel) => item.id === state.groupId)[0];
            return group ? group.name : '';
        },
        itemName(state: IDocumentState): string {
            let item = state.items.filter((item: DocumentItemModel) => item.id === state.itemId)[0];
            return item ? item.name : '';
        },
        itemAccept(state: IDocumentState): string {
            let item = state.items.filter((item: DocumentItemModel) => item.id === state.itemId)[0];
            return DocumentHelper.getUploadAccept(item ? item.suffix : '');
        }
    },
    mutations: {
        [TYPES.SET_STATES](state: IDocumentState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.SET_DOCUMENT_GROUPS](state: IDocumentState, payload: any) {
            let groups = payload.groups,
                group: DocumentGroupModel | undefined = groups[0];
            state.groups = groups;
            state.groupId = group ? group.id : undefined;
        },
        [TYPES.CLEAR_STATES](state: IDocumentState) {
            state.groups = [];
            state.groupId = undefined;

            state.items = [];
            state.itemGroups = [];
            state.itemId = undefined;

            state.files = [];
            state.fileId = undefined;
        }
    },
    actions: {
        async fetchDocumentGroups(context: IActionContext<IDocumentState>, isRefresh: boolean = false): Promise<void> {
            let { commit, state, rootState } = context,
                projectType = rootState.projectType;
            if (projectType === undefined) return;
            if (!isRefresh && state.groups.length > 0) return;

            try {
                let groups: Array<DocumentGroupModel> = await documentService.fetchDocumentGroups(projectType);
                DocumentHelper.setDocumentGroups(groups);
                commit(TYPES.SET_DOCUMENT_GROUPS, { groups });
                return;
            } catch (error) {
                commit(TYPES.SET_STATES, { groups: [], groupId: undefined });
                return Promise.reject(error);
            }
        },

        async fetchDocumentItems(context: IActionContext<IDocumentState>): Promise<void> {
            let { commit, state, rootState } = context,
                projectId = rootState.projectId,
                groupId = state.groupId;
            if (projectId === undefined) return Promise.reject('异常的项目编号');
            if (groupId === undefined) return Promise.reject('异常的文档分组编号');

            if (projectId === undefined || groupId === undefined) {
                commit(TYPES.SET_STATES, { items: [], itemGroups: [] });
                return;
            }

            try {
                let items: Array<DocumentItemModel> = await documentService.fetchDocumentItems(
                        projectId,
                        groupId,
                        true
                    ),
                    itemGroups: Array<GroupModel<DocumentItemModel>> = ArrayUtil.arrayGroup(items, 'group');
                commit(TYPES.SET_STATES, { items, itemGroups });
                return;
            } catch (error) {
                commit(TYPES.SET_STATES, { items: [], itemGroups: [] });
                return Promise.reject(error);
            }
        },

        async fetchDocumentFiles(context: IActionContext<IDocumentState>, isLoading?: boolean): Promise<void> {
            let { commit, state, rootState } = context,
                projectId = rootState.projectId,
                itemId = state.itemId;
            // if (projectId === undefined) return Promise.reject('异常的项目编号');
            // if (itemId === undefined) return Promise.reject('异常的文档项目编号');

            if (projectId === undefined || itemId === undefined) {
                commit(TYPES.SET_STATES, { files: [] });
                return;
            }

            try {
                let files: Array<DocumentFileModel> = await documentService.fetchDocumentFiles(
                    projectId,
                    itemId,
                    isLoading
                );
                commit(TYPES.SET_STATES, { files });
                return;
            } catch (error) {
                commit(TYPES.SET_STATES, { files: [] });
                return Promise.reject(error);
            }
        },

        async deleteFile(
            context: IActionContext<IDocumentState>,
            payload: {
                fileId: number;
                isLoading?: boolean;
            }
        ): Promise<boolean> {
            return await documentService.deleteFile(payload.fileId, payload.isLoading);
        },

        async confirmDiligence(context: IActionContext<IDocumentState>): Promise<boolean> {
            let projectId = context.rootState.projectId;
            if (projectId === undefined) return Promise.reject('异常的项目编号');
            return await documentService.confirmDiligence(projectId);
        }
    }
};
