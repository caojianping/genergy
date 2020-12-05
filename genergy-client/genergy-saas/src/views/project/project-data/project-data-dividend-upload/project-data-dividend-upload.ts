import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Util from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { TEMPLATE_FILES } from '@/ts/config';
import { DividendFormModel } from '@/ts/models';

const dataModule = namespace('data');

@Component({
    name: 'ProjectDataDividendUpload',
    components: {}
})
export default class ProjectDataDividendUpload extends Vue {
    @State('projectId') projectId?: number;
    @dataModule.State('dividendPeriod') dividendPeriod!: number;
    @dataModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @dataModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @dataModule.Action('fetchDividendPeriod') fetchDividendPeriod!: () => any;
    @dataModule.Action('uploadDividend') uploadDividendAction!: (dividendForm: DividendFormModel) => any;

    labelCol: any = { span: 4 };
    wrapperCol: any = { span: 14 };
    keys: any = {
        totalIncome: '本期累计收益',
        operationExpenses: '运营支出',
        fundReservation: '资金预留',
        otherExpenses: '其它支出',
        dividendIncome: '本期可分红收益'
    };
    validateDigit(rule: any, value: any, callback: any) {
        if (value < 0) {
            let msg = this.keys[rule.field];
            callback(new Error(msg + '不可以小于0'));
        } else {
            callback();
        }
    }
    rules: any = {
        beginTime: [{ required: true, message: '请输入收益开始时间', trigger: 'change' }],
        endTime: [{ required: true, message: '请输入收益结束时间', trigger: 'change' }],
        totalIncome: [
            { required: true, message: '请输入本期累计收益', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ],
        operationExpenses: [
            { required: true, message: '请输入运营支出', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ],
        fundReservation: [
            { required: true, message: '请输入资金预留', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ],
        otherExpenses: [
            { required: true, message: '请输入其它支出', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ],
        dividendIncome: [
            { required: true, message: '请输入本期可分红收益', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ]
    };
    dividendForm: DividendFormModel = new DividendFormModel();
    files: Array<any> = [];
    dividendTemplate: string = TEMPLATE_FILES.DIVIDEND_TEMPLATE;

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

    // 上传分红数据
    async uploadDividend() {
        try {
            let dividendForm = Util.duplicate(this.dividendForm);
            dividendForm.files = this.files;

            let result = await this.uploadDividendAction(dividendForm);
            if (!result) Prompt.error('分红数据上传失败');
            else {
                Prompt.success('分红数据上传成功');
                this.$router.push({
                    path: '/project/data/dividend',
                    query: { projectId: String(this.projectId || '') }
                });
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 提交分红数据
    submit() {
        let $dividendForm: any = this.$refs.dividendForm;
        $dividendForm.validate(valid => {
            if (valid) this.uploadDividend();
            else return false;
        });
    }

    // 重置分红数据
    reset() {
        let $dividendForm: any = this.$refs.dividendForm;
        $dividendForm.resetFields();
    }

    // 初始化数据
    initData() {
        let projectId: number | undefined = this.projectId,
            dividendForm = new DividendFormModel();
        if (projectId) {
            dividendForm.projectId = projectId;
        }
        this.dividendForm = dividendForm;
    }

    // 获取数据
    async fetchData() {
        try {
            await this.fetchDividendPeriod();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData();
    }
}
