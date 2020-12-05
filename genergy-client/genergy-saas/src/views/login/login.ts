import Vue from 'vue';
import { namespace, State, Mutation, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Util from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { LoginFormModel } from '@/ts/models';

const accountModule = namespace('account');
const documentModule = namespace('document');

@Component({
    name: 'Login',
    components: {}
})
export default class Login extends Vue {
    @State('projectId') projectId?: number;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Action('fetchProjectBriefs') fetchProjectBriefs!: (payload: any) => any;

    @accountModule.State('loginForm') loginForm!: LoginFormModel;
    @accountModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @accountModule.Action('login') loginAction!: () => any;
    @documentModule.Action('fetchDocumentGroups') fetchDocumentGroups!: (isRefresh?: boolean) => any;

    rules: any = {
        companyName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    };

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let loginForm = Util.duplicate(this.loginForm);
        loginForm[key] = value;
        this.setStates({ loginForm });
    }

    // 登录
    async login() {
        try {
            this.setRootStates({ isFullLoading: true });
            let result = await this.loginAction();
            if (!result) {
                this.setRootStates({ isFullLoading: false });
                Prompt.error('登录失败');
            } else {
                await this.fetchProjectBriefs({ isRefresh: true });
                await this.fetchDocumentGroups();
                this.setRootStates({ isFullLoading: false });
                this.$router.push({ path: '/project/overview', query: { projectId: String(this.projectId || '') } });
            }
        } catch (error) {
            this.setRootStates({ isFullLoading: false });
            Prompt.error(error.message || error);
        }
    }

    // 登录
    submit() {
        let $form: any = this.$refs.form;
        $form.validate(valid => {
            if (valid) this.login();
            else return false;
        });
    }

    // 企业名称获取焦点
    companyNameFocus() {
        let self = this;
        self.$nextTick(function() {
            let $companyName: any = self.$refs.companyName;
            if ($companyName) {
                $companyName.focus();
            }
        });
    }

    mounted() {
        // Util.jumpTop();
        // this.companyNameFocus();
    }
}
