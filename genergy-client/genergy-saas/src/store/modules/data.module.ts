import TYPES from '@/store/types';
import { IActionContext, IDataState } from '@/store/interfaces';

import { ArrayUtil } from '@/ts/utils';
import {
    DiscloseFormModel,
    DividendFormModel,
    OperationFormModel,
    GroupModel,
    ProjectTemplateModel
} from '@/ts/models';
import { DataService, ProjectService } from '@/ts/services';

const dataService = new DataService();
const projectService = new ProjectService();
const dataState: IDataState = {
    dividendPeriod: 0,

    discloseParameters: {
        conditions: {
            projectId: '',
            no: '',
            title: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    dividendParameters: {
        conditions: {
            projectId: ''
        },
        pageNum: 1,
        pageSize: 10
    },
    operationParameters: {
        conditions: {
            projectId: '',
            no: '',
            beginTime: '',
            endTime: ''
        },
        pageNum: 1,
        pageSize: 10
    },

    totalCount: 0,
    list: [],

    id: 0,
    status: false,

    project: undefined,
    publishInfo: undefined,
    templateGroups: []
};

export default {
    namespaced: true,
    state: dataState,
    mutations: {
        [TYPES.SET_STATES](state: IDataState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IDataState) {
            state.dividendPeriod = 0;

            state.discloseParameters = {
                conditions: {
                    projectId: '',
                    no: '',
                    title: '',
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.dividendParameters = {
                conditions: {
                    projectId: ''
                },
                pageNum: 1,
                pageSize: 10
            };
            state.operationParameters = {
                conditions: {
                    projectId: '',
                    no: '',
                    beginTime: '',
                    endTime: ''
                },
                pageNum: 1,
                pageSize: 10
            };

            state.totalCount = 0;
            state.list = [];

            state.id = 0;
            state.status = false;

            state.project = undefined;
            state.publishInfo = undefined;
            state.templateGroups = [];
        }
    },
    actions: {
        async fetchDiscloses(context: IActionContext<IDataState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result = await dataService.fetchDiscloses(state.discloseParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        async uploadDisclose(context: IActionContext<IDataState>, discloseForm: DiscloseFormModel): Promise<boolean> {
            return await dataService.uploadDisclose(discloseForm);
        },

        async auditDisclose(context: IActionContext<IDataState>): Promise<boolean> {
            let { id, status } = context.state;
            return await dataService.auditDisclose(id, status);
        },

        async fetchDividends(context: IActionContext<IDataState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result = await dataService.fetchDividends(state.dividendParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        async uploadDividend(context: IActionContext<IDataState>, dividendForm: DividendFormModel): Promise<boolean> {
            return await dataService.uploadDividend(dividendForm);
        },

        async auditDividend(context: IActionContext<IDataState>): Promise<boolean> {
            let { id, status } = context.state;
            return await dataService.auditDividend(id, status);
        },

        async fetchDividendPeriod(context: IActionContext<IDataState>): Promise<void> {
            let { commit, rootState } = context,
                projectId = rootState.projectId;
            if (projectId === undefined) return Promise.reject('项目编号不可以为空');

            try {
                let dividendPeriod = await dataService.fetchDividendPeriod(projectId);
                commit(TYPES.SET_STATES, { dividendPeriod });
            } catch (error) {
                commit(TYPES.SET_STATES, { dividendPeriod: 0 });
                return Promise.reject(error);
            }
        },

        async fetchOperations(context: IActionContext<IDataState>): Promise<void> {
            let { commit, state } = context;
            try {
                let result = await dataService.fetchOperations(state.operationParameters);
                commit(TYPES.SET_STATES, result);
            } catch (error) {
                commit(TYPES.SET_STATES, { totalCount: 0, list: [] });
                return Promise.reject(error);
            }
        },

        async uploadOperation(
            context: IActionContext<IDataState>,
            operationForm: OperationFormModel
        ): Promise<boolean> {
            return await dataService.uploadOperation(operationForm);
        },

        async fetchProject(context: IActionContext<IDataState>, isLoading?: boolean): Promise<void> {
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

        async fetchPublishInfo(context: IActionContext<IDataState>): Promise<void> {
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

        async fetchProjectTemplates(context: IActionContext<IDataState>): Promise<void> {
            let { commit, state } = context,
                project = state.project;
            if (!project || !project.projectType) return;

            try {
                let templates: Array<ProjectTemplateModel> = await projectService.fetchProjectTemplates(
                        project.projectType
                    ),
                    templateGroups: Array<GroupModel<ProjectTemplateModel>> = ArrayUtil.arrayGroup(templates, 'group');

                let values = {};
                (project.projects || []).forEach((item: any) => {
                    values[item.name] = item.value;
                });

                let convertGroups: Array<GroupModel<Array<ProjectTemplateModel>>> = [];
                templateGroups.forEach((templateGroup: GroupModel<ProjectTemplateModel>) => {
                    let items = templateGroup.items || [],
                        count = Math.ceil(items.length / 3),
                        arrs: Array<Array<ProjectTemplateModel>> = [];
                    for (let i = 0; i < count; i++) {
                        let templates: Array<ProjectTemplateModel> = [];
                        for (let j = 0; j < 3; j++) {
                            let index = 3 * i + j,
                                template = items[index];
                            if (template) {
                                template['value'] = values[template.name];
                                templates.push(template);
                            }
                        }
                        arrs.push(templates);
                    }
                    convertGroups.push({ group: templateGroup.group, items: arrs });
                });
                commit(TYPES.SET_STATES, { templateGroups: convertGroups });
                return;
            } catch (error) {
                commit(TYPES.SET_STATES, { templateGroups: [] });
                return Promise.reject(error);
            }
        }
    }
};
