import { Caxios } from '@/ts/common';
import { Urls, CaxiosType, DocumentType } from '@/ts/config';
import { DocumentGroupModel, DocumentItemModel, DocumentFileModel } from '@/ts/models';
import { DocumentHelper } from '@/ts/helpers';

export class DocumentService {
    // 获取文档分组列表
    public async fetchDocumentGroups(projectType: number): Promise<Array<DocumentGroupModel>> {
        let result = await Caxios.get<Array<DocumentGroupModel> | null>(
            { url: `${Urls.document.groups}/${projectType}` },
            CaxiosType.Token
        );
        return result || [];
    }

    // 获取文档项目列表
    public async fetchDocumentItems(
        projectId: number,
        groupId: number,
        isLoading: boolean = false
    ): Promise<Array<DocumentItemModel>> {
        let result = await Caxios.get<Array<any> | null>(
            { url: `${Urls.document.items}/${groupId}/${projectId}` },
            isLoading ? CaxiosType.FullLoadingToken : CaxiosType.Token
        );
        (result || []).forEach((item: any) => {
            item.type = {
                document: DocumentType.Directory,
                file: DocumentType.File
            }[item.type];

            let fileSuffix = DocumentHelper.getFileSuffix(item.url);
            item['accept'] = DocumentHelper.getUploadAccept(item.suffix);
            item['fileSuffix'] = fileSuffix;
            item['isImage'] = ['jpg', 'jpeg', 'png', 'gif'].indexOf(fileSuffix) > -1;
        });
        return result || [];
    }

    // 获取文档文件列表
    public async fetchDocumentFiles(
        projectId: number,
        itemId: number,
        isLoading: boolean = false
    ): Promise<Array<DocumentFileModel>> {
        let result = await Caxios.get<Array<DocumentFileModel> | null>(
            { url: `${Urls.document.files}/${itemId}/${projectId}` },
            isLoading ? CaxiosType.FullLoadingToken : CaxiosType.Token
        );
        if (result) {
            result.forEach((item: any) => {
                let fileSuffix = DocumentHelper.getFileSuffix(item.url);
                item['accept'] = DocumentHelper.getUploadAccept(item.suffix);
                item['fileSuffix'] = fileSuffix;
                item['isImage'] = ['jpg', 'jpeg', 'png', 'gif'].indexOf(fileSuffix) > -1;
            });
        }
        return result || [];
    }

    // 删除文件
    public async deleteFile(id: number, isLoading: boolean = false): Promise<boolean> {
        await Caxios.post<any>(
            { url: Urls.document.deleteFile, data: { id } },
            isLoading ? CaxiosType.FullLoadingToken : CaxiosType.Token
        );
        return true;
    }

    // 确认尽调
    public async confirmDiligence(projectId: number): Promise<boolean> {
        await Caxios.post<any>(
            { url: Urls.document.confirmDiligence, data: { projectId } },
            CaxiosType.FullLoadingToken
        );
        return true;
    }
}
