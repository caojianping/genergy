/**
 * 操作类型枚举
 */
export enum OperateTypeEnum {
    Add = 0, // 添加操作
    Edit = 1, // 编辑操作
}

/**
 * 上传文件类型枚举
 */
export enum UploadTypeEnum {
    CertUpload = 1, // 证件文件上传
    LegalUpload = 2, // 法律文件上传
    ImgUpload = 3, // 图片上传
}

/**
 * 证件文件枚举
 */
export enum CertFileTypeEnum {
    BusinessLicense = 1, // 营业执照
    OrganizationCodeCert = 2, // 机构代码证
    TaxRegistrationCert = 3, // 税务登记证
    IDCardFront = 4, // 身份证正面
    IDCardBack = 5, // 身份证背面
}

/**
 * 法律文件枚举
 */
export enum LegalFileTypeEnum {
    GridConnectionContract = 1, // 并网合同
    SiteContract = 2, // 场地合同
    OwnerOperationContract = 3, // 业主运营合同
    ConstructionEIAPermit = 4, // 建设与环评许可书
    ProjectRecord = 5, // 项目备案书
    PutawayProjectContract = 6, // 上架项目合同书
}

/**
 * 电站类型枚举
 */
export enum PlantTypeEnum {
    DistributedPhotovoltaic = 0, // 分布式光伏
    HouseholdPhotovoltaic = 1, // 户用光伏
    HouseholdStoredEnergy = 2, // 户用储能
}

/**
 * 电站状态枚举
 */
export enum PlantStatusEnum {
    Disabled = 0, // 禁用
    Enabled = 1, // 启用
}

/**
 * 资产操作模式枚举
 */
export enum AssetOperateModeEnum {
    AddMode = 0, // 添加操作模式
    EditMode = 1, // 编辑操作模式
    AuditMode = 2, // 审核操作模式
}

/**
 * 资产状态枚举
 */
export enum AssetStatusEnum {
    Created = 0, // 已创建/已保存/未提交
    Submitted = 10, // 已提交/未审核
    Audited = 20, // 已审核
}

/**
 * 企业类型枚举
 */
export enum CompanyTypeEnum {
    StateOwnedCompany = 0, // 国有企业
    CollectivelyOwnedCompany = 1, // 集体企业
    PrivateCompany = 2, // 私营企业
    OffiliatedCompany = 3, // 联营企业
    CorporateCompany = 4, // 股份制企业
}

/**
 * 法人证件类型枚举
 */
export enum CorpCertTypeEnum {
    IDCard = 0, // 身份证
    Passport = 1, // 护照
    MilitaryOfficer = 2, // 军官证
}

// 表单类型枚举
export enum FormTypeEnum {
    Save = 0, // 保存
    Submit = 1, // 提交
}
