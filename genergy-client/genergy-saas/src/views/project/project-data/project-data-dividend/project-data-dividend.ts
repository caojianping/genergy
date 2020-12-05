import Vue from 'vue';
import { namespace, State, Mutation } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Util from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IDividendPageParameters } from '@/ts/interfaces';
import { DividendModel } from '@/ts/models';

const dataModule = namespace('data');

@Component({
    name: 'ProjectDataDividend',
    components: {}
})
export default class ProjectDataDividend extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('projectId') projectId?: number;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Mutation(TYPES.CLEAR_STATES) clearRootStates!: () => any;

    @dataModule.State('dividendParameters') dividendParameters!: IPageParameters<IDividendPageParameters>;
    @dataModule.State('totalCount') totalCount!: number;
    @dataModule.State('list') list!: Array<DividendModel>;
    @dataModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @dataModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @dataModule.Action('fetchDividends') fetchDividends!: () => any;
    @dataModule.Action('auditDividend') auditDividend!: () => any;

    statusNames: Map<number, string> = new Map([
        [0, '待分红'],
        [10, '已分红'],
        [20, '禁止分红']
    ]);
    statusColors: Map<number, string> = new Map([
        [0, 'gray'],
        [10, 'green'],
        [20, 'red']
    ]);
    columns: Array<any> = [
        {
            title: '项目名称',
            dataIndex: 'projectName'
        },
        {
            title: '分红期数',
            key: 'no',
            scopedSlots: { customRender: 'no' }
        },
        {
            title: '收益时间段',
            key: 'section',
            width: 180,
            scopedSlots: { customRender: 'section' }
        },
        {
            title: '分红收益',
            key: 'dividendIncome',
            scopedSlots: { customRender: 'dividendIncome' }
        },
        {
            title: '累计收益',
            key: 'totalIncome',
            scopedSlots: { customRender: 'totalIncome' }
        },
        {
            title: '运营支出',
            key: 'operationExpenses',
            scopedSlots: { customRender: 'operationExpenses' }
        },
        {
            title: '其他支出',
            key: 'otherExpenses',
            scopedSlots: { customRender: 'otherExpenses' }
        },
        {
            title: '资金预留',
            key: 'fundReservation',
            scopedSlots: { customRender: 'fundReservation' }
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
            title: '分红状态',
            key: 'status',
            scopedSlots: { customRender: 'status' }
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

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let dividendParameters = Util.duplicate(this.dividendParameters);
        dividendParameters.pageNum = page;
        dividendParameters.pageSize = pageSize;
        this.setStates({ dividendParameters });
        this.fetchDividends();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let dividendParameters = Util.duplicate(this.dividendParameters);
        dividendParameters.pageNum = 1;
        dividendParameters.pageSize = pageSize;
        this.setStates({ dividendParameters });
        this.fetchDividends();
    }

    // 设置操作
    async setOperation(id: number, status: boolean) {
        this.setStates({ id, status });
        try {
            let msg = status ? '允许分红' : '拒绝分红',
                result = await this.auditDividend();
            if (result) {
                this.$message.success(msg + '成功');
                this.fetchDividends();
            } else Prompt.error(msg + '失败');
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    initData() {
        let dividendParameters = Util.duplicate(this.dividendParameters);
        dividendParameters.conditions.projectId = String(this.projectId || '');
        this.setStates({ dividendParameters });
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchDividends();
    }
}
