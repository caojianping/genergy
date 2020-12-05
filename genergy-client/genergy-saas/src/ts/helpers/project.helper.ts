import { LocalStorage } from 'jts-storage';
import Util, { ArrayUtil } from '@/ts/utils';
import { CONSTANTS } from '@/ts/config';
import { GroupModel, ProjectBriefModel, ProjectFormModel, ProjectTemplateModel, ProjectValueModel } from '@/ts/models';

export class ProjectHelper {
    public static setProjectBriefs(projectBriefs: Array<ProjectBriefModel>) {
        LocalStorage.setItem<Array<ProjectBriefModel>>(CONSTANTS.CACHE_PROJECT_BRIEFS, projectBriefs);
    }

    public static getProjectBriefs(): Array<ProjectBriefModel> {
        return LocalStorage.getItem<Array<ProjectBriefModel>>(CONSTANTS.CACHE_PROJECT_BRIEFS) || [];
    }

    public static removeProjectBriefs(): boolean {
        LocalStorage.removeItem(CONSTANTS.CACHE_PROJECT_BRIEFS);
        return true;
    }

    public static setProjectArchive(projectArchive: ProjectFormModel) {
        LocalStorage.setItem<ProjectFormModel>(CONSTANTS.CACHE_PROJECT_ARCHIVE, projectArchive);
    }

    public static getProjectArchive(): ProjectFormModel | null {
        return LocalStorage.getItem<ProjectFormModel>(CONSTANTS.CACHE_PROJECT_ARCHIVE) || null;
    }

    public static removeProjectArchive(): boolean {
        LocalStorage.removeItem(CONSTANTS.CACHE_PROJECT_ARCHIVE);
        return true;
    }

    public static buildProjectFormByTemplates(
        projectForm: ProjectFormModel,
        templates: Array<ProjectTemplateModel>
    ): ProjectFormModel {
        let oldTemplateGroups = Util.duplicate(projectForm.templateGroups || []),
            newTemplateGroups = ArrayUtil.arrayGroup(templates, 'group');
        // 原模板中如果有缓存数据，则设置新模板的值为缓存值
        if (oldTemplateGroups.length > 0) {
            newTemplateGroups.forEach((templateGroup: GroupModel<ProjectTemplateModel>) => {
                let filterTemplateGroup = oldTemplateGroups.filter(fitem => fitem.group === templateGroup.group)[0];
                if (filterTemplateGroup) {
                    templateGroup.items.forEach((item: ProjectTemplateModel) => {
                        let filterTemplate = filterTemplateGroup.items.filter(fitem => fitem.name === item.name)[0];
                        if (filterTemplate) {
                            item['value'] = filterTemplate.value;
                        }
                    });
                }
            });
        }
        projectForm.templateGroups = newTemplateGroups;
        return projectForm;
    }

    public static buildPostDataByForm(projectForm: ProjectFormModel): any {
        let postData: any = Util.duplicate(projectForm),
            projects: Array<ProjectValueModel> = [];
        projectForm.templateGroups.forEach((templateGroup: GroupModel<ProjectTemplateModel>) => {
            templateGroup.items.forEach((item: ProjectTemplateModel) => {
                let projectValue = new ProjectValueModel();
                projectValue.name = item.name;
                projectValue.title = item.title;
                projectValue.value = item.value;
                projects.push(projectValue);
            });
        });
        postData.projects = projects;
        return postData;
    }
}
