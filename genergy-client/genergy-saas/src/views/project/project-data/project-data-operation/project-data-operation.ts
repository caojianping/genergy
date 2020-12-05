import Vue from 'vue';
import { namespace, State, Mutation } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Util from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IOperationPageParameters } from '@/ts/interfaces';
import { OperationModel } from '@/ts/models';

const dataModule = namespace('data');

@Component({
    name: 'ProjectDataOperation',
    components: {}
})
export default class ProjectDataOperation extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('projectId') projectId?: number;
    @Mutation(TYPES.SET_STATES) setRootStates!: (payload: any) => any;
    @Mutation(TYPES.CLEAR_STATES) clearRootStates!: () => any;

    @dataModule.State('operationParameters') operationParameters!: IPageParameters<IOperationPageParameters>;
    @dataModule.State('totalCount') totalCount!: number;
    @dataModule.State('list') list!: Array<OperationModel>;
    @dataModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @dataModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @dataModule.Action('fetchOperations') fetchOperations!: () => any;

    columns: Array<any> = [
        {
            title: '编号',
            dataIndex: 'no'
        },
        {
            title: '基础设施名称',
            dataIndex: 'projectName'
        },
        {
            title: '数据日期',
            dataIndex: 'date'
        },
        {
            title: '日照时长',
            key: 'sunshineDuration',
            scopedSlots: { customRender: 'sunshineDuration' }
        },
        {
            title: '日发电总量',
            key: 'totalPower',
            scopedSlots: { customRender: 'totalPower' }
        },
        {
            title: '日上网电量',
            key: 'sellPower',
            scopedSlots: { customRender: 'sellPower' }
        },
        {
            title: '温度范围',
            key: 'temperature',
            scopedSlots: { customRender: 'temperature' }
        },
        {
            title: '天气情况',
            key: 'weather',
            scopedSlots: { customRender: 'weather' }
        },
        {
            title: '上传时间',
            key: 'createTime',
            scopedSlots: { customRender: 'createTime' }
        },
        {
            title: '附件',
            key: 'file',
            scopedSlots: { customRender: 'file' }
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let operationParameters = Util.duplicate(this.operationParameters);
        operationParameters.conditions[key] = value;
        this.setStates({ operationParameters });
    }

    // 处理日期change事件
    handleRangePickerChange(dates: Array<any>, dateStrings: Array<string>) {
        let operationParameters = Util.duplicate(this.operationParameters);
        operationParameters.conditions.beginTime = dateStrings[0];
        operationParameters.conditions.endTime = dateStrings[1];
        this.setStates({ operationParameters });
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let operationParameters = Util.duplicate(this.operationParameters);
        operationParameters.pageNum = page;
        operationParameters.pageSize = pageSize;
        this.setStates({ operationParameters });
        this.fetchOperations();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let operationParameters = Util.duplicate(this.operationParameters);
        operationParameters.pageNum = 1;
        operationParameters.pageSize = pageSize;
        this.setStates({ operationParameters });
        this.fetchOperations();
    }

    // 搜索
    async search() {
        try {
            let operationParameters = Util.duplicate(this.operationParameters);
            operationParameters.pageNum = 1;
            this.setStates({ operationParameters });
            await this.fetchOperations();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 初始化数据
    initData() {
        let operationParameters = Util.duplicate(this.operationParameters);
        operationParameters.conditions.projectId = String(this.projectId || '');
        this.setStates({ operationParameters });
    }

    created() {
        this.initData();
    }

    mounted() {
        this.fetchOperations();
    }
}
