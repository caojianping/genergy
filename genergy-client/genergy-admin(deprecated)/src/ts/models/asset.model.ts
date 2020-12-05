import { AssetStatusEnum, PlantTypeEnum, PlantStatusEnum, CompanyTypeEnum, CorpCertTypeEnum } from '../common/enums';

export class AssetModel {
    /**
     * 资产编号
     */
    public assetId!: number;

    /**
     * 上架序号
     */
    public putawaySerial!: string;

    /**
     * 电站名称
     */
    public plantName!: string;

    /**
     * 提交人编号
     */
    public submitterId!: number;

    /**
     * 提交人名称
     */
    public submitterName!: string;

    /**
     * 提交时间
     */
    public submitTime!: Date;

    /**
     * 审核人编号
     */
    public auditorId!: number;

    /**
     * 审核人名称
     */
    public auditorName!: string;

    /**
     * 审核时间，上架时间
     */
    public auditTime!: Date;

    /**
     * 资产状态
     */
    public assetStatus!: AssetStatusEnum;
}

export class AssetInfoModel {
    /**
     * 电站编号
     */
    public id!: string;

    /**
     * 电站PS编号
     */
    public psId!: string;

    /**
     * 电站编码S/N
     */
    public code!: string;

    /**
     * 电站名称
     */
    public plantName!: string;

    /**
     * 电站类型：0分布式光伏；1户用光伏；2户用储能；
     */
    public plantType!: PlantTypeEnum;

    /**
     * 电站状态：0禁用；1启用；
     */
    public plantStatus!: PlantStatusEnum;

    /**
     * 装机功率，单位kWp
     */
    public installedPower!: number;

    /**
     * 预计年发电量，单位kWh
     */
    public estimatedAnnualEnergy!: number;

    /**
     * 实际年发电量，单位kWh
     */
    public actualAnnualEnergy!: number;

    /**
     * 预计年发电收益，单位元
     */
    public estimatedAnnualEnergyEarnings!: number;

    /**
     * 实际年发电收益，单位元
     */
    public actualAnnualEnergyEarnings!: number;

    /**
     * 预计年发电最小收益率
     */
    public estimatedAnnualEnergyMinEarningsRate!: number;

    /**
     * 预计年发电最大收益率
     */
    public estimatedAnnualEnergyMaxEarningsRate!: number;

    /**
     * 上网电价（精确到分），单位元
     */
    public electricityPrice!: number;

    /**
     * 发电年限，单位天
     */
    public energyTerm!: number;

    /**
     * 剩余发电年限，单位天
     */
    public residualEnergyTerm!: number;

    /**
     * 建设公司
     */
    public constructionCompany!: string;

    /**
     * 建成日期
     */
    public completedDate!: Date;

    /**
     * 并网日期
     */
    public gridConnectedDate!: Date;

    /**
     * 省
     */
    public province!: string;

    /**
     * 市
     */
    public city!: string;

    /**
     * 县
     */
    public district!: string;

    /**
     * 地址
     */
    public address!: string;

    /**
     * 组件总数
     */
    public componentTotal!: number;

    /**
     * 组件厂家
     */
    public componentSupplier!: string;

    /**
     * 组件型号
     */
    public componentModel!: string;

    /**
     * 逆变器厂家
     */
    public inverterSupplier!: string;

    /**
     * 逆变器型号
     */
    public inverterModel!: string;

    /**
     * 数据采集器厂家
     */
    public collectorSupplier!: string;

    /**
     * 数据采集器型号
     */
    public collectorModel!: string;

    /**
     * 资产编号
     */
    public assetId!: number;

    /**
     * 资产名称
     */
    public assetName !: string;

    /**
     * 企业名称，业主名称
     */
    public companyName!: string;

    /**
     * 企业类型
     */
    public companyType!: CompanyTypeEnum;

    /**
     * 企业地址
     */
    public companyAddress!: string;

    /**
     * 法人代表
     */
    public corpName!: string;

    /**
     * 法人证件类型
     */
    public corpCertType!: CorpCertTypeEnum;

    /**
     * 法人证件号码
     */
    public corpCertNo!: string;

    /**
     * 电站建设价值
     */
    public plantConstructionValue!: number;

    /**
     * 电站预售价值
     */
    public plantPresellValue!: number;

    /**
     * 电站折旧率
     */
    public plantDepreciationRate!: number;

    /**
     * 电站特点
     */
    public plantFeature!: string;

    /**
     * 描述信息
     */
    public description!: string;

    /**
     * 证件文件
     */
    public certFiles!: string;

    /**
     * 法律文件
     */
    public legalFiles!: string;

    /**
     * 电站图片
     */
    public imgs!: string;

    /**
     * 审核备注
     */
    public auditRemark!: string;
}
