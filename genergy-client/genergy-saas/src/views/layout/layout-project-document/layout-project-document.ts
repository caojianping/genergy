import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component, Watch } from 'vue-property-decorator';

import { IRouteOption } from '@/ts/interfaces';
import { DocumentGroupModel } from '@/ts/models';

import ProjectGuide from '@/components/project-guide';

const documentModule = namespace('document');

@Component({
    name: 'LayoutProjectDocument',
    components: { ProjectGuide }
})
export default class LayoutProjectDocument extends Vue {
    @State('projectId') projectId?: number;
    @State('projectStatus') projectStatus?: number;
    @Action('fetchProjectBrief') fetchProjectBrief!: () => any;
    @documentModule.State('groups') groups!: Array<DocumentGroupModel>;

    menus: Array<IRouteOption> = [];
    selectedKeys: Array<any> = [];

    // 初始化数据
    initData(route: any, hasMenus: boolean = false) {
        let path = route.path || '',
            matches = path.match(/(\/[a-zA-Z0-9]+){4}/g),
            key = matches ? matches[0] : route;
        this.selectedKeys = [key];
        if (hasMenus) {
            this.menus = this.groups.map((group: DocumentGroupModel) => ({
                title: group.name,
                path: `/project/document/items/${group.id}`,
                query: { projectId: String(this.projectId || '') },
                icon: 'folder'
            }));
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
