import moment from 'moment';
import Validator, { ValidationResult } from 'jpts-validator';
import Util, { ParameterUtil } from '@/ts/utils';
import { Caxios } from '@/ts/common';
import { Urls, CaxiosType } from '@/ts/config';
import {
    IPageParameters,
    IDisclosePageParameters,
    IDividendPageParameters,
    IOperationPageParameters
} from '@/ts/interfaces';
import {
    PageResult,
    DiscloseModel,
    DiscloseFormModel,
    DividendModel,
    DividendFormModel,
    OperationModel,
    OperationFormModel
} from '@/ts/models';

export class DataService {
    // 构建FormData
    public static buildFormData(form: DiscloseFormModel | DividendFormModel | OperationFormModel): any {
        let formData = new FormData();
        for (let key in form) {
            let value = form[key];
            if (key === 'files') {
                if (Array.isArray(value)) {
                    value.forEach((item: any) => {
                        item && formData.append('file', item);
                    });
                }
            } else {
                formData.append(key, value);
            }
        }
        return formData;
    }

    // 验证披露信息表单
    public static validateDiscloseForm(discloseForm: DiscloseFormModel): ValidationResult {
        if (!discloseForm) return { status: false, data: { passwordForm: '披露信息表单不可以为空' } };

        let key = 'discloseForm',
            validator = new Validator();
        return validator.execute(key);
    }

    // 验证分红数据表单
    public static validateDividendForm(dividendForm: DividendFormModel): ValidationResult {
        if (!dividendForm) return { status: false, data: { passwordForm: '分红数据表单不可以为空' } };

        let key = 'dividendForm',
            validator = new Validator();
        return validator.execute(key);
    }

    // 验证运行数据表单
    public static validateOperationForm(operationForm: OperationFormModel): ValidationResult {
        if (!operationForm) return { status: false, data: { passwordForm: '运行数据表单不可以为空' } };

        let key = 'operationForm',
            validator = new Validator();
        return validator.execute(key);
    }

    // 获取披露信息列表
    public async fetchDiscloses(
        parameters: IPageParameters<IDisclosePageParameters>
    ): Promise<PageResult<DiscloseModel>> {
        let url = Urls.data.disclose.list,
            result = await Caxios.get<PageResult<DiscloseModel> | null>(
                { url: `${url}?${ParameterUtil.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        return result || new PageResult<DiscloseModel>(0, []);
    }

    // 上传披露信息
    public async uploadDisclose(discloseForm: DiscloseFormModel): Promise<boolean> {
        let result: ValidationResult = DataService.validateDiscloseForm(discloseForm);
        if (!result.status) return Promise.reject(Util.getFirstValue(result.data));

        console.log('uploadDisclose:', discloseForm);
        let formData = DataService.buildFormData(discloseForm);
        await Caxios.post<any>(
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                url: Urls.data.disclose.upload,
                data: formData
            },
            CaxiosType.FullLoadingToken
        );
        return true;
    }

    // 审核披露信息
    public async auditDisclose(id: number, status: boolean): Promise<boolean> {
        await Caxios.post<any>(
            {
                url: Urls.data.disclose.audit,
                data: { id, status }
            },
            CaxiosType.FullLoadingToken
        );
        return true;
    }

    // 获取分红数据列表
    public async fetchDividends(
        parameters: IPageParameters<IDividendPageParameters>
    ): Promise<PageResult<DividendModel>> {
        let url = Urls.data.dividend.list,
            result = await Caxios.get<PageResult<DividendModel> | null>(
                { url: `${url}?${ParameterUtil.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        return result || new PageResult<DividendModel>(0, []);
    }

    // 上传分红数据
    public async uploadDividend(dividendForm: DividendFormModel): Promise<boolean> {
        let result: ValidationResult = DataService.validateDividendForm(dividendForm);
        if (!result.status) return Promise.reject(Util.getFirstValue(result.data));

        dividendForm.beginTime = moment(dividendForm.beginTime).format('YYYY-MM-DD');
        dividendForm.endTime = moment(dividendForm.endTime).format('YYYY-MM-DD');
        console.log('uploadDividend:', dividendForm);

        let formData = DataService.buildFormData(dividendForm);
        await Caxios.post<any>(
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                url: Urls.data.dividend.upload,
                data: formData
            },
            CaxiosType.FullLoadingToken
        );
        return true;
    }

    // 审核分红数据
    public async auditDividend(id: number, status: boolean): Promise<boolean> {
        await Caxios.post<any>(
            {
                url: Urls.data.dividend.audit,
                data: { id, status }
            },
            CaxiosType.FullLoadingToken
        );
        return true;
    }

    // 获取分红期数
    public async fetchDividendPeriod(projectId: number): Promise<number> {
        let url = Urls.data.dividend.period,
            result = await Caxios.get<number | null>(
                { url: `${url}?projectId=${projectId}` },
                CaxiosType.PageLoadingToken
            );
        return result || 0;
    }

    // 获取运行数据列表
    public async fetchOperations(
        parameters: IPageParameters<IOperationPageParameters>
    ): Promise<PageResult<OperationModel>> {
        let url = Urls.data.operation.list,
            result = await Caxios.get<PageResult<OperationModel> | null>(
                { url: `${url}?${ParameterUtil.buildPageParameters(parameters)}` },
                CaxiosType.PageLoadingToken
            );
        return result || new PageResult<OperationModel>(0, []);
    }

    // 上传运行数据
    public async uploadOperation(operationForm: OperationFormModel): Promise<boolean> {
        let result: ValidationResult = DataService.validateOperationForm(operationForm);
        if (!result.status) return Promise.reject(Util.getFirstValue(result.data));

        operationForm.date = moment(operationForm.date).format('YYYY-MM-DD');
        console.log('uploadOperation:', operationForm);

        let formData = DataService.buildFormData(operationForm);
        await Caxios.post<any>(
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                url: Urls.data.operation.upload,
                data: formData
            },
            CaxiosType.FullLoadingToken
        );
        return true;
    }
}
