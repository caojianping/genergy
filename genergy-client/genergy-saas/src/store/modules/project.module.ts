import TYPES from '@/store/types';
import { IActionContext, IProjectState } from '@/store/interfaces';

import Util, { ArrayUtil } from '@/ts/utils';
import { ISelectOption } from '@/ts/interfaces';
import {
    GroupModel,
    ProjectFormModel,
    ProjectTypeModel,
    ProjectTemplateModel,
    DocumentItemModel,
    PublishFormModel,
    NotifyModel,
    DocumentGroupModel,
    UserModel
} from '@/ts/models';
import { ProjectHelper } from '@/ts/helpers';
import { ProjectService, DocumentService, UserService } from '@/ts/services';

const projectService = new ProjectService();
const documentService = new DocumentService();
const userService = new UserService();
const projectState: IProjectState = {
    notifies: [],
    projectStats: undefined,
    project: undefined,
    publishInfo: undefined,
    documentGroups: [],
    users: [],

    types: [],
    templateGroups: [],

    basicGroupId: undefined,
    itemGroups: [],
    itemId: undefined,
    fileId: undefined
};

export default {
    namespaced: true,
    state: projectState,
    getters: {
        typeOptions(state: IProjectState): Array<ISelectOption> {
            return state.types.map((type: ProjectTypeModel) => ({
                label: type.name,
                value: type.id
            }));
        }
    },
    mutations: {
        [TYPES.SET_STATES](state: IProjectState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IProjectState) {
            state.notifies = [];
            state.projectStats = undefined;
            state.project = undefined;
            state.publishInfo = undefined;
            state.documentGroups = [];
            state.users = [];

            state.types = [];
            state.templateGroups = [];

            state.basicGroupId = undefined;
            state.itemGroups = [];
            state.itemId = undefined;
            state.fileId = undefined;
        }
    },
    actions: {
        async fetchNotifies(context: IActionContext<IProjectState>): Promise<void> {
            let { commit, rootState } = context,
                projectId = rootState.projectId;
            if (projectId === undefined) {
                commit(TYPES.SET_STATES, { notifies: [] });
                return;
            }

            try {
                let notifies: Array<NotifyModel> = await projectService.fetchNotifies(projectId);
                commit(TYPES.SET_STATES, { notifies });
                return;
            } catch (error) {
                commit(TYPES.SET_STATES, { notifies: [] });
                return Promise.reject(error);
            }
        },

        async fetchProjectStats(context: IActionContext<IProjectState>): Promise<void> {
            let { commit, rootState } = context,
                projectId = rootState.projectId;
            if (projectId === undefined) {
                commit(TYPES.SET_STATES, { projectStats: null });
                return;
            }

            try {
                let projectStats = await projectService.fetchProjectStats(projectId);
                commit(TYPES.SET_STATES, { projectStats });
                return;
            } catch (error) {
                commit(TYPES.SET_STATES, { projectStats: null });
                return Promise.reject(error);
            }
        },

        async fetchProject(context: IActionContext<IProjectState>, isLoading?: boolean): Promise<void> {
            let { commit, rootState } = context,
                projectId = rootState.projectId;
            if (projectId === undefined) {
                commit(TYPES.SET_STATES, { project: null });
                return;
            }

            try {
                let project = await projectService.fetchProject(projectId, isLoading);
                commit(TYPES.SET_STATES, { project });
                return;
            } catch (error) {
                commit(TYPES.SET_STATES, { project: null });
                return Promise.reject(error);
            }
        },

        async fetchDocumentGroups(context: IActionContext<IProjectState>): Promise<void> {
            let { commit, rootState } = context,
                projectType = rootState.projectType;
            if (projectType === undefined) {
                commit(TYPES.SET_STATES, { documentGroups: [] });
                return;
            }

            try {
                let groups: Array<DocumentGroupModel> = await documentService.fetchDocumentGroups(projectType);
                commit(TYPES.SET_STATES, { documentGroups: groups });
                return;
            } catch (error) {
                commit(TYPES.SET_STATES, { documentGroups: [] });
                return Promise.reject(error);
            }
        },

        async fetchUsers(context: IActionContext<IProjectState>): Promise<void> {
            let commit = context.commit;
            try {
                let users: Array<UserModel> = await userService.fetchUsers();
                commit(TYPES.SET_STATES, { users });
                return;
            } catch (error) {
                commit(TYPES.SET_STATES, { users: [] });
                return Promise.reject(error);
            }
        },

        async fetchPublishInfo(context: IActionContext<IProjectState>): Promise<void> {
            let { commit, rootState } = context,
                projectId = rootState.projectId;
            if (projectId === undefined) {
                commit(TYPES.SET_STATES, { publishInfo: null });
                return;
            }

            try {
                let publishInfo = await projectService.fetchPublishInfo(projectId);
                commit(TYPES.SET_STATES, { publishInfo });
                return;
            } catch (error) {
                commit(TYPES.SET_STATES, { publishInfo: null });
                return Promise.reject(error);
            }
        },

        async fetchProjectTypes(context: IActionContext<IProjectState>): Promise<void> {
            let commit = context.commit;
            try {
                let types: Array<ProjectTypeModel> = await projectService.fetchProjectTypes();
                commit(TYPES.SET_STATES, { types });
                return;
            } catch (error) {
                commit(TYPES.SET_STATES, { types: [] });
                return Promise.reject(error);
            }
        },

        async fetchProjectTemplates(
            context: IActionContext<IProjectState>,
            projectForm: ProjectFormModel
        ): Promise<ProjectFormModel | null> {
            let commit = context.commit,
                oldProjectForm = Util.duplicate(projectForm);
            if (!oldProjectForm.projectType) {
                commit(TYPES.SET_STATES, { templateGroups: [] });
                return null;
            }

            try {
                let projectType: any = oldProjectForm.projectType,
                    templates: Array<ProjectTemplateModel> = await projectService.fetchProjectTemplates(projectType),
                    templateGroups: Array<GroupModel<ProjectTemplateModel>> = ArrayUtil.arrayGroup(templates, 'group');
                commit(TYPES.SET_STATES, { templateGroups });

                let newProjectForm = ProjectHelper.buildProjectFormByTemplates(oldProjectForm, templates);
                return newProjectForm;
            } catch (error) {
                commit(TYPES.SET_STATES, { templateGroups: [] });
                return Promise.reject(error);
            }
        },

        async saveProject(
            context: IActionContext<IProjectState>,
            projectForm: ProjectFormModel
        ): Promise<number | null> {
            return await projectService.saveProject(projectForm);
        },

        async fetchDocumentItems(context: IActionContext<IProjectState>): Promise<void> {
            let { commit, state, rootState } = context,
                projectId = rootState.projectId,
                basicGroupId = state.basicGroupId;
            if (projectId === undefined || basicGroupId === undefined) {
                commit(TYPES.SET_STATES, { itemGroups: [] });
                return;
            }

            try {
                let items: Array<DocumentItemModel> = await documentService.fetchDocumentItems(
                        projectId,
                        basicGroupId,
                        false
                    ),
                    itemGroups: Array<GroupModel<DocumentItemModel>> = ArrayUtil.arrayGroup(items, 'group');
                commit(TYPES.SET_STATES, { itemGroups });
                return;
            } catch (error) {
                commit(TYPES.SET_STATES, { itemGroups: [] });
                return Promise.reject(error);
            }
        },

        async publishProject(context: IActionContext<IProjectState>, publishForm: PublishFormModel): Promise<boolean> {
            return await projectService.publishProject(publishForm);
        }
    }
};
