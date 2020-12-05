import { ControlType, DataType, LinkType } from '@/ts/config';
import { ISelectOption } from '../interfaces';
import { GroupModel } from './common.model';

export class NotifyModel {
    msg!: string; // 内容
    notifyTime!: string; // 通知时间
    title!: string; // 标题
    linkType!: LinkType; // 链接类型
}

export class ProjectStatsModel {
    title!: string; // 最新披露消息
    newDividend!: number; // 最新分红
    totalDividend!: number; // 累计分红
    newPower!: number; // 最新发电
    totalPower!: number; // 累计发电
}

export class ProjectBaseModel {
    projectCompany!: string; // 项目公司
    projectLegal!: string; // 项目方法人代表
    projectLocation!: string; // 项目公司位置
    projectType?: number; // 项目类型
    projectTypeName!: string; // 项目类型名称

    name!: string; // 基础设施名称
    value?: number; // 出让价值
    completionDate!: any; // 建成日期
    constructionCompany!: string; // 建设公司
    depreciation?: number; // 设施折旧率
    operationDate!: any; // 运营日期
    runningStatus?: number; // 运行状态：0建设中；1运行中；
    totalInvestment?: number; // 项目总投资
}

// 项目模型
export class ProjectModel extends ProjectBaseModel {
    projectId!: number; // 项目编号
    companyId!: number; // 公司编号
    createBy!: string; // 创建人
    projects!: Array<ProjectValueModel>;
}

export class ProjectFormModel extends ProjectBaseModel {
    templateGroups!: Array<GroupModel<ProjectTemplateModel>>;
}

// 项目值模型
export class ProjectValueModel {
    name!: string; // 接收字段名称
    title!: string; // 标题
    value!: any; // 控件数值
}

// 项目模板模型
export class ProjectTemplateModel {
    index!: number; // 索引
    name!: string; // 接收字段名称
    title!: string; // 标题
    group!: string; // 分组
    controlType!: ControlType; // 控件类型
    dataType!: DataType; // 数据类型
    dataVerify!: any; // 数据验证
    value?: any; // 控件数值

    selectValue?: Array<ISelectOption>;
    defaultValue?: any;
    unit?: string; // 单位
}

// 项目简要模型，用于项目下拉列表
export class ProjectBriefModel {
    id!: number; // 项目编号
    name!: string; // 项目名称
    projectType!: number; // 项目类型
    projectTypeName!: string; // 项目类型名称
    status!: number; // 状态
}

// 项目类型模型，用于项目类型下拉列表
export class ProjectTypeModel {
    id!: number; // 类型编号
    name!: string; // 类型名称
}

// 项目发行表单模型
export class PublishFormModel {
    projectId!: number; // 项目ID

    amount?: number; // 份额/股份总数
    cycle?: number; // 项目周期
    length?: number; // 募集时长
    maxRate?: number; // 最大年化收益率
    minRate?: number; // 最小年化收益率
    mode!: number; // 发行方式 0:份额 1：股份
    startTime?: any; // 募集开始时间
    totalAmount?: number; // 募集总额

    constructor() {
        this.mode = 0;
    }
}

// 发行信息模型
export class PublishInfoModel {
    projectId!: number; // 项目ID
    amount!: number; // 份额/股份总数
    cycle!: number; // 项目周期
    length!: number; // 募集时长
    maxRate!: number; // 最大年化收益率
    minRate!: number; // 最小年化收益率
    mode!: number; // 发行方式 0:份额 1：股份
    startTime!: string; // 募集开始时间
    totalAmount!: number; // 募集总额
    status!: number; // 状态：0未开始；1募集中；2募集完成；
    createBy!: string; // 创建人
    createTime!: string; // 创建时间
}
