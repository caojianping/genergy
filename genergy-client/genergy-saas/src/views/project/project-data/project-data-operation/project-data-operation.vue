<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item>项目</a-breadcrumb-item>
            <a-breadcrumb-item>
                <router-link :to="{ path: '/project/data/disclose', query: { projectId: String(projectId || '') } }">
                    数据中心
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>运行数据</a-breadcrumb-item>
        </a-breadcrumb>

        <a-row class="saas-block search" :gutter="24">
            <a-col :xxl="3" :lg="4" :md="5">
                <a-input
                    type="text"
                    :value="operationParameters.conditions.no"
                    allowClear
                    placeholder="编号"
                    @change="handleFormChange('no', $event.target.value)"
                />
            </a-col>

            <a-col :xxl="6" :lg="8" :md="10">
                {{ ((beginTime = operationParameters.conditions.beginTime), void 0) }}
                {{ ((endTime = operationParameters.conditions.endTime), void 0) }}
                <a-range-picker
                    :value="[beginTime ? moment(beginTime) : undefined, endTime ? moment(endTime) : undefined]"
                    format="YYYY-MM-DD"
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
                            path: '/project/data/operation/upload',
                            query: { projectId: String(projectId || '') }
                        })
                    "
                    >上传运行数据</a-button
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
                <span slot="sunshineDuration" slot-scope="record">
                    {{ record.sunshineDuration | unit('小时') }}
                </span>

                <span slot="totalPower" slot-scope="record">
                    {{ record.totalPower | unit('kwh') }}
                </span>

                <span slot="sellPower" slot-scope="record">
                    {{ record.sellPower | unit('kwh') }}
                </span>

                <span slot="temperature" slot-scope="record">
                    {{ record.minimumTemperature | unit('度') }} ~
                    {{ record.maximumTemperature | unit('度') }}
                </span>

                <span slot="weather" slot-scope="record">
                    {{ record.weather }}
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
            </a-table>

            <a-pagination
                :current="operationParameters.pageNum"
                :pageSize="operationParameters.pageSize"
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

<style src="./project-data-operation.less" lang="less" scoped />

<script src="./project-data-operation.ts" />
