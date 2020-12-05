// axios类型
export const enum CaxiosType {
    Default = 0, // 默认
    FullLoading = 1, // 全屏加载
    PageLoading = 2, // 分页加载
    FullLoadingToken = 3, // 全屏加载、token
    PageLoadingToken = 4, // 分页加载、token
    Token = 5 // token
}

// 响应码
export const enum ResponseCode {
    Success = 200, // 请求成功
    TokenExpired = 403 // token失效
}

// 项目设置类型
export const enum ProjectSettingType {
    Init = 0, // 初始化时
    Refresh = 1, // 强制刷新时
    Toggle = 2 // 类型切换时
}

// 控件类型
export const enum ControlType {
    InputText = 0, // 文本输入框
    InputNumber = 1, // 数字输入框
    TextArea = 2, // 文本域
    Select = 3, // 下拉列表
    Radio = 4, // 单选按钮
    Checkbox = 5, // 复选框
    DatePicker = 6, // 日期控件
    Upload = 7 // 上传控件
}

// 数据类型
export const enum DataType {
    String = 0, // 字符串类型
    Number = 1, // 数字类型
    Boolean = 2, // 布尔类型
    Array = 3, // 数组
    Object = 4 // 对象
}

// 文档类型
export const enum DocumentType {
    Directory = 0, // 目录
    File = 1 // 文件
}

// 链接类型
export const enum LinkType {
    DiligenceLink = 1, // 尽调文件上传
    DiscloseLink = 2, // 披露信息上传
    OperationLink = 3, // 运行数据上传
    PublishLink = 4 // 发行项目链接
}
