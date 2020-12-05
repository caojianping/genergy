import Vue from 'vue';
import { Mutation, namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { DigitUtil } from '@/ts/utils';
import { Prompt, Token } from '@/ts/common';
import { CONSTANTS, ResponseCode, Urls } from '@/ts/config';
import { GroupModel, DocumentFileModel } from '@/ts/models';

const documentModule = namespace('document');

@Component({
    name: 'ProjectDocumentFiles',
    components: {}
})
export default class ProjectDocumentFiles extends Vue {
    @State('projectId') projectId?: number;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;

    @documentModule.State('groupId') groupId?: number;
    @documentModule.State('itemId') itemId?: number;
    @documentModule.State('files') files!: Array<GroupModel<DocumentFileModel>>;
    @documentModule.Getter('firstGroupId') firstGroupId?: number;
    @documentModule.Getter('groupName') groupName!: string;
    @documentModule.Getter('itemName') itemName!: string;
    @documentModule.Getter('itemAccept') itemAccept!: string;
    @documentModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @documentModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @documentModule.Action('fetchDocumentFiles') fetchDocumentFiles!: (isLoading?: boolean) => any;
    @documentModule.Action('deleteFile') deleteFileAction!: (payload: any) => any;

    headers: any = {};
    action: string = '';

    // 处理文件上传change事件
    async handleUploadChange(uploadInfo: any): Promise<void> {
        let file: any = uploadInfo.file;
        switch (file.status) {
            case 'uploading':
                break;
            case 'done':
                let response = file.response,
                    code = response.code;
                if (code === ResponseCode.Success) {
                    await this.fetchDocumentFiles(true);
                } else if (code === ResponseCode.TokenExpired) {
                    Prompt.error('登录状态已经失效，请重新登录');
                    window.location.href = '#/login';
                    Token.removeTokenInfo();
                    return;
                } else {
                    Prompt.error(response.message);
                }
                break;
            case 'error':
                Prompt.error('网络异常，请稍后重试');
                break;
        }
    }

    // 删除文件
    async deleteFile(fileId: number) {
        try {
            this.setRootStates({ isFullLoading: true });
            let result = await this.deleteFileAction({ fileId, isLoading: false });
            if (!result) {
                this.setRootStates({ isFullLoading: false });
                Prompt.error('文件删除失败');
            } else {
                Prompt.success('文件删除成功');
                await this.fetchDocumentFiles(false);
                this.setRootStates({ isFullLoading: false });
            }
        } catch (error) {
            this.setRootStates({ isFullLoading: false });
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    initData() {
        let params: any = this.$route.params || {};
        this.setStates({
            groupId: DigitUtil.digitConvert(params.groupId),
            itemId: DigitUtil.digitConvert(params.itemId)
        });

        let tokenInfo = Token.getTokenInfo();
        this.headers = { [CONSTANTS.HEADER_TOKEN]: tokenInfo ? tokenInfo.token : '' };
        this.action = Urls.document.uploadFile;
    }

    // 获取数据
    async fetchData() {
        try {
            await this.fetchDocumentFiles(true);
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchData();
    }
}
