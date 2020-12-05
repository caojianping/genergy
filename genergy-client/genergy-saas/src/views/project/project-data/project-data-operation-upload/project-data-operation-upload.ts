import Vue from 'vue';
import { namespace, State, Getter } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Util from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { TEMPLATE_FILES } from '@/ts/config';
import { ISelectOption } from '@/ts/interfaces';
import { OperationFormModel } from '@/ts/models';

const dataModule = namespace('data');

@Component({
    name: 'ProjectDataOperationUpload',
    components: {}
})
export default class ProjectDataOperationUpload extends Vue {
    @State('projectId') projectId?: number;
    @Getter('projectName') projectName!: string;
    @dataModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @dataModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @dataModule.Action('uploadOperation') uploadOperationAction!: (operationForm: OperationFormModel) => any;

    weatherOptions: Array<ISelectOption> = [
        { label: '晴', value: '晴' },
        { label: '多云', value: '多云' },
        { label: '阴', value: '阴' },
        { label: '小雨', value: '小雨' },
        { label: '小雪', value: '小雪' }
    ];

    labelCol: any = { span: 4 };
    wrapperCol: any = { span: 14 };
    keys: any = {
        sunshineDuration: '日照时长',
        totalPower: '当日发电总量',
        sellPower: '当日上网电量',
        minimumTemperature: '最低气温',
        maximumTemperature: '最高气温'
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
        date: [{ required: true, message: '请输入数据日期', trigger: 'change' }],
        sunshineDuration: [
            { required: true, message: '请输入日照时长', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ],
        totalPower: [
            { required: true, message: '请输入当日发电总量', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ],
        sellPower: [
            { required: true, message: '请输入当日上网电量', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ],
        minimumTemperature: [
            { required: true, message: '请输入最低气温', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ],
        maximumTemperature: [
            { required: true, message: '请输入最高气温', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ],
        weather: [{ required: true, message: '请输入天气状况', trigger: 'blur' }]
    };
    operationForm: OperationFormModel = new OperationFormModel();
    files: Array<any> = [];
    operationTemplate: string = TEMPLATE_FILES.OPERATION_TEMPLATE;

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

    // 上传运行数据
    async uploadOperation() {
        try {
            let operationForm = Util.duplicate(this.operationForm);
            operationForm.files = this.files;

            let result = await this.uploadOperationAction(operationForm);
            if (!result) Prompt.error('运行数据上传失败');
            else {
                Prompt.success('运行数据上传成功');
                this.$router.push({
                    path: '/project/data/operation',
                    query: { projectId: String(this.projectId || '') }
                });
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 提交运行数据
    submit() {
        let $operationForm: any = this.$refs.operationForm;
        $operationForm.validate(valid => {
            if (valid) this.uploadOperation();
            else return false;
        });
    }

    // 重置运行数据
    reset() {
        let $operationForm: any = this.$refs.operationForm;
        $operationForm.resetFields();
    }

    // 初始化数据
    initData() {
        let projectId: number | undefined = this.projectId,
            operationForm = new OperationFormModel();
        if (projectId) {
            operationForm.projectId = projectId;
        }
        this.operationForm = operationForm;
    }

    created() {
        this.initData();
    }
}
