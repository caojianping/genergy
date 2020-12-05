// 下拉列表选项接口
export interface ISelectOption {
    label: string; // 标签
    value: string | number; // 数值
}

// 路由选项接口
export interface IRouteOption {
    title: string;
    path: string;
    query?: any;
    params?: any;
    key?: string;
    icon?: string;
}

// 分页参数接口
export interface IPageParameters<T> {
    conditions: T; // 分页查询条件
    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
}

// 分页参数接口-披露信息
export interface IDisclosePageParameters {
    projectId: string; // 项目编号
    no: string; // 编号
    title: string; // 标题
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}

// 分页参数接口-分红数据
export interface IDividendPageParameters {
    projectId: string; // 项目编号
}

// 分页参数接口-运行数据
export interface IOperationPageParameters {
    projectId: string; // 项目编号
    no: string; // 编号
    beginTime: string; // 开始时间
    endTime: string; // 结束时间
}
