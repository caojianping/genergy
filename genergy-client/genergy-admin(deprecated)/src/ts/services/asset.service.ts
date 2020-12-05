import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Utils } from '../util';
import { Urls } from '../common/urls';
import { AssetStatusEnum } from '../common/enums';
import { IPageParameters, IAssetPageConditions } from '../interfaces';
import { PageResult, AssetModel, AssetInfoModel } from '../models';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class AssetService {
    constructor(private httpService: HttpService) {}

    pageAssets(pageParameters: IPageParameters<IAssetPageConditions>): Observable<PageResult<AssetModel>> {
        let { current, size, conditions } = pageParameters,
            parameters = Utils.buildParameters(conditions, ['plantName', 'submitter', 'auditor']);
        return this.httpService.get<PageResult<AssetModel>>(`${Urls.asset.page}/${current}/${size}?${parameters}`);
    }

    getAsset(assetId: number): Observable<AssetInfoModel> {
        return this.httpService.get<PageResult<AssetInfoModel>>(`${Urls.asset.detail}/${assetId}`);
    }

    saveAsset(assetInfo: AssetInfoModel): Observable<boolean> {
        return this.httpService.post<boolean>(Urls.asset.save, assetInfo);
    }

    submitAsset(assetInfo: AssetInfoModel): Observable<boolean> {
        return this.httpService.post<boolean>(Urls.asset.submit, assetInfo);
    }

    setStatus(assetId: number, status: AssetStatusEnum, auditRemark: string): Observable<boolean> {
        return this.httpService.post<boolean>(`${Urls.asset.setStatus}`, { assetId, status, auditRemark });
    }
}
