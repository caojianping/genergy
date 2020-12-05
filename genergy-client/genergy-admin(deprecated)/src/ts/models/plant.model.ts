import { AssetStatusEnum, PlantTypeEnum, PlantStatusEnum, CompanyTypeEnum, CorpCertTypeEnum } from '../common/enums';

export class PlantModel {
    /**
     * 电站编号
     */
    public id!: number;

    /**
     * 上架序号
     */
    public putawaySerial!: string;

    /**
     * 上架时间
     */
    public putawayTime!: Date;

    /**
     * 电站名称
     */
    public plantName!: string;

    /**
     * 装机功率
     */
    public installedPower!: number;

    /**
     * 上网电价
     */
    public electricityPrice!: number;

    /**
     * 累计发电量
     */
    public totalEnergy!: number;

    /**
     * 累计已结算电费
     */
    public totalEnergyCost!: number;
}
