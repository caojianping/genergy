import Vue from 'vue';
import { namespace, State, Mutation } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { GroupModel, ProjectModel, ProjectTemplateModel, PublishInfoModel } from '@/ts/models';

const dataModule = namespace('data');

@Component({
    name: 'ProjectDataBasic',
    components: {}
})
export default class ProjectDataBasic extends Vue {
    @State('projectId') projectId?: number;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;

    @dataModule.State('project') project?: ProjectModel | null;
    @dataModule.State('publishInfo') publishInfo?: PublishInfoModel | null;
    @dataModule.State('templateGroups') templateGroups!: Array<GroupModel<Array<ProjectTemplateModel>>>;
    @dataModule.Action('fetchProject') fetchProject!: () => any;
    @dataModule.Action('fetchPublishInfo') fetchPublishInfo!: () => any;
    @dataModule.Action('fetchProjectTemplates') fetchProjectTemplates!: () => any;

    runningStatuses: Array<string> = ['建设中', '运行中'];
    publishModes: Array<string> = ['份额', '股份'];

    // 获取数据
    async fetchData() {
        try {
            this.setRootStates({ isFullLoading: true });
            await this.fetchProject();
            await this.fetchProjectTemplates();
            await this.fetchPublishInfo();
            this.setRootStates({ isFullLoading: false });
        } catch (error) {
            this.setRootStates({ isFullLoading: false });
        }
    }

    mounted() {
        this.fetchData();
    }
}
