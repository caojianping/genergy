import Vue from 'vue';
import Vuex from 'vuex';

import TYPES from './types';
import { IActionContext, IRootState } from './interfaces';

import { ArrayUtil } from '@/ts/utils';
import { ProjectSettingType } from '@/ts/config';
import { ISelectOption } from '@/ts/interfaces';
import { ProjectBriefModel } from '@/ts/models';
import { ProjectHelper } from '@/ts/helpers';
import { ProjectService } from '@/ts/services';

import accountModule from './modules/account.module';
import projectModule from './modules/project.module';
import dataModule from './modules/data.module';
import documentModule from './modules/document.module';

Vue.use(Vuex);

const projectService = new ProjectService();
const rootState: IRootState = {
    tokenInfo: undefined,

    isFullLoading: false,
    isPageLoading: false,
    pageSizeOptions: ['10', '50', '100', '200', '500', '1000'],

    projectBriefs: [],
    projectId: undefined,
    projectType: undefined,
    projectStatus: undefined
};

export default new Vuex.Store({
    strict: false,
    modules: {
        account: accountModule,
        project: projectModule,
        data: dataModule,
        document: documentModule
    },
    state: rootState,
    getters: {
        projectOptions(state: IRootState): Array<ISelectOption> {
            return state.projectBriefs.map((projectBrief: ProjectBriefModel) => ({
                label: projectBrief.name,
                value: projectBrief.id
            }));
        },
        projectName(state: IRootState): string {
            let projectId = state.projectId,
                projectBrief: ProjectBriefModel | undefined = state.projectBriefs.filter(
                    (item: ProjectBriefModel) => item.id === projectId
                )[0];
            return projectBrief ? projectBrief.name : '';
        }
    },
    mutations: {
        [TYPES.SET_LOADING](state: IRootState, payload: { key: string; value: boolean }) {
            const { key, value } = payload;
            state[key] = value;
        },
        [TYPES.SET_STATES](state: IRootState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.SET_PROJECT_BRIEFS](
            state: IRootState,
            payload: {
                settingType: ProjectSettingType;
                projectBriefs?: Array<ProjectBriefModel>;
                projectId?: number;
            }
        ) {
            let settingType = payload.settingType,
                payloadProjectBriefs = payload.projectBriefs,
                payloadProjectId = payload.projectId;
            if (settingType === ProjectSettingType.Init) {
                // 初始化时，payload的projectBriefs、projectId均为全新数据；
                let projectBriefs = payloadProjectBriefs || [],
                    projectBrief: ProjectBriefModel | undefined =
                        payloadProjectId !== undefined
                            ? projectBriefs.filter((item: ProjectBriefModel) => item.id === payloadProjectId)[0]
                            : projectBriefs[0];
                state.projectBriefs = projectBriefs;
                state.projectId = projectBrief ? projectBrief.id : undefined;
                state.projectType = projectBrief ? projectBrief.projectType : undefined;
            } else if (settingType === ProjectSettingType.Refresh) {
                // 初始化时，payload的projectBriefs取缓存、projectId取query.projectId；
                if (payloadProjectBriefs) {
                    if (!ArrayUtil.isEqual(payloadProjectBriefs, state.projectBriefs)) {
                        state.projectBriefs = payloadProjectBriefs;
                    }
                    let projectBriefs = state.projectBriefs,
                        projectBrief: ProjectBriefModel | undefined =
                            payloadProjectId !== undefined
                                ? projectBriefs.filter((item: ProjectBriefModel) => item.id === payloadProjectId)[0]
                                : projectBriefs[0];
                    state.projectId = projectBrief ? projectBrief.id : undefined;
                    state.projectType = projectBrief ? projectBrief.projectType : undefined;
                }
            } else if (settingType === ProjectSettingType.Toggle) {
                // 初始化时，payload的projectBriefs为undefined、projectId为下拉列表值；
                if (payloadProjectId !== undefined) {
                    let projectBriefs = state.projectBriefs,
                        projectBrief: ProjectBriefModel | undefined = projectBriefs.filter(
                            (item: ProjectBriefModel) => item.id === payloadProjectId
                        )[0];
                    state.projectId = projectBrief ? projectBrief.id : undefined;
                    state.projectType = projectBrief ? projectBrief.projectType : undefined;
                }
            }
        },
        [TYPES.CLEAR_STATES](state: IRootState) {
            state.tokenInfo = undefined;

            state.isFullLoading = false;
            state.isPageLoading = false;

            state.projectBriefs = [];
            state.projectId = undefined;
            state.projectType = undefined;
            state.projectStatus = undefined;
        }
    },
    actions: {
        async fetchProjectBriefs(
            context: IActionContext<IRootState>,
            payload: {
                isRefresh?: boolean;
                projectId?: boolean;
            }
        ): Promise<void> {
            let { commit, state } = context,
                { isRefresh, projectId } = payload;
            if (!isRefresh && state.projectBriefs.length > 0) return;

            try {
                let projectBriefs: Array<ProjectBriefModel> = await projectService.fetchProjectBriefs();
                ProjectHelper.setProjectBriefs(projectBriefs);
                if (!projectId) {
                    commit(TYPES.SET_PROJECT_BRIEFS, {
                        settingType: ProjectSettingType.Init,
                        projectBriefs: projectBriefs,
                        projectId: undefined
                    });
                } else {
                    commit(TYPES.SET_STATES, { projectBriefs });
                    commit(TYPES.SET_PROJECT_BRIEFS, {
                        settingType: ProjectSettingType.Toggle,
                        projectId: projectId
                    });
                }
            } catch (error) {
                commit(TYPES.SET_STATES, {
                    projectBriefs: [],
                    projectId: undefined,
                    projectType: undefined
                });
                return Promise.reject(error);
            }
        },
        async fetchProjectBrief(context: IActionContext<IRootState>): Promise<void> {
            let { commit, state } = context,
                projectId = state.projectId;
            if (!projectId) return;

            try {
                let projectBrief: ProjectBriefModel | null = await projectService.fetchProjectBrief(projectId);
                if (projectBrief) {
                    commit(TYPES.SET_STATES, { projectStatus: projectBrief.status });
                }
            } catch (error) {
                commit(TYPES.SET_STATES, { projectStatus: undefined });
                return Promise.reject(error);
            }
        }
    }
});
