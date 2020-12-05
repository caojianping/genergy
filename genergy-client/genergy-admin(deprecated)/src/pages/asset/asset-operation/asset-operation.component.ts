import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

import {
    UploadTypeEnum,
    CertFileTypeEnum,
    LegalFileTypeEnum,
    AssetOperateModeEnum,
    FormTypeEnum,
    AssetStatusEnum,
} from 'src/ts/common/enums';
import {
    PlantTypeNames,
    PlantStatusNames,
    AssetStatusNames,
    CompanyTypeNames,
    CorpCertTypeNames,
    CertFileTypeNames,
    LegalFileTypeNames,
} from 'src/ts/common/names';

import { AssetInfoModel } from 'src/ts/models';
import { TokenHelper } from 'src/ts/helpers';
import { AssetService } from 'src/ts/services';
import { Urls } from 'src/ts/common/urls';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

@Component({
    selector: 'app-asset-operation',
    templateUrl: './asset-operation.component.html',
    styleUrls: ['./asset-operation.component.less'],
})
export class AssetOperationComponent implements OnInit {
    UploadUrl: string = Urls.upload.url;
    UploadApis: any = {
        cert: Urls.upload.cert,
        legal: Urls.upload.legal,
        imgs: Urls.upload.imgs,
    };

    PlantTypeNames: Array<string> = PlantTypeNames;
    PlantStatusNames: Array<string> = PlantStatusNames;
    AssetStatusNames: Array<string> = AssetStatusNames;
    CompanyTypeNames: Array<string> = CompanyTypeNames;
    CorpCertTypeNames: Array<string> = CorpCertTypeNames;

    CertFileTypeNames: Array<string> = CertFileTypeNames;
    LegalFileTypeNames: Array<string> = LegalFileTypeNames;

    token: string = TokenHelper.getToken();
    headers: any = { Authorization: this.token ? `Bearer ${this.token}` : '' };
    mode: AssetOperateModeEnum;
    assetId?: number;
    assetInfo?: AssetInfoModel;
    controlDisabled: boolean = false;

    formType: FormTypeEnum = FormTypeEnum.Save;
    assetInfoFormGroup: FormGroup;

    regionOptions: any = [
        {
            value: '安徽省',
            label: '安徽省',
            children: [
                {
                    value: '合肥市',
                    label: '合肥市',
                    children: [
                        {
                            value: '蜀山区',
                            label: '蜀山区',
                            isLeaf: true,
                        },
                        {
                            value: '经开区',
                            label: '经开区',
                            isLeaf: true,
                        },
                    ],
                },
                {
                    value: '宣城市',
                    label: '宣城市',
                    children: [
                        {
                            value: '绩溪县',
                            label: '绩溪县',
                            isLeaf: true,
                        },
                        {
                            value: '泾县',
                            label: '泾县',
                            isLeaf: true,
                        },
                    ],
                },
            ],
        },
        {
            value: '江苏省',
            label: '江苏省',
            children: [
                {
                    value: '南京市',
                    label: '南京市',
                    children: [
                        {
                            value: '玄武区',
                            label: '玄武区',
                            isLeaf: true,
                        },
                    ],
                },
            ],
        },
    ];
    regions: string[] = [];

    certFiles: Map<any, any> = new Map([
        [CertFileTypeEnum.BusinessLicense, ''],
        [CertFileTypeEnum.OrganizationCodeCert, ''],
        [CertFileTypeEnum.TaxRegistrationCert, ''],
        [CertFileTypeEnum.IDCardFront, ''],
        [CertFileTypeEnum.IDCardBack, ''],
    ]);
    legalFiles: Map<any, any> = new Map([
        [LegalFileTypeEnum.GridConnectionContract, ''],
        [LegalFileTypeEnum.SiteContract, ''],
        [LegalFileTypeEnum.OwnerOperationContract, ''],
        [LegalFileTypeEnum.ConstructionEIAPermit, ''],
        [LegalFileTypeEnum.ProjectRecord, ''],
        [LegalFileTypeEnum.PutawayProjectContract, ''],
    ]);
    imgs: Array<any> = [];

