import Vue from 'vue';
import { namespace, State, Mutation } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Util from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IDisclosePageParameters } from '@/ts/interfaces';
import { DiscloseModel } from '@/ts/models';

const dataModule = namespace('data');

@Component({
    name: 'ProjectDataDisclose',
    components: {}
})
export default class ProjectDataDisclose extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('projectId') projectId?: number;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Mutation(TYPES.CLEAR_STATES) clearRootStates!: () => any;

    @dataModule.State('discloseParameters') discloseParameters!: IPageParameters<IDisclosePageParameters>;
    @dataModule.State('totalCount') totalCount!: number;
    @dataModule.State('list') list!: Array<DiscloseModel>;
    @dataModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @dataModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @dataModule.Action('fetchDiscloses') fetchDiscloses!: () => any;
    @dataModule.Action('auditDisclose') auditDisclose!: () => any;

    statusNames: Array<string> = ['待审核', '已审核', '已驳回'];
    statusColors: Array<string> = ['gray', 'green', 'red'];
    columns: Array<any> = [
        {
            title: '编号',
            dataIndex: 'no'
        },
        {
            title: '标题',
            dataIndex: 'title'
        },
        {
            title: '描述',
            dataIndex: 'content'
        },
        {
            title: '状态',
            key: 'status',
            scopedSlots: { customRender: 'status' }
        },
        {
            title: '创建时间',
            key: 'createTime',
            scopedSlots: { customRender: 'createTime' }
        },
        {
            title: '操作时间',
            key: 'modifyTime',
            scopedSlots: { customRender: 'modifyTime' }
        },
        {
            title: '附件',
            key: 'file',
            scopedSlots: { customRender: 'file' }
        },
        {
            title: '操作',
            key: 'operation',
            width: 160,
            scopedSlots: { customRender: 'operation' }
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let discloseParameters = Util.duplicate(this.discloseParameters);
        discloseParameters.conditions[key] = value;
        this.setStates({ discloseParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let discloseParameters = Util.duplicate(this.discloseParameters);
        discloseParameters.conditions.beginTime = dateStrings[0];
        discloseParameters.conditions.endTime = dateStrings[1];
        this.setStates({ discloseParameters });
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let discloseParameters = Util.duplicate(this.discloseParameters);
        discloseParameters.pageNum = page;
        discloseParameters.pageSize = pageSize;
        this.setStates({ discloseParameters });
        this.fetchDiscloses();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let discloseParameters = Util.duplicate(this.discloseParameters);
        discloseParameters.pageNum = 1;
        discloseParameters.pageSize = pageSize;
        this.setStates({ discloseParameters });
        this.fetchDiscloses();
    }

    // 搜索
    async search() {
        try {
            let discloseParameters = Util.duplicate(this.discloseParameters);
            discloseParameters.pageNum = 1;
            this.setStates({ discloseParameters });
            await this.fetchDiscloses();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 设置操作
    async setOperation(id: number, status: boolean) {
        this.setStates({ id, status });
        try {
            let msg = status ? '允许披露' : '拒绝披露',
                result = await this.auditDisclose();
            if (result) {
                this.$message.success(msg + '成功');
                this.fetchDiscloses();
            } else Prompt.error(msg + '失败');
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    initData() {
        let discloseParameters = Util.duplicate(this.discloseParameters);
        discloseParameters.conditions.projectId = String(this.projectId || '');
        this.setStates({ discloseParameters });
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchDiscloses();
    }
}
