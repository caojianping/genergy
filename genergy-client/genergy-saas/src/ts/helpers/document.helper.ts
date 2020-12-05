import { LocalStorage } from 'jts-storage';
import { CONSTANTS, MIME_TYPES } from '@/ts/config';
import { DocumentGroupModel } from '@/ts/models';

export class DocumentHelper {
    public static setDocumentGroups(groups: Array<DocumentGroupModel>) {
        LocalStorage.setItem<Array<DocumentGroupModel>>(CONSTANTS.CACHE_DOCUMENT_GROUPS, groups);
    }

    public static getDocumentGroups(): Array<DocumentGroupModel> {
        return LocalStorage.getItem<Array<DocumentGroupModel>>(CONSTANTS.CACHE_DOCUMENT_GROUPS) || [];
    }

    public static removeDocumentGroups(): boolean {
        LocalStorage.removeItem(CONSTANTS.CACHE_DOCUMENT_GROUPS);
        return true;
    }

    public static getUploadAccept(limit: string): string {
        let slimit = limit || '',
            parts: Array<any> = slimit.split(',').map(item => !!item);
        parts.map((part: string) => {
            return MIME_TYPES[part] || part;
        });
        return parts.join(',');
    }

    public static getFileSuffix(file: string): string {
        if (!file) return '';
        return file.substring(file.lastIndexOf('.') + 1, file.length);
    }
}
