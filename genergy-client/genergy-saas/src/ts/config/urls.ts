const baseUrl = process.env.VUE_APP_BASE_URL;

export const Urls = {
    common: {},
    account: {
        login: `${baseUrl}/login`,
        logout: `${baseUrl}/logout`
    },
    project: {
        notifies: `${baseUrl}/main/notify/list`, // 通知列表接口
        stats: `${baseUrl}/main/projectData`, // 项目统计数据接口
        detail: `${baseUrl}/project/info`, // 项目详情接口
        briefs: `${baseUrl}/project/list`, // 项目摘要列表接口
        brief: `${baseUrl}/project/projectSummary`, // 项目摘要接口
        types: `${baseUrl}/project/projectType/list`, // 项目类型列表接口
        templates: `${baseUrl}/project/projectType`, // 模板列表接口
        save: `${baseUrl}/project/save`, // 保存项目接口
        publish: `${baseUrl}/issuance`, // 发行项目接口
        publishInfo: `${baseUrl}/issuance/info` // 发行信息接口
    },
    data: {
        // 披露信息
        disclose: {
            list: `${baseUrl}/dataCenter/informationLeakList`, // 披露信息-列表接口
            upload: `${baseUrl}/dataCenter/upload/informationLeak`, // 披露信息-上传接口
            audit: `${baseUrl}/dataCenter/informationLeak/audit` // 披露信息-审核接口
        },
        // 分红数据
        dividend: {
            list: `${baseUrl}/dataCenter/getDividendList`, // 分红数据-列表接口
            upload: `${baseUrl}/dataCenter/upload/dividend`, // 分红数据-上传接口
            audit: `${baseUrl}/dataCenter/dividend/audit`, // 分红数据-审核接口
            period: `${baseUrl}/dataCenter/getDividendLength` // 分红数据-期数接口
        },
        // 运行数据
        operation: {
            list: `${baseUrl}/dataCenter/getOperationList`, // 运行数据-列表接口
            upload: `${baseUrl}/dataCenter/upload/operation` // 运行数据-上传接口
        }
    },
    document: {
        groups: `${baseUrl}/fileCenter/group/list`, // 文档分组列表接口
        items: `${baseUrl}/fileCenter/item/list`, // 文档项目列表接口
        files: `${baseUrl}/fileCenter/file`, // 文档文件列表接口
        uploadFile: `${baseUrl}/fileCenter/upload`, // 上传文件接口
        deleteFile: `${baseUrl}/fileCenter/delete`, // 删除文件接口
        confirmDiligence: `${baseUrl}/fileCenter/confirmSubmit` // 确认尽调接口
    },
    user: {
        list: `${baseUrl}/user/list`, // 用户列表接口
        detail: `${baseUrl}/user/getLoginUser`, // 用户详情接口
        add: `${baseUrl}/user/add` // 添加用户接口
    }
};