    changeSubscription: Subscription;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
        private assetService: AssetService
    ) {
        this.setFormGroup();

        const regionsControl = this.assetInfoFormGroup.get('regions') as FormControl;
        this.changeSubscription = regionsControl.valueChanges.subscribe((data) => {
            this.handleRegionsChange(data);
        });
    }

    // 设置FormGroup
    setFormGroup(assetInfo?: AssetInfoModel) {
        let data: any = assetInfo || {};
        this.assetInfoFormGroup = this.formBuilder.group({
            psId: new FormControl(data.psId, Validators.required),
            code: new FormControl(data.code, Validators.required),
            plantName: new FormControl(data.plantName, Validators.required),

            plantType: new FormControl(data.plantType, Validators.required),
            plantStatus: new FormControl(data.plantStatus, Validators.required),
            installedPower: new FormControl(data.installedPower, Validators.required),

            estimatedAnnualEnergy: new FormControl(data.estimatedAnnualEnergy),
            actualAnnualEnergy: new FormControl(data.actualAnnualEnergy),
            estimatedAnnualEnergyEarnings: new FormControl(data.estimatedAnnualEnergyEarnings),
            actualAnnualEnergyEarnings: new FormControl(data.actualAnnualEnergyEarnings),
            estimatedAnnualEnergyMinEarningsRate: new FormControl(data.estimatedAnnualEnergyMinEarningsRate),
            estimatedAnnualEnergyMaxEarningsRate: new FormControl(data.estimatedAnnualEnergyMaxEarningsRate),

            electricityPrice: new FormControl(data.electricityPrice),
            energyTerm: new FormControl(data.energyTerm),
            residualEnergyTerm: new FormControl(data.residualEnergyTerm),

            constructionCompany: new FormControl(data.constructionCompany),
            completedDate: new FormControl(data.completedDate),
            gridConnectedDate: new FormControl(data.gridConnectedDate),

            regions: new FormControl(this.buildRegions(assetInfo)),
            address: new FormControl(data.address),

            componentTotal: new FormControl(data.componentTotal),
            componentSupplier: new FormControl(data.componentSupplier),
            componentModel: new FormControl(data.componentModel),

            inverterSupplier: new FormControl(data.inverterSupplier),
            inverterModel: new FormControl(data.inverterModel),

            collectorSupplier: new FormControl(data.collectorSupplier),
            collectorModel: new FormControl(data.collectorModel),

            // assetName: new FormControl(data.assetName || null, Validators.required),

            companyName: new FormControl(data.companyName),
            companyType: new FormControl(data.companyType),
            companyAddress: new FormControl(data.companyAddress),

            corpName: new FormControl(data.corpName),
            corpCertType: new FormControl(data.corpCertType),
            corpCertNo: new FormControl(data.corpCertNo),

            plantConstructionValue: new FormControl(data.plantConstructionValue),
            plantPresellValue: new FormControl(data.plantPresellValue),
            plantDepreciationRate: new FormControl(data.plantDepreciationRate),
            plantFeature: new FormControl(data.plantFeature),
            description: new FormControl(data.description),

            auditRemark: new FormControl(data.auditRemark),
        });
    }

    buildAssetInfo(assetInfoFormData: any) {
        let assetInfo = this.assetInfo,
            result = new AssetInfoModel();
        result.id = assetInfo ? assetInfo.id : null;
        result.psId = assetInfoFormData.psId;
        result.code = assetInfoFormData.code;
        result.plantName = assetInfoFormData.plantName;
        result.plantType = assetInfoFormData.plantType;
        result.plantStatus = assetInfoFormData.plantStatus;
        result.installedPower = assetInfoFormData.installedPower;

        result.estimatedAnnualEnergy = assetInfoFormData.estimatedAnnualEnergy;
        result.actualAnnualEnergy = assetInfoFormData.actualAnnualEnergy;
        result.estimatedAnnualEnergyEarnings = assetInfoFormData.estimatedAnnualEnergyEarnings;
        result.actualAnnualEnergyEarnings = assetInfoFormData.actualAnnualEnergyEarnings;
        result.estimatedAnnualEnergyMinEarningsRate = assetInfoFormData.estimatedAnnualEnergyMinEarningsRate;
        result.estimatedAnnualEnergyMaxEarningsRate = assetInfoFormData.estimatedAnnualEnergyMaxEarningsRate;

        result.electricityPrice = assetInfoFormData.electricityPrice;
        result.energyTerm = assetInfoFormData.energyTerm;
        result.residualEnergyTerm = assetInfoFormData.residualEnergyTerm;

        result.constructionCompany = assetInfoFormData.constructionCompany;
        result.completedDate = assetInfoFormData.completedDate;
        result.gridConnectedDate = assetInfoFormData.gridConnectedDate;

        let regions = assetInfoFormData.regions;
        result.province = regions[0];
        result.city = regions[1];
        result.district = regions[2];
        result.address = assetInfoFormData.address;

        result.componentTotal = assetInfoFormData.componentTotal;
        result.componentSupplier = assetInfoFormData.componentSupplier;
        result.componentModel = assetInfoFormData.componentModel;

        result.inverterSupplier = assetInfoFormData.inverterSupplier;
        result.inverterModel = assetInfoFormData.inverterModel;

        result.installedPower = assetInfoFormData.installedPower;
        result.installedPower = assetInfoFormData.installedPower;

        result.collectorSupplier = assetInfoFormData.collectorSupplier;
        result.collectorModel = assetInfoFormData.collectorModel;

        result.assetId = assetInfo ? assetInfo.assetId : null;
        result.assetName = assetInfoFormData.assetName || assetInfoFormData.plantName;

        result.companyType = assetInfoFormData.companyType;
        result.companyName = assetInfoFormData.companyName;
        result.companyAddress = assetInfoFormData.companyAddress;

        result.corpName = assetInfoFormData.corpName;
        result.corpCertType = assetInfoFormData.corpCertType;
        result.corpCertNo = assetInfoFormData.corpCertNo;

        result.plantConstructionValue = assetInfoFormData.plantConstructionValue;
        result.plantPresellValue = assetInfoFormData.plantPresellValue;
        result.plantDepreciationRate = assetInfoFormData.plantDepreciationRate;
        result.plantFeature = assetInfoFormData.plantFeature;
        result.description = assetInfoFormData.description;

        let certArrs = [];
        this.certFiles.forEach((value: string, key: number) => {
            if (value) {
                certArrs.push(value);
            }
        });
        result.certFiles = certArrs.join(',');

        let legalArrs = [];
        this.legalFiles.forEach((value: string, key: number) => {
            if (value) {
                legalArrs.push(value);
            }
        });
        result.legalFiles = legalArrs.join(',');

        console.log('imgs:', this.imgs);
        let imgArrs = [];
        (this.imgs || []).forEach((item: any) => {
            let url = item.url || item.response.data[0];
            if (url) {
                if (url.indexOf(this.UploadUrl) === 0) {
                    url = url.substring(this.UploadUrl.length);
                }
                imgArrs.push(url);
            }
        });
        result.imgs = imgArrs.join(',');

        result.auditRemark = assetInfoFormData.auditRemark;
        return result;
    }

    // 构建行政区划
    buildRegions(assetInfo?: AssetInfoModel) {
        let regions: Array<string> = [];
        if (assetInfo) {
            if (assetInfo.province) {
                regions.push(assetInfo.province);
            }
            if (assetInfo.city) {
                regions.push(assetInfo.city);
            }
            if (assetInfo.district) {
                regions.push(assetInfo.district);
            }
        }
        return regions;
    }

    // 构建文件
    buildFiles(assetInfo?: AssetInfoModel) {
        let self = this,
            { certFiles, legalFiles } = self;
        if (assetInfo) {
            let certArrs = (assetInfo.certFiles || '').split(',');
            certArrs.forEach((item: string) => {
                if (item) {
                    let prefix = UploadTypeEnum.CertUpload + '_',
                        index = item.indexOf(prefix) + prefix.length,
                        type = Number(item.substring(index, index + 1));
                    certFiles.set(type, item);
                }
            });
            self.certFiles = certFiles;

            let legalArrs = (assetInfo.legalFiles || '').split(',');
            legalArrs.forEach((item: string) => {
                if (item) {
                    let prefix = UploadTypeEnum.LegalUpload + '_',
                        index = item.indexOf(prefix) + prefix.length,
                        type = Number(item.substring(index, index + 1));
                    legalFiles.set(type, item);
                }
            });
            self.legalFiles = legalFiles;

            let imgs = assetInfo.imgs;
            if (imgs) {
                self.imgs = imgs.split(',').map((img: string, index: number) => ({
                    id: index,
                    url: this.UploadUrl + img,
                    name: img,
                    status: 'done',
                }));
            } else {
                self.imgs = [];
            }
        }
        console.log('buildFiles:', this.certFiles, this.legalFiles, this.imgs);
    }

    // 初始化数据
    initData() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.mode = Number(params['mode']);
        });
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.assetId = Number(params['assetId']);
        });
        this.controlDisabled = this.mode === AssetOperateModeEnum.AuditMode;
    }

    // 获取资产
    getAsset() {
        let self = this,
            { message, assetService, mode, assetId } = self;
        if (mode === AssetOperateModeEnum.AddMode || !assetId) return;

        let msgDf = message.loading('加载中……');
        assetService.getAsset(assetId).subscribe({
            next(data: AssetInfoModel) {
                message.remove(msgDf.messageId);
                self.assetInfo = data;
                self.setFormGroup(data);
                self.buildRegions(data);
                self.buildFiles(data);
            },
            error(err: any) {
                message.remove(msgDf.messageId);
                message.error(err);
            },
        });
    }

    ngOnInit() {
        this.initData();
        this.getAsset();
    }

    ngOnDestroy(): void {
        this.changeSubscription.unsubscribe();
    }

    // 处理行政区划change事件
    handleRegionsChange(values: string[]) {
        this.regions = values;
    }

    // 处理文件上传before事件
    handleUploadBefore(file: any, files: any[]) {
        console.log('handleUploadBefore file:', file);
    }

    // 处理文件上传change事件
    async handleUploadChange(uploadInfo: any, uploadType: UploadTypeEnum, fileType?: number): Promise<void> {
        let { UploadUrl, certFiles, legalFiles, imgs } = this,
            { type, file } = uploadInfo;
        console.log('handleUploadChange type,file:', type, file);

        if (type === 'success') {
            let status = file.status;
            switch (status) {
                case 'uploading':
                    // this.isUploadLoading = true;
                    break;
                case 'done':
                    // let img = await getBase64(info.file.originFileObj!);
                    // this.isUploadLoading = false;
                    let response = file.response,
                        code = response.code,
                        data = response.data;
                    if (code === 0) {
                        if (uploadType === UploadTypeEnum.CertUpload) {
                            certFiles.set(fileType, data);
                            this.certFiles = certFiles;
                        } else if (uploadType === UploadTypeEnum.LegalUpload) {
                            legalFiles.set(fileType, data);
                            this.legalFiles = legalFiles;
                        } else if (uploadType === UploadTypeEnum.ImgUpload) {
                            console.log('handleUploadChange imgs:', imgs);
                        }
                    } else if (code === 401 || code === 402 || code === 403) {
                        alert('登录状态已经失效，请重新登录');
                        window.location.href = '#/login';
                        TokenHelper.removeToken();
                        return;
                    } else {
                        alert(response.message);
                    }
                    break;
                case 'error':
                    alert('网络异常');
                    // this.isUploadLoading = false;
                    break;
            }
        }
    }

    save() {
        this.formType = FormTypeEnum.Save;
    }

    submit() {
        this.formType = FormTypeEnum.Submit;
    }

    submitForm(assetInfoFormData: any) {
        console.log('submitForm formType, formData:', this.formType, assetInfoFormData);
        if (!this.assetInfoFormGroup.valid) {
            for (const i in this.assetInfoFormGroup.controls) {
                this.assetInfoFormGroup.controls[i].markAsDirty();
                this.assetInfoFormGroup.controls[i].updateValueAndValidity();
            }
            return;
        }

        let { router, message, assetService, formType } = this,
            assetInfo = this.buildAssetInfo(assetInfoFormData),
            msgDf = message.loading('处理中……');
        console.log('submitForm assetInfo:', assetInfo);
        if (formType === FormTypeEnum.Save) {
            assetService.saveAsset(assetInfo).subscribe({
                next(result: boolean) {
                    message.remove(msgDf.messageId);
                    if (!result) message.error('保存失败');
                    else {
                        message.success('保存成功');
                        router.navigateByUrl('/asset/list');
                    }
                },
                error(err: any) {
                    message.remove(msgDf.messageId);
                    message.error(err);
                },
            });
        } else if (formType === FormTypeEnum.Submit) {
            assetService.submitAsset(assetInfo).subscribe({
                next(result: boolean) {
                    message.remove(msgDf.messageId);
                    if (!result) message.error('提交失败');
                    else {
                        message.success('提交成功');
                        router.navigateByUrl('/asset/list');
                    }
                },
                error(err: any) {
                    message.remove(msgDf.messageId);
                    message.error(err);
                },
            });
        }
    }

    setStatus(assetId: number, status: AssetStatusEnum) {
        let { router, message, assetService, assetInfoFormGroup } = this,
            msgDf = message.loading('审核中……');
        assetService.setStatus(assetId, status, assetInfoFormGroup.value.auditRemark).subscribe({
            next(result: boolean) {
                message.remove(msgDf.messageId);
                if (!result) message.error('审核失败');
                else {
                    message.success('审核成功');
                    router.navigateByUrl('/asset/list');
                }
            },
            error(err: any) {
                message.remove(msgDf.messageId);
                message.error(err);
            },
        });
    }
}
