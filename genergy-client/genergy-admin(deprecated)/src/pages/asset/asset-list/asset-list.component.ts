import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

import { AssetStatusNames } from 'src/ts/common/names';
import { PageResult, AssetModel } from 'src/ts/models';
import { AssetService } from 'src/ts/services';

@Component({
    selector: 'app-asset-list',
    templateUrl: './asset-list.component.html',
    styleUrls: ['./asset-list.component.less'],
})
export class AssetListComponent implements OnInit {
    AssetStatusNames: Array<string> = AssetStatusNames;

    queryFormGroup: FormGroup;
    isLoading: boolean = false;
    assetPageResult: PageResult<AssetModel> = {
        current: 1,
        size: 10,
        records: [],
        total: 0,
    };

    constructor(
        private formBuilder: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
        private assetService: AssetService
    ) {
        this.queryFormGroup = this.formBuilder.group({
            putawaySerial: new FormControl(null),
            plantName: new FormControl(null),
            submitter: new FormControl(null),
            auditor: new FormControl(null),
            status: new FormControl(null),
        });
    }

    ngOnInit() {
        this.pageAssets();
    }

    pageAssets(key?: string, $event?: any) {
        let self = this;
        if (key && $event) {
            self.assetPageResult[key] = $event;
        }

        let { message, assetService, queryFormGroup, assetPageResult } = self,
            { current, size } = assetPageResult;
        self.isLoading = true;
        assetService.pageAssets({ current, size, conditions: queryFormGroup.value }).subscribe({
            next(result: PageResult<AssetModel>) {
                self.isLoading = false;
                self.assetPageResult = result;
            },
            error(err: any) {
                self.isLoading = false;
                message.error(err);
            },
        });
    }

    queryAssets() {
        if (!this.queryFormGroup.valid) {
            for (const i in this.queryFormGroup.controls) {
                this.queryFormGroup.controls[i].markAsDirty();
                this.queryFormGroup.controls[i].updateValueAndValidity();
            }
            return;
        }

        this.pageAssets();
    }
}
