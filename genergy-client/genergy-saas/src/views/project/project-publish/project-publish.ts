import Vue from 'vue';
import { namespace, State, Getter, Mutation, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Util from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption } from '@/ts/interfaces';
import { GroupModel, DocumentGroupModel, DocumentItemModel, PublishFormModel, ProjectBriefModel } from '@/ts/models';

import ProjectGuide from '@/components/project-guide';
import DocumentItems from '@/components/document-items';

const documentModule = namespace('document');
const projectModule = namespace('project');

@Component({
    name: 'ProjectPublish',
    components: { ProjectGuide, DocumentItems }
})
export default class ProjectPublish extends Vue {
    @State('projectId') projectId?: number;
    @State('projectBriefs') projectBriefs!: Array<ProjectBriefModel>;
    @State('projectStatus') projectStatus?: number;
    @Getter('projectName') projectName!: string;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Action('fetchProjectBrief') fetchProjectBrief!: () => any;

    @documentModule.State('groups') groups!: Array<DocumentGroupModel>;
    @documentModule.State('groupId') groupId?: number;

    @projectModule.State('basicGroupId') basicGroupId?: number;
    @projectModule.State('itemGroups') itemGroups!: Array<GroupModel<DocumentItemModel>>;
    @projectModule.State('itemId') itemId?: number;
    @projectModule.State('fileId') fileId?: number;
    @projectModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @projectModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @projectModule.Action('fetchDocumentItems') fetchDocumentItems!: () => any;
    @projectModule.Action('publishProject') publishProjectAction!: (publishForm: PublishFormModel) => any;

    get price() {
        let publishForm = Util.duplicate(this.publishForm),
            totalAmount = publishForm.totalAmount,
            amount = publishForm.amount;
        if (!totalAmount || !amount) return 0;
        return (totalAmount / amount).toFixed(2);
    }

    get modeUnits(): Array<string> {
        let publishForm = Util.duplicate(this.publishForm);
        return [
            ['份', '份额', '单份'],
            ['股', '股份', '单股']
        ][publishForm.mode];
    }

    modeOptions: Array<ISelectOption> = [
        { label: '份额', value: 0 },
        { label: '股份', value: 1 }
    ];

    labelCol: any = { span: 4 };
    wrapperCol: any = { span: 14 };
    keys: any = {
        totalAmount: '募集总额',
        amount: '份额/股份总数',
        minRate: '最小年化收益率',
        maxRate: '最大年化收益率',
        length: '募集时长',
        cycle: '项目周期'
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
        projectId: [{ required: true, message: '请输入项目编号', trigger: 'blur' }],
        mode: [{ required: true, message: '请输入发行方式', trigger: 'blur' }],
        totalAmount: [
            { required: true, message: '请输入募集总额', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ],
        amount: [
            { required: true, message: `请输入份额/股份总数`, trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ],
        minRate: [
            { required: true, message: '请输入最小年化收益率', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ],
        maxRate: [
            { required: true, message: '请输入最大年化收益率', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ],
        length: [
            { required: true, message: '请输入募集时长', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ],
        startTime: [{ required: true, message: '请输入募集开始时间', trigger: 'change' }],
        cycle: [
            { required: true, message: '请输入项目周期', trigger: 'blur' },
            { validator: this.validateDigit, trigger: 'blur' }
        ]
    };
    publishForm: PublishFormModel = new PublishFormModel();

    // 处理上传文件success事件
    handleUploadSuccess(itemId: number, data: any) {
        let itemGroups = Util.duplicate(this.itemGroups);
        itemGroups.forEach((itemGroup: GroupModel<DocumentItemModel>) => {
            itemGroup.items.forEach((item: DocumentItemModel) => {
                if (item.id === itemId) {
                    item.fileId = data.id;
                    item.url = data.url;
                }
            });
        });
        this.setStates({ itemGroups });
    }

    // 处理删除文件success事件
    handleDeleteSuccess(fileId: number) {
        let itemGroups = Util.duplicate(this.itemGroups);
        itemGroups.forEach((itemGroup: GroupModel<DocumentItemModel>) => {
            itemGroup.items.forEach((item: DocumentItemModel) => {
                if (item.fileId === fileId) {
                    item.fileId = 0;
                    item.url = '';
                }
            });
        });
        this.setStates({ itemGroups });
    }

    // 校验文件是否已经全部上传
    validateFiles(): any {
        let itemGroups: Array<GroupModel<DocumentItemModel>> = this.itemGroups,
            groupCount: number = itemGroups.length,
            result: any = { status: true, data: null };
        outer: for (let i = 0; i < groupCount; i++) {
            let itemGroup: GroupModel<DocumentItemModel> | undefined = itemGroups[i];
            if (itemGroup) {
                let items: Array<DocumentItemModel> = itemGroup.items || [],
                    itemCount: number = items.length;
                for (let j = 0; j < itemCount; j++) {
                    let item: DocumentItemModel = items[j];
                    if (item && !item.fileId) {
                        result = { status: false, data: item.name };
                        break outer;
                    }
                }
            }
        }
        return result;
    }

    // 发行项目
    async publishProject() {
        try {
            let validateResult = this.validateFiles();
            if (!validateResult.status) {
                Prompt.error(`请先上传${validateResult.data}相关文件`);
                return;
            }

            let publishForm = Util.duplicate(this.publishForm),
                result = await this.publishProjectAction(publishForm);
            if (!result) Prompt.error('项目发行失败');
            else {
                this.$message.success('项目发行成功');
                this.$router.push({ path: '/project/overview', query: { projectId: String(this.projectId || '') } });
            }
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 提交表单
    submit() {
        let $publishForm: any = this.$refs.publishForm;
        $publishForm.validate(valid => {
            if (valid) this.publishProject();
            else return false;
        });
    }

    // 重置表单
    reset() {
        let $publishForm: any = this.$refs.publishForm;
        $publishForm.resetFields();
    }

    // 初始化数据
    initData() {
        let count = this.groups.length,
            group: DocumentGroupModel | undefined = this.groups[count - 1];
        this.setStates({ basicGroupId: group ? group.id : undefined });

        let projectId = this.projectId;
        if (projectId) {
            let publishForm = new PublishFormModel();
            publishForm.projectId = projectId;
            this.publishForm = publishForm;
        }
    }

    // 获取数据
    async fetchData() {
        try {
            this.setRootStates({ isFullLoading: true });
            await this.fetchProjectBrief();
            await this.fetchDocumentItems();
            this.setRootStates({ isFullLoading: false });
        } catch (error) {
            this.setRootStates({ isFullLoading: false });
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
