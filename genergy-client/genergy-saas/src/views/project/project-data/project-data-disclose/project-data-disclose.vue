<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item>项目</a-breadcrumb-item>
            <a-breadcrumb-item>数据中心</a-breadcrumb-item>
            <a-breadcrumb-item>披露信息</a-breadcrumb-item>
        </a-breadcrumb>

        <a-row class="saas-block search" :gutter="24">
            <a-col :xxl="3" :lg="4" :md="5">
                <a-input
                    type="text"
                    :value="discloseParameters.conditions.no"
                    allowClear
                    placeholder="编号"
                    @change="handleFormChange('no', $event.target.value)"
                />
            </a-col>

            <a-col :xxl="3" :lg="4" :md="5">
                <a-input
                    type="text"
                    :value="discloseParameters.conditions.title"
                    allowClear
                    placeholder="标题"
                    @change="handleFormChange('title', $event.target.value)"
                />
            </a-col>

            <a-col :xxl="6" :lg="8" :md="10">
                {{ ((beginTime = discloseParameters.conditions.beginTime), void 0) }}
                {{ ((endTime = discloseParameters.conditions.endTime), void 0) }}
                <a-range-picker
                    :value="[beginTime ? moment(beginTime) : undefined, endTime ? moment(endTime) : undefined]"
                    :showTime="{
                        format: 'HH:mm:ss',
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                    }"
                    format="YYYY-MM-DD HH:mm:ss"
                    :placeholder="['开始时间', '结束时间']"
                    @change="handleRangePickerChange"
                />
            </a-col>

            <a-col :xxl="3" :lg="4" :md="4">
                <a-button class="saas-search" type="primary" icon="search" @click="search">搜索</a-button>
            </a-col>
        </a-row>

        <div class="saas-block data">
            <div class="saas-tool">
                <a-button
                    class="saas-add"
                    type="primary"
                    icon="upload"
                    @click="
                        $router.push({
                            path: '/project/data/disclose/upload',
                            query: { projectId: String(projectId || '') }
                        })
                    "
                    >上传披露信息</a-button
                >
            </div>

            <a-table
                :columns="columns"
                :rowKey="record => record.id"
                :dataSource="list"
                :pagination="false"
                :loading="isPageLoading"
                bordered
                :scroll="{ x: 1000 }"
            >
                <span :class="`text-${statusColors[record.status]}`" slot="status" slot-scope="record">
                    {{ statusNames[record.status] }}
                </span>

                <span slot="createTime" slot-scope="record">
                    {{ record.createTime | dateFormat('yyyy-MM-dd hh:mm:ss') }}
                </span>

                <span slot="modifyTime" slot-scope="record">
                    {{ record.modifyTime | dateFormat('yyyy-MM-dd hh:mm:ss') }}
                </span>

                <a class="saas-link" slot="file" slot-scope="record" :href="record.fileUrl" target="_blank" download>
                    附件下载
                </a>

                <template slot="operation" slot-scope="record">
                    <a-button
                        v-if="record.status === 0"
                        type="primary"
                        size="small"
                        @click.stop="setOperation(record.id, true)"
                    >
                        允许披露
                    </a-button>
                    <a-button
                        v-if="record.status === 0"
                        type="danger"
                        size="small"
                        @click.stop="setOperation(record.id, false)"
                    >
                        拒绝披露
                    </a-button>
                </template>
            </a-table>

            <a-pagination
                :current="discloseParameters.pageNum"
                :pageSize="discloseParameters.pageSize"
                :total="totalCount"
                :pageSizeOptions="pageSizeOptions"
                :showTotal="total => `共有 ${total} 条记录`"
                showQuickJumper
                showSizeChanger
                @change="handlePageNumChange"
                @showSizeChange="handlePageSizeChange"
            />
        </div>
    </div>
</template>

<style src="./project-data-disclose.less" lang="less" scoped />

<script src="./project-data-disclose.ts" />
