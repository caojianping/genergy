import Vue from 'vue';
import { Mutation, namespace, State } from 'vuex-class';
import { Component, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Util, { DigitUtil } from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { TEMPLATE_FILES } from '@/ts/config';
import { GroupModel, DocumentItemModel } from '@/ts/models';

import DocumentItems from '@/components/document-items';

const documentModule = namespace('document');

@Component({
    name: 'ProjectDocumentItems',
    components: { DocumentItems }
})
export default class ProjectDocumentItems extends Vue {
    @State('projectId') projectId?: number;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;

    @documentModule.State('groupId') groupId?: number;
    @documentModule.State('itemGroups') itemGroups!: Array<GroupModel<DocumentItemModel>>;
    @documentModule.Getter('firstGroupId') firstGroupId?: number;
    @documentModule.Getter('groupName') groupName!: string;
    @documentModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @documentModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @documentModule.Action('fetchDocumentItems') fetchDocumentItems!: () => any;
    @documentModule.Action('confirmDiligence') confirmDiligenceAction!: () => any;

    diligenceTemplate: string = TEMPLATE_FILES.DILIGENCE_TEMPLATE;

    // 处理上传文件success事件
    handleUploadSuccess(itemId: number, data: any) {
        let itemGroups = Util.duplicate(this.itemGroups);
        itemGroups.forEach((itemGroup: GroupModel<DocumentItemModel>) => {
            itemGroup.items.forEach((item: DocumentItemModel) => {
                if (item.id === itemId) {
                    item.fileId = data.id;
                    item.url = data.url;
                }
            });
        });
        this.setStates({ itemGroups });
    }

    // 处理删除文件success事件
    handleDeleteSuccess(fileId: number) {
        let itemGroups = Util.duplicate(this.itemGroups);
        itemGroups.forEach((itemGroup: GroupModel<DocumentItemModel>) => {
            itemGroup.items.forEach((item: DocumentItemModel) => {
                if (item.fileId === fileId) {
                    item.fileId = 0;
                    item.url = '';
                }
            });
        });
        this.setStates({ itemGroups });
    }

    // 确认尽调
    async confirmDiligence() {
        try {
            let result = await this.confirmDiligenceAction();
            if (!result) Prompt.error('尽调确认失败');
            else Prompt.success('尽调确认成功，请上传运行数据或者披露信息');
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    initData(route: any) {
        let params: any = route.params || {};
        this.setStates({ groupId: DigitUtil.digitConvert(params.groupId) });
    }

    // 获取数据
    async fetchData() {
        try {
            await this.fetchDocumentItems();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    created() {
        this.initData(this.$route);
    }

    mounted() {
        this.fetchData();
    }

    @Watch('$route')
    watchRoute(route: any) {
        this.initData(route);
        this.fetchData();
    }
}
