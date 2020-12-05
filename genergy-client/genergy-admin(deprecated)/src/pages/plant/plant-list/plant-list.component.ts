import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

import { PageResult, PlantModel } from 'src/ts/models';
import { PlantService } from 'src/ts/services';

@Component({
    selector: 'app-plant-list',
    templateUrl: './plant-list.component.html',
    styleUrls: ['./plant-list.component.less'],
})
export class PlantListComponent implements OnInit {
    queryFormGroup: FormGroup;
    isLoading: boolean = false;
    plantPageResult: PageResult<PlantModel> = {
        current: 1,
        size: 10,
        records: [],
        total: 0,
    };

    constructor(
        private formBuilder: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
        private plantService: PlantService
    ) {
        this.queryFormGroup = this.formBuilder.group({
            putawaySerial: new FormControl(null),
            plantName: new FormControl(null),
            putawayTimeRange: new FormControl(null),
        });
    }

    ngOnInit() {
        this.pagePlants();
    }

    pagePlants(key?: string, $event?: any) {
        let self = this;
        if (key && $event) {
            self.plantPageResult[key] = $event;
        }

        let { message, plantService, queryFormGroup, plantPageResult } = self,
            { current, size } = plantPageResult;
        self.isLoading = true;
        plantService.pagePlants({ current, size, conditions: queryFormGroup.value }).subscribe({
            next(result: PageResult<PlantModel>) {
                console.log('result:', result);
                self.isLoading = false;
                self.plantPageResult = result;
            },
            error(err: any) {
                console.log('err:', err);
                self.isLoading = false;
                message.error(err);
            },
        });
    }

    queryPlants() {
        if (!this.queryFormGroup.valid) {
            for (const i in this.queryFormGroup.controls) {
                this.queryFormGroup.controls[i].markAsDirty();
                this.queryFormGroup.controls[i].updateValueAndValidity();
            }
            return;
        }

        this.pagePlants();
    }
}
