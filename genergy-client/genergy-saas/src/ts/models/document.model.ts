import { DocumentType } from '@/ts/config';

// 文档分组模型
export class DocumentGroupModel {
    id!: number; // 文档分组编号
    name!: string; // 文档分组名称
    projectType!: number; // 项目类型
    projectTypeName!: string; // 项目类型名称
    status!: number;
}

// 文档项目模型
export class DocumentItemModel {
    id!: number; // 编号
    parentId!: number; // 父级编号
    name!: string; // 名称
    type!: DocumentType; // 类型
    group!: string; // 分组
    suffix!: string; // 后缀
    fileId!: number; // 文件编号
    url!: string; // 文件url

    // 补充字段
    accept!: string;
    fileSuffix!: string; // 文件后缀
    isImage!: boolean; // 是否为图片
}

// 文档文件模型
export class DocumentFileModel {
    id!: number;
    projectId!: number;
    fileName!: string; // 名称
    suffix!: string; // 后缀
    url!: string;

    // 补充字段
    accept!: string;
    fileSuffix!: string; // 文件后缀
    isImage!: boolean; // 是否为图片
}
