// 分页参数接口
export interface IPageParameters<T> {
    conditions: T; // 分页查询条件
    current: number; // 分页索引
    size: number; // 分页尺寸
}

// 用户分页条件接口
export interface IUserPageConditions {
    username: string; // 用户名
}

// 资产分页条件接口
export interface IAssetPageConditions {
    putawaySerial: string; // 上架序号
    plantName: string; // 电站名称
    submitter: string; // 提交人
    auditor: string; // 审核人
    status: string; // 状态
}

// 电站分页条件接口
export interface IPlantPageConditions {
    putawaySerial: string; // 上架序号
    plantName: string; // 电站名称
    putawayTimeRange: Array<Date>; // 上架时间范围
}
