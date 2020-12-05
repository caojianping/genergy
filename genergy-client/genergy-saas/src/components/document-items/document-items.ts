import Vue from 'vue';
import { Mutation, namespace } from 'vuex-class';
import { Component, Prop } from 'vue-property-decorator';

import TYPES from '@/store/types';
import { Prompt, Token } from '@/ts/common';
import { CONSTANTS, ResponseCode, Urls } from '@/ts/config';
import { GroupModel, DocumentItemModel } from '@/ts/models';

const documentModule = namespace('document');

@Component({
    name: 'DocumentItems',
    components: {}
})
export default class DocumentItems extends Vue {
    @Prop() itemGroups!: Array<GroupModel<DocumentItemModel>>;
    @Prop() projectId!: number;
    @Prop() groupId!: number;
    @Prop() isShadow!: boolean;

    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @documentModule.Action('deleteFile') deleteFileAction!: (payload: any) => any;

    headers: any = {};
    action: string = '';

    // 处理文件上传change事件
    async handleUploadChange(itemId: number, uploadInfo: any): Promise<void> {
        let file: any = uploadInfo.file;
        switch (file.status) {
            case 'uploading':
                break;
            case 'done':
                let response = file.response,
                    code = response.code;
                if (code === ResponseCode.Success) {
                    this.$emit('uploadSuccess', itemId, response.data);
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
                this.setRootStates({ isFullLoading: false });
                Prompt.success('文件删除成功');
                this.$emit('deleteSuccess', fileId);
            }
        } catch (error) {
            this.setRootStates({ isFullLoading: true });
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    initData() {
        let tokenInfo = Token.getTokenInfo();
        this.headers = { [CONSTANTS.HEADER_TOKEN]: tokenInfo ? tokenInfo.token : '' };
        this.action = Urls.document.uploadFile;
    }

    created() {
        this.initData();
    }
}
