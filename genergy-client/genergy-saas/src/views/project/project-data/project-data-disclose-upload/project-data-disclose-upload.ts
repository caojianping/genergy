import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Util from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { TEMPLATE_FILES } from '@/ts/config';
import { DiscloseFormModel } from '@/ts/models';

const dataModule = namespace('data');

@Component({
    name: 'ProjectDataDiscloseUpload',
    components: {}
})
export default class ProjectDataDiscloseUpload extends Vue {
    @State('projectId') projectId?: number;
    @dataModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @dataModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @dataModule.Action('uploadDisclose') uploadDiscloseAction!: (discloseForm: DiscloseFormModel) => any;

    labelCol: any = { span: 4 };
    wrapperCol: any = { span: 14 };
    rules: any = {
        title: [{ required: true, message: '请输入内容标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容描述', trigger: 'blur' }]
    };
    discloseForm: DiscloseFormModel = new DiscloseFormModel();
    files: Array<any> = [];
    discloseTemplate: string = TEMPLATE_FILES.DISCLOSE_TEMPLATE;

    // 处理上传控件remove事件
    handleUploadRemove(file: any) {
        let files = this.files,
            index = files.indexOf(file);
        files.splice(index, 1);
        this.files = files;
    }

    // 处理上传控件before事件
    handleUploadBefore(file: any) {
        let files = [...this.files, file];
        this.files = files;
        return false;
    }

    // 上传披露信息表单
    async uploadDisclose() {
        try {
            let discloseForm = Util.duplicate(this.discloseForm);
            discloseForm.files = this.files;

            let result = await this.uploadDiscloseAction(discloseForm);
            if (!result) Prompt.error('披露信息上传失败');
            else {
                Prompt.success('披露信息上传成功');
                this.$router.push({
                    path: '/project/data/disclose',
                    query: { projectId: String(this.projectId || '') }
                });
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 提交披露信息
    submit() {
        let $discloseForm: any = this.$refs.discloseForm;
        $discloseForm.validate(valid => {
            if (valid) this.uploadDisclose();
            else return false;
        });
    }

    // 重置披露信息
    reset() {
        let $discloseForm: any = this.$refs.discloseForm;
        $discloseForm.resetFields();
    }

    // 初始化数据
    initData() {
        let projectId: number | undefined = this.projectId,
            discloseForm = new DiscloseFormModel();
        if (projectId) {
            discloseForm.projectId = projectId;
        }
        this.discloseForm = discloseForm;
    }

    created() {
        this.initData();
    }
}
