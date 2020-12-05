<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item>项目</a-breadcrumb-item>
            <a-breadcrumb-item>
                <router-link :to="{ path: '/project/data/disclose', query: { projectId: String(projectId || '') } }">
                    数据中心
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>分红数据</a-breadcrumb-item>
        </a-breadcrumb>

        <div class="saas-block data">
            <div class="saas-tool">
                <a-button
                    class="saas-add"
                    type="primary"
                    icon="upload"
                    @click="
                        $router.push({
                            path: '/project/data/dividend/upload',
                            query: { projectId: String(projectId || '') }
                        })
                    "
                    >上传分红数据</a-button
                >
            </div>

            <a-table
                :columns="columns"
                :rowKey="record => record.id"
                :dataSource="list"
                :pagination="false"
                :loading="isPageLoading"
                bordered
                :scroll="{ x: 1200 }"
            >
                <span slot="no" slot-scope="record">
                    {{ record.no | unit('期') }}
                </span>

                <span slot="section" slot-scope="record">
                    {{ record.beginTime | dateFormat('yyyy-MM-dd hh:mm:ss') }} ~<br />
                    {{ record.endTime | dateFormat('yyyy-MM-dd hh:mm:ss') }}
                </span>

                <span slot="dividendIncome" slot-scope="record">
                    {{ record.dividendIncome | unit('元') }}
                </span>

                <span slot="totalIncome" slot-scope="record">
                    {{ record.totalIncome | unit('元') }}
                </span>

                <span slot="operationExpenses" slot-scope="record">
                    {{ record.operationExpenses | unit('元') }}
                </span>

                <span slot="otherExpenses" slot-scope="record">
                    {{ record.otherExpenses | unit('元') }}
                </span>

                <span slot="fundReservation" slot-scope="record">
                    {{ record.fundReservation | unit('元') }}
                </span>

                <span slot="createTime" slot-scope="record">
                    {{ record.createTime | dateFormat('yyyy-MM-dd hh:mm:ss') }}
                </span>

                <span slot="modifyTime" slot-scope="record">
                    {{ record.modifyTime | dateFormat('yyyy-MM-dd hh:mm:ss') }}
                </span>

                <span :class="`text-${statusColors.get(record.status)}`" slot="status" slot-scope="record">{{
                    statusNames.get(record.status)
                }}</span>

                <a class="saas-link" slot="file" slot-scope="record" :href="record.fileUrl" download>附件下载</a>

                <template slot="operation" slot-scope="record">
                    <a-button
                        v-if="record.status === 0 || record.status === 20"
                        type="primary"
                        size="small"
                        @click.stop="setOperation(record.id, true)"
                    >
                        允许分红
                    </a-button>
                    <a-button
                        v-if="record.status === 0"
                        type="danger"
                        size="small"
                        @click.stop="setOperation(record.id, false)"
                    >
                        禁止分红
                    </a-button>
                </template>
            </a-table>

            <a-pagination
                :current="dividendParameters.pageNum"
                :pageSize="dividendParameters.pageSize"
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

<style src="./project-data-dividend.less" lang="less" scoped />

<script src="./project-data-dividend.ts" />
