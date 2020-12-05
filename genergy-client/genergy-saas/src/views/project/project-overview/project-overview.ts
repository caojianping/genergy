import Vue from 'vue';
import { namespace, State, Getter, Mutation } from 'vuex-class';
import { Component, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import {
    ProjectBriefModel,
    ProjectModel,
    ProjectStatsModel,
    NotifyModel,
    DocumentGroupModel,
    UserModel,
    PublishInfoModel
} from '@/ts/models';
import { LinkType } from '@/ts/config';

const projectModule = namespace('project');
const documentModule = namespace('document');

@Component({
    name: 'ProjectOverview',
    components: {}
})
export default class ProjectOverview extends Vue {
    @State('projectBriefs') projectBriefs!: Array<ProjectBriefModel>;
    @State('projectId') projectId?: number;
    @Getter('projectName') projectName!: string;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;

    @documentModule.State('groupId') groupId?: number;
    @documentModule.Getter('firstGroupId') firstGroupId?: number;

    @projectModule.State('notifies') notifies!: Array<NotifyModel>;
    @projectModule.State('projectStats') projectStats?: ProjectStatsModel | null;
    @projectModule.State('project') project?: ProjectModel | null;
    @projectModule.State('documentGroups') documentGroups!: Array<DocumentGroupModel>;
    @projectModule.State('users') users!: Array<UserModel>;
    @projectModule.State('publishInfo') publishInfo?: PublishInfoModel | null;
    @projectModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @projectModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @projectModule.Action('fetchNotifies') fetchNotifies!: () => any;
    @projectModule.Action('fetchProjectStats') fetchProjectStats!: () => any;
    @projectModule.Action('fetchProject') fetchProject!: (isLoading?: boolean) => any;
    @projectModule.Action('fetchDocumentGroups') fetchDocumentGroups!: () => any;
    @projectModule.Action('fetchUsers') fetchUsers!: () => any;
    @projectModule.Action('fetchPublishInfo') fetchPublishInfo!: () => any;

    projectStatusNames: Map<number, string> = new Map([
        [0, '新建'],
        [10, '待审核'],
        [15, '审核失败'],
        [20, '审核成功'],
        [30, '项目尽调中'],
        [40, '发行准备中'],
        [50, '资产募集中'],
        [60, '募集完成'],
        [65, '募集失败']
    ]);
    projectStatusColors: Map<number, string> = new Map([
        [0, 'black'],
        [10, 'gray'],
        [15, 'red'],
        [20, 'green'],
        [30, 'gray'],
        [40, 'blue'],
        [50, 'orange'],
        [60, 'green'],
        [65, 'red']
    ]);
    publishModes: Array<string> = ['份额', '股份'];
    publishStatusNames: Array<string> = ['未开始', '募集中', '募集完成', '募集失败'];
    publishStatusColors: Array<string> = ['gray', 'blue', 'green', 'red'];

    // 未开发
    undevelop() {
        this.$message.info('偶们正在快马加鞭开发中，敬请期待……');
    }

    // 跳转页面
    goPage(linkType: LinkType) {
        let path = [
            `/project/document/items/${this.firstGroupId || ''}`,
            '/project/data/disclose/upload',
            '/project/data/operation/upload',
            '/project/publish'
        ][linkType - 1];
        if (!path) return;

        this.$router.push({ path: path, query: { projectId: String(this.projectId || '') } });
    }

    // 获取数据
    async fetchData() {
        try {
            this.setRootStates({ isFullLoading: true });
            await this.fetchNotifies();
            await this.fetchProjectStats();
            await this.fetchProject(false);
            await this.fetchDocumentGroups();
            await this.fetchUsers();
            await this.fetchPublishInfo();
            this.setRootStates({ isFullLoading: false });
        } catch (error) {
            this.setRootStates({ isFullLoading: false });
        }
    }

    mounted() {
        this.fetchData();
    }

    @Watch('$route')
    watchRoute(route: any) {
        this.fetchData();
    }
}
