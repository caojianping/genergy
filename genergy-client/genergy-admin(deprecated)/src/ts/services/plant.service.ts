import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Utils } from '../util';
import { Urls } from '../common/urls';
import { IPageParameters, IPlantPageConditions } from '../interfaces';
import { PageResult, PlantModel } from '../models';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class PlantService {
    constructor(private httpService: HttpService) {}

    pagePlants(pageParameters: IPageParameters<IPlantPageConditions>): Observable<PageResult<PlantModel>> {
        let { current, size, conditions } = pageParameters,
            putawayTimeRange = conditions.putawayTimeRange || [],
            tconditions = {
                putawaySerial: conditions.putawaySerial,
                plantName: conditions.plantName,
                putawayStartTime: putawayTimeRange[0],
                putawayEndTime: putawayTimeRange[1],
            },
            parameters = Utils.buildParameters(tconditions);
        return this.httpService.get<PageResult<PlantModel>>(`${Urls.plant.page}/${current}/${size}?${parameters}`);
    }
}
