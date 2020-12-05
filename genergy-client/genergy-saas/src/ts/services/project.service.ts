import moment from 'moment';
import { DigitUtil } from '@/ts/utils';
import { Caxios } from '@/ts/common';
import { Urls, CaxiosType } from '@/ts/config';
import {
    NotifyModel,
    ProjectModel,
    ProjectFormModel,
    ProjectBriefModel,
    ProjectTypeModel,
    ProjectTemplateModel,
    PublishFormModel,
    ProjectStatsModel,
    PublishInfoModel
} from '@/ts/models';
import { ProjectHelper } from '@/ts/helpers';

export class ProjectService {
    // 获取通知列表
    public async fetchNotifies(projectId: number): Promise<Array<NotifyModel>> {
        let result = await Caxios.get<Array<NotifyModel> | null>(
            { url: `${Urls.project.notifies}?projectId=${projectId}` },
            CaxiosType.Token
        );
        if (result) {
            result.forEach((item: any) => {
                item['linkType'] = DigitUtil.digitConvert(item.linkPage);
            });
        }
        return (result || []).slice(0, 5);
    }

    // 获取项目统计数据
    public async fetchProjectStats(projectId: number): Promise<ProjectStatsModel | null> {
        let result = await Caxios.get<ProjectStatsModel | null>(
            { url: `${Urls.project.stats}?projectId=${projectId}` },
            CaxiosType.Token
        );
        if (result) {
            result['newDividend'] = DigitUtil.digitConvert(result.newDividend) || 0;
            result['totalDividend'] = DigitUtil.digitConvert(result.totalDividend) || 0;
            result['newPower'] = DigitUtil.digitConvert(result.newPower) || 0;
            result['totalPower'] = DigitUtil.digitConvert(result.totalPower) || 0;
        }
        return result;
    }

    // 获取项目详情
    public async fetchProject(projectId: number, isLoading: boolean = false): Promise<ProjectModel | null> {
        let result: any = await Caxios.get<ProjectModel | null>(
            { url: `${Urls.project.detail}/${projectId}` },
            isLoading ? CaxiosType.FullLoadingToken : CaxiosType.Token
        );
        if (result) {
            result['status'] = DigitUtil.digitConvert(result.status) || 0;
        }
        return result;
    }

    // 获取项目简要列表
    public async fetchProjectBriefs(): Promise<Array<ProjectBriefModel>> {
        let result = await Caxios.get<Array<any> | null>({ url: Urls.project.briefs }, CaxiosType.Token);
        if (result) {
            result.forEach((item: any) => {
                item['status'] = DigitUtil.digitConvert(item.status);
            });
        }
        return result || [];
    }

    // 获取项目简要列表
    public async fetchProjectBrief(projectId: number): Promise<ProjectBriefModel | null> {
        let result = await Caxios.get<any>({ url: `${Urls.project.brief}/${projectId}` }, CaxiosType.Token);
        if (result) {
            result['status'] = DigitUtil.digitConvert(result.status);
        }
        return result;
    }

    // 获取项目类型列表
    public async fetchProjectTypes(): Promise<Array<ProjectTypeModel>> {
        let result = await Caxios.get<Array<ProjectTypeModel> | null>({ url: Urls.project.types }, CaxiosType.Token);
        return result || [];
    }

    // 获取项目模板列表
    public async fetchProjectTemplates(typeId: number): Promise<Array<ProjectTemplateModel>> {
        let result = await Caxios.get<Array<ProjectTemplateModel> | null>(
            { url: `${Urls.project.templates}/${typeId}` },
            CaxiosType.Token
        );
        if (result) {
            result.forEach((item: any) => {
                item['index'] = DigitUtil.digitConvert(item.index) || 0;
                item['controlType'] = DigitUtil.digitConvert(item.controlType) || 0;
                item['dataType'] = DigitUtil.digitConvert(item.dataType) || 0;
            });
        }
        return result || [];
    }

    // 保存项目
    public async saveProject(projectForm: ProjectFormModel): Promise<number | null> {
        // todo: 验证表单
        let postData = ProjectHelper.buildPostDataByForm(projectForm);
        delete postData.templateGroups;

        let depreciation: any = DigitUtil.digitPercent(postData.depreciation, 4, false, true);
        postData.depreciation = depreciation;
        postData.completionDate = moment(postData.completionDate).format('YYYY-MM-DD');
        postData.operationDate = moment(postData.operationDate).format('YYYY-MM-DD');
        console.log('saveProject:', postData);
        return await Caxios.post<number | null>({ url: Urls.project.save, data: postData }, CaxiosType.Token);
    }

    // 发行项目
    public async publishProject(publishForm: PublishFormModel): Promise<boolean> {
        // todo: 验证表单
        let minRate: any = DigitUtil.digitPercent(publishForm.minRate, 4, false, true),
            maxRate: any = DigitUtil.digitPercent(publishForm.maxRate, 4, false, true);
        publishForm.minRate = minRate;
        publishForm.maxRate = maxRate;
        publishForm.startTime = moment(publishForm.startTime).format('YYYY-MM-DD');
        await Caxios.post<any>({ url: Urls.project.publish, data: publishForm }, CaxiosType.FullLoadingToken);
        return true;
    }

    // 获取发行信息
    public async fetchPublishInfo(projectId: number): Promise<PublishInfoModel | null> {
        return await Caxios.get<PublishInfoModel | null>(
            { url: `${Urls.project.publishInfo}?projectId=${projectId}` },
            CaxiosType.Token
        );
    }
}
