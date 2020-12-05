import Vue from 'vue';
import { namespace, Mutation, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Util from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption } from '@/ts/interfaces';
import { GroupModel, ProjectFormModel, ProjectTemplateModel, ProjectTypeModel } from '@/ts/models';
import { ProjectHelper } from '@/ts/helpers';

import TemplateControl from '@/components/template-control';

const projectModule = namespace('project');
const documentModule = namespace('document');

@Component({
    name: 'ProjectCreate',
    components: { TemplateControl }
})
export default class ProjectCreate extends Vue {
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Mutation(TYPES.CLEAR_STATES) clearRootStates!: () => any;
    @Action('fetchProjectBriefs') fetchProjectBriefs!: (payload: any) => any;
    @documentModule.Action('fetchDocumentGroups') fetchDocumentGroups!: (isRefresh?: boolean) => any;

    @projectModule.State('types') types!: Array<ProjectTypeModel>;
    @projectModule.State('templateGroups') templateGroups!: Array<GroupModel<ProjectTemplateModel>>;
    @projectModule.Getter('typeOptions') typeOptions!: Array<ISelectOption>;
    @projectModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @projectModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @projectModule.Action('fetchProjectTypes') fetchProjectTypes!: () => any;
    @projectModule.Action('fetchProjectTemplates') fetchProjectTemplates!: (projectForm: ProjectFormModel) => any;
    @projectModule.Action('saveProject') saveProjectAction!: (projectForm: ProjectFormModel) => any;

    statusOptions: Array<ISelectOption> = [
        { label: '建设中', value: 0 },
        { label: '运行中', value: 1 }
    ];

    rules: any = {
        name: [{ required: true, message: '请输入基础设施名称', trigger: 'blur' }],
        runningStatus: [{ required: true, message: '请选择设施状态', trigger: 'blur' }],
        totalInvestment: [{ required: true, message: '请选择项目总投资', trigger: 'blur' }],
        depreciation: [{ required: true, message: '请选择设施折旧率', trigger: 'blur' }],
        value: [{ required: true, message: '请选择出让价值', trigger: 'blur' }],
        projectCompany: [{ required: true, message: '请选择项目公司', trigger: 'blur' }],
        projectLegal: [{ required: true, message: '请选择项目方法人代表', trigger: 'blur' }],
        projectLocation: [{ required: true, message: '请选择项目公司位置', trigger: 'blur' }],
        constructionCompany: [{ required: true, message: '请选择建设公司', trigger: 'blur' }],
        completionDate: [{ required: true, message: '请选择建成日期', trigger: 'change' }],
        operationDate: [{ required: true, message: '请选择运营日期', trigger: 'change' }]
    };
    projectForm: ProjectFormModel = new ProjectFormModel();

    // 获取项目存档数据
    getProjectArchive(projectForm: ProjectFormModel, projectType: number): ProjectFormModel {
        let projectArchive = ProjectHelper.getProjectArchive();
        if (projectArchive && projectArchive.projectType === projectType) {
            return projectArchive;
        } else {
            projectForm.projectType = projectType;
            return projectForm;
        }
    }

    // 设置项目存档数据
    setProjectArchive() {
        ProjectHelper.setProjectArchive(this.projectForm);
    }

    // 删除项目存档数据
    removeProjectArchive() {
        let projectArchive = ProjectHelper.getProjectArchive();
        if (projectArchive && projectArchive.projectType === this.projectForm.projectType) {
            ProjectHelper.removeProjectArchive();
        }
    }

    // 切换项目类型
    async toggleType(value: number) {
        let projectForm = this.getProjectArchive(new ProjectFormModel(), value),
            convertProjectForm = await this.fetchProjectTemplates(projectForm);
        if (convertProjectForm) {
            this.projectForm = convertProjectForm;
        }
    }

    // 处理表单change事件
    handleFormChange(key: string, value: any) {
        let projectForm = Util.duplicate(this.projectForm);
        projectForm[key] = value;
        this.projectForm = projectForm;
    }

    // 处理日期change事件
    handleDatePickerChange(key: string, date: any, dateString: string) {
        let projectForm = Util.duplicate(this.projectForm);
        projectForm[key] = dateString;
        this.projectForm = projectForm;
    }

    // 处理模板change事件
    handleTemplateChange(key: string, value: any) {
        let projectForm = Util.duplicate(this.projectForm),
            templateGroups = projectForm.templateGroups || [];
        templateGroups.forEach((templateGroup: GroupModel<ProjectTemplateModel>) => {
            templateGroup.items.forEach((item: ProjectTemplateModel) => {
                if (item.name === key) {
                    item['value'] = value;
                }
            });
        });
        this.projectForm = projectForm;
    }

    // 保存项目
    async saveProject() {
        try {
            this.setRootStates({ isFullLoading: true });
            let projectForm = Util.duplicate(this.projectForm),
                projectId = await this.saveProjectAction(projectForm);
            if (projectId) {
                this.$message.success('项目保存成功');
                this.removeProjectArchive();
                await this.fetchProjectBriefs({ isRefresh: true, projectId });
                await this.fetchDocumentGroups();
                this.setRootStates({ isFullLoading: false });
                this.$router.push({ path: '/project/overview', query: { projectId: String(projectId) } });
            } else {
                this.setProjectArchive();
                this.setRootStates({ isFullLoading: true });
            }
        } catch (error) {
            this.setProjectArchive();
            this.setRootStates({ isFullLoading: false });
            Prompt.error(error.message || error);
        }
    }

    // 存档项目
    archive() {
        this.setProjectArchive();
        Prompt.success('项目信息存档成功');
    }

    // 提交项目
    submit() {
        let $projectForm: any = this.$refs.projectForm;
        $projectForm.validate(valid => {
            if (valid) this.saveProject();
            else return false;
        });
    }

    // 重置项目
    reset() {
        let $projectForm: any = this.$refs.projectForm;
        $projectForm.resetFields();
    }

    // 获取数据
    async fetchData() {
        this.setRootStates({ isFullLoading: true });
        try {
            await this.fetchProjectTypes();
            let projectType = this.types[0] ? this.types[0].id : undefined;
            if (projectType) {
                let projectForm = this.getProjectArchive(new ProjectFormModel(), projectType),
                    convertProjectForm = await this.fetchProjectTemplates(projectForm);
                if (convertProjectForm) {
                    this.projectForm = convertProjectForm;
                }
            }
            this.setRootStates({ isFullLoading: false });
        } catch (error) {
            this.setRootStates({ isFullLoading: false });
            Prompt.error(error.message || error);
        }
    }

    mounted() {
        this.fetchData();
    }
}
