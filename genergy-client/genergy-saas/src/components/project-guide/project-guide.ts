import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component, Prop } from 'vue-property-decorator';

const documentModule = namespace('document');

@Component({
    name: 'ProjectGuide',
    components: {}
})
export default class ProjectGuide extends Vue {
    @Prop() readonly type!: number;

    @State('projectId') projectId?: number;
    @State('projectStatus') projectStatus?: number;
    @documentModule.Getter('firstGroupId') firstGroupId?: number;

    //     [0, '新建'],
    //     [10, '待审核'],
    //     [15, '审核失败'],
    //     [20, '审核成功'],
    //     [30, '项目尽调中'],
    //     [40, '发行准备中'],
    //     [50, '资产募集中'],
    //     [60, '募集完成'],
    //     [65, '募集失败']

    // 添加项目
    addProject() {
        this.$router.push({ path: '/project/create', query: { projectId: String(this.projectId || '') } });
    }

    // 前往首页
    goHome() {
        this.$router.push({ path: '/project/overview', query: { projectId: String(this.projectId || '') } });
    }

    // 前往尽调文件页面
    goDiligence() {
        this.$router.push({
            path: `/project/document/items/${this.firstGroupId || ''}`,
            query: { projectId: String(this.projectId || '') }
        });
    }

    // 前往披露信息上传页面
    goDisclose() {
        this.$router.push({
            path: '/project/data/disclose/upload',
            query: { projectId: String(this.projectId || '') }
        });
    }
}
