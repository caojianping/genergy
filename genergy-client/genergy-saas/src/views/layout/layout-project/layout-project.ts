import Vue from 'vue';
import { namespace, State, Getter, Mutation } from 'vuex-class';
import { Component, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { ProjectSettingType } from '@/ts/config';
import { IRouteOption, ISelectOption } from '@/ts/interfaces';

const documentModule = namespace('document');

@Component({
    name: 'LayoutProject',
    components: {}
})
export default class LayoutProject extends Vue {
    @State('projectId') projectId?: number;
    @Getter('projectOptions') projectOptions!: Array<ISelectOption>;
    @Mutation(TYPES.SET_PROJECT_BRIEFS) setProjectBriefs!: (payload: any) => any;
    @documentModule.Getter('firstGroupId') firstGroupId?: number;

    navs: Array<IRouteOption> = [];
    currentPath: string = '';

    // 切换项目
    toggleProject(value: number) {
        this.setProjectBriefs({ settingType: ProjectSettingType.Toggle, projectId: value });
        this.setNavs();
        this.$router.push({ path: '/project/overview', query: { projectId: String(value) } });
    }

    // 添加项目
    addProject() {
        this.$router.push({ path: '/project/create', query: { projectId: String(this.projectId || '') } });
    }

    // 判断项目是否更新
    isProjectRefresh() {
        let newProjectId = this.projectId,
            oldProjectId = (this.navs[0].query || {}).projectId;
        return newProjectId !== oldProjectId;
    }

    // 设置导航栏
    setNavs() {
        let projectId = String(this.projectId || ''),
            firstGroupId = String(this.firstGroupId || '');
        this.navs = [
            // { title: '概况', path: '/project/overview', query: { projectId } },
            { title: '首页', path: '/project/overview', query: { projectId }, key: '/project/overview' },
            { title: '发行项目', path: '/project/publish', query: { projectId }, key: '/project/publish' },
            { title: '数据中心', path: '/project/data/disclose', query: { projectId }, key: '/project/data' },
            {
                title: '文档中心',
                path: `/project/document/items/${firstGroupId}`,
                query: { projectId },
                key: '/project/document'
            },
            { title: '动态', path: '/project/dynamic', query: { projectId }, key: '/project/dynamic' }
        ];
    }

    // 初始化数据
    initData(route: any, hasNavs: boolean = false) {
        this.currentPath = route.path;
        (hasNavs || this.isProjectRefresh()) && this.setNavs();
    }

    created() {
        this.initData(this.$route, true);
    }

    @Watch('$route')
    watchRoute(route: any) {
        this.initData(route, false);
    }
}
