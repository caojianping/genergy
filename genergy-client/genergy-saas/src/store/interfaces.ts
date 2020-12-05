import { Commit } from 'vuex';
import {
    TokenInfo,
    GroupModel,
    LoginFormModel,
    ProjectModel,
    ProjectBriefModel,
    ProjectTypeModel,
    ProjectTemplateModel,
    DiscloseModel,
    DividendModel,
    OperationModel,
    DocumentGroupModel,
    DocumentItemModel,
    DocumentFileModel,
    NotifyModel,
    ProjectStatsModel,
    PublishInfoModel,
    UserModel
} from '@/ts/models';
import {
    IPageParameters,
    IDisclosePageParameters,
    IDividendPageParameters,
    IOperationPageParameters
} from '@/ts/interfaces';

export interface IActionContext<T> {
    commit: Commit;
    state: T;
    rootState: IRootState;
}

// 根状态接口
export interface IRootState {
    tokenInfo?: TokenInfo | null; // token信息

    isFullLoading: boolean; // 是否启用全屏加载中UI
    isPageLoading: boolean; // 是否启用分页加载中UI
    pageSizeOptions: Array<string>; // 分页尺寸选项

    projectBriefs: Array<ProjectBriefModel>; // 项目简要列表
    projectId?: number; // 项目编号
    projectType?: number; // 项目类型
    projectStatus?: number; // 项目状态
}

export interface IAccountState {
    loginForm: LoginFormModel; // 登录表单
}

export interface IProjectState {
    notifies: Array<NotifyModel>; // 【概述页面】：通知列表
    projectStats?: ProjectStatsModel | null; // 【概述页面】：项目统计数据
    project?: ProjectModel | null; // 【概述页面】：项目数据
    documentGroups: Array<DocumentGroupModel>; // 【概述页面】：文档分组列表
    users: Array<UserModel>; // 【概述页面】：用户列表
    publishInfo?: PublishInfoModel | null; // 【概述页面】：发行信息

    types: Array<ProjectTypeModel>; // 【新建项目】：项目类型列表
    templateGroups: Array<GroupModel<ProjectTemplateModel>>; // 【新建项目】：项目模板分组列表

    basicGroupId?: number; // 【发行项目】：项目情况分组编号
    itemGroups: Array<GroupModel<DocumentItemModel>>; // 【发行项目】：文档项目分组列表
    itemId?: number; // 【发行项目】：文档项目编号
    fileId?: number; // 【发行项目】：文档文件编号
}

export interface IDataState {
    dividendPeriod: number; // 分红数据期数

    discloseParameters: IPageParameters<IDisclosePageParameters>; // 披露信息分页参数
    dividendParameters: IPageParameters<IDividendPageParameters>; // 分红数据分页参数
    operationParameters: IPageParameters<IOperationPageParameters>; // 运行数据分页参数

    totalCount: number; // 分页数量
    list: Array<DiscloseModel | DividendModel | OperationModel>; // 分页数据列表

    id: number; // 编号
    status: boolean; // 审核状态

    project?: ProjectModel | null; // 项目数据
    publishInfo?: PublishInfoModel | null; // 发行信息
    templateGroups: Array<GroupModel<Array<ProjectTemplateModel>>>; // 项目模板分组列表
}

export interface IDocumentState {
    groups: Array<DocumentGroupModel>; // 文档分组列表
    groupId?: number; // 文档分组编号

    items: Array<DocumentItemModel>; // 文档项目列表
    itemGroups: Array<GroupModel<DocumentItemModel>>; // 文档项目分组列表
    itemId?: number; // 文档项目编号

    files: Array<DocumentFileModel>; // 文档文件列表
    fileId?: number; // 文档文件编号
}
