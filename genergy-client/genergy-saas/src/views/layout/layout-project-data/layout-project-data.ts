import Vue from 'vue';
import { State, Action } from 'vuex-class';
import { Component, Watch } from 'vue-property-decorator';

import { IRouteOption } from '@/ts/interfaces';

import ProjectGuide from '@/components/project-guide';

@Component({
    name: 'LayoutProjectData',
    components: { ProjectGuide }
})
export default class LayoutProjectData extends Vue {
    @State('projectId') projectId?: number;
    @State('projectStatus') projectStatus?: number;
    @Action('fetchProjectBrief') fetchProjectBrief!: () => any;

    menus: Array<IRouteOption> = [];
    selectedKeys: Array<any> = [];

    // 初始化数据
    initData(route: any, hasMenus: boolean = false) {
        let path = route.path || '',
            matches = path.match(/(\/[a-zA-Z]+){3}/g),
            key = matches ? matches[0] : route;
        this.selectedKeys = [key];
        if (hasMenus) {
            let projectId = String(this.projectId || '');
            this.menus = [
                { title: '披露信息', path: '/project/data/disclose', query: { projectId }, icon: 'bell' },
                { title: '分红数据', path: '/project/data/dividend', query: { projectId }, icon: 'money-collect' },
                { title: '运行数据', path: '/project/data/operation', query: { projectId }, icon: 'bar-chart' },
                { title: '基本情况信息', path: '/project/data/basic', query: { projectId }, icon: 'database' }
            ];
        }
        this.fetchProjectBrief();
    }

    created() {
        this.initData(this.$route, true);
    }

    @Watch('$route')
    watchRoute(route: any) {
        this.initData(route, false);
    }
}
