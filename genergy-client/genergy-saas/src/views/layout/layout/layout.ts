import Vue from 'vue';
import { namespace, State, Mutation } from 'vuex-class';
import { Component, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { DigitUtil } from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ProjectSettingType } from '@/ts/config';
import { IRouteOption } from '@/ts/interfaces';
import { TokenInfo } from '@/ts/models';
import { DocumentHelper, ProjectHelper } from '@/ts/helpers';

const documentModule = namespace('document');
const accountModule = namespace('account');

@Component({
    name: 'Layout',
    components: {}
})
export default class Layout extends Vue {
    @State('tokenInfo') tokenInfo?: TokenInfo | null;
    @State('projectId') projectId?: number;
    @Mutation(TYPES.SET_PROJECT_BRIEFS) setProjectBriefs!: (payload: any) => any;
    @documentModule.State('groupId') groupId?: number;
    @documentModule.Mutation(TYPES.SET_DOCUMENT_GROUPS) setDocumentGroups!: (payload: any) => any;
    @accountModule.Action('logout') logoutAction!: () => any;

    navs: Array<IRouteOption> = [];
    currentPath: string = '';

    // 退出
    async logout() {
        try {
            let result = await this.logoutAction();
            if (!result) this.$message.error('退出失败');
            else {
                this.$message.success('退出成功，请重新登录');
                this.$router.push('/login');
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    initData(route: any, hasNavs: boolean = false) {
        this.currentPath = route.path;
        if (hasNavs) {
            let queryId: any = DigitUtil.digitConvert(route.query.projectId),
                projectId = this.projectId || queryId || '';
            this.setProjectBriefs({
                settingType: ProjectSettingType.Refresh,
                projectBriefs: ProjectHelper.getProjectBriefs(),
                projectId
            });
            this.setDocumentGroups({ groups: DocumentHelper.getDocumentGroups() });
            this.navs = [
                { title: '偶的地盘', path: '/home', key: '/home' },
                { title: '项目', path: '/project/overview', query: { projectId: String(projectId) }, key: '/project' }
            ];
        }
    }

    created() {
        console.log('Layout created:', this.tokenInfo);
        this.initData(this.$route, true);
    }

    @Watch('$route')
    watchRoute(route: any) {
        this.initData(route, false);
    }
}
