import Vue from 'vue';
import { State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

@Component({
    name: 'Error404',
    components: {}
})
export default class Error404 extends Vue {
    @State('projectId') projectId?: number;

    // 返回首页
    goHome() {
        this.$router.push({ path: '/project/overview', query: { projectId: String(this.projectId || '') } });
    }
}
