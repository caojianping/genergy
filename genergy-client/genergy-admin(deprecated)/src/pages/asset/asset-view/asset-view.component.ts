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
    selector: 'app-asset-view',
    templateUrl: './asset-view.component.html',
    styleUrls: ['./asset-view.component.less'],
})
export class AssetViewComponent implements OnInit {
    UploadUrl: string = Urls.upload.url;

    PlantTypeNames: Array<string> = PlantTypeNames;
    PlantStatusNames: Array<string> = PlantStatusNames;
    AssetStatusNames: Array<string> = AssetStatusNames;
    CompanyTypeNames: Array<string> = CompanyTypeNames;
    CorpCertTypeNames: Array<string> = CorpCertTypeNames;

    CertFileTypeNames: Array<string> = CertFileTypeNames;
    LegalFileTypeNames: Array<string> = LegalFileTypeNames;

    assetId: number;
    assetInfo: AssetInfoModel;

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

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
        private assetService: AssetService
    ) {}

    // 构建文件
    buildFiles(assetInfo: AssetInfoModel) {
        let self = this,
            { certFiles, legalFiles } = self;

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
            self.imgs = imgs.split(',').map((img: string, index: number) => this.UploadUrl + img);
        } else {
            self.imgs = [];
        }
        console.log('buildFiles:', this.certFiles, this.legalFiles, this.imgs);
    }

    // 初始化数据
    initData() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.assetId = Number(params['assetId']);
        });
    }

    // 获取资产
    getAsset() {
        let self = this,
            { message, assetService, assetId } = self;
        if (!assetId) return;

        let msgDf = message.loading('加载中……');
        assetService.getAsset(assetId).subscribe({
            next(data: AssetInfoModel) {
                message.remove(msgDf.messageId);
                self.assetInfo = data;
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
}
