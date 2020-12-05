// 披露信息模型
export class DiscloseModel {
    id!: number; // ID
    no!: string; // 编号
    projectId!: number; // 项目ID
    title!: string; // 标题
    content!: string; // 内容
    status!: number; // 状态，已发布；未发布；
    fileId!: number; // 文件ID
    fileUrl!: string; // 文件路径
    createBy!: string; // 创建人
    createTime!: string; // 创建时间
    modifyBy!: string; // 修改人
    modifyTime!: string; // 修改时间
}

// 披露表单模型
export class DiscloseFormModel {
    projectId!: number;

    title!: string;
    content!: string;

    files!: Array<any>;

    constructor() {
        this.files = [];
    }
}

// 分红数据模型
export class DividendModel {
    id!: number; // ID
    no!: number; // 分红期数
    projectId!: number; // 项目ID
    projectName!: string; // 项目名称
    totalIncome!: number; // 累计收益
    dividendIncome!: number; // 分红收益
    fundReservation!: number; // 资金预留
    operationExpenses!: number; // 运营支出
    otherExpenses!: number; // 其它支出
    status!: number; // 0：待分红 10：已分红 20：禁止分红
    file!: string;
    fileId!: number; // 文件ID
    fileUrl!: string; // 文件路径
    beginTime!: string; // 收益开始时间
    endTime!: string; // 收益结束时间
    createBy!: string; // 创建人
    createTime!: string; // 创建时间
    modifyBy!: string; // 修改人
    modifyTime!: string; // 修改时间
}

// 分红表单模型
export class DividendFormModel {
    projectId!: number; // 项目ID

    beginTime?: any; // 收益开始时间
    endTime?: any; // 收益结束时间
    totalIncome?: number; // 累计收益
    operationExpenses?: number; // 运营支出
    fundReservation?: number; // 资金预留
    otherExpenses?: number; // 其它支出
    dividendIncome?: number; // 分红收益

    files!: Array<any>; // 上传文件列表

    constructor() {
        this.files = [];
    }
}

// 运行数据模型
export class OperationModel {
    id!: number; // ID
    no!: string; // 编号
    projectId!: number; // 项目ID
    projectName!: number; // 项目名称
    date!: string; // 数据日期
    sunshineDuration!: number; // 日照时长
    totalPower!: number; // 当日发电总量
    sellPower!: number; // 当日上网电量
    minimumTemperature!: number; // 最低气温
    maximumTemperature!: number; // 最高气温
    weather!: string; // 天气状况
    fileId!: string; // 文件ID
    fileUrl!: string; // 文件路径
    createBy!: string; // 创建人
    createTime!: string; // 创建时间
}

// 运行表单模型
export class OperationFormModel {
    projectId!: number; // 项目ID

    date?: any; // 数据日期
    sunshineDuration?: number; // 日照时长
    totalPower?: number; // 当日发电总量
    sellPower?: number; // 当日上网电量
    minimumTemperature?: number; // 最低气温
    maximumTemperature?: number; // 最高气温
    weather!: string; // 天气状况

    files!: Array<any>;

    constructor() {
        this.files = [];
    }
}
