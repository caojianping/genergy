<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item>项目</a-breadcrumb-item>
            <a-breadcrumb-item>
                <router-link :to="{ path: '/project/data/disclose', query: { projectId: String(projectId || '') } }">
                    数据中心
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>基本情况数据</a-breadcrumb-item>
        </a-breadcrumb>

        {{ ((projectObj = project || {}), void 0) }}
        {{ ((publishInfoObj = publishInfo || {}), void 0) }}
        <div class="project-block project-block-basic">
            <h2 class="project-block-title">基本情况信息</h2>
            <div class="project-block-body">
                <table>
                    <tr>
                        <th>项目编号</th>
                        <td>{{ projectObj.projectId }}</td>
                        <th>基础设施名称</th>
                        <td>{{ projectObj.name }}</td>
                        <th>项目类型</th>
                        <td>{{ projectObj.projectTypeName }}</td>
                    </tr>

                    <tr>
                        <th>项目公司</th>
                        <td>{{ projectObj.projectCompany }}</td>
                        <th>项目方法人代表</th>
                        <td>{{ projectObj.projectLegal }}</td>
                        <th>项目方地址</th>
                        <td>{{ projectObj.projectLocation }}</td>
                    </tr>
                    <tr>
                        <th>建设公司</th>
                        <td>{{ projectObj.constructionCompany }}</td>
                        <th>建成日期</th>
                        <td>{{ projectObj.completionDate }}</td>
                        <th>运营日期</th>
                        <td>{{ projectObj.operationDate }}</td>
                    </tr>
                    <tr>
                        <th>设施状态</th>
                        <td>{{ runningStatuses[projectObj.runningStatus] }}</td>
                        <th>项目总投资</th>
                        <td>{{ projectObj.totalInvestment | unit('元') }}</td>
                        <th>出让价值</th>
                        <td>{{ projectObj.value | unit('元') }}</td>
                    </tr>
                    <tr>
                        <th>资产折旧率</th>
                        <td>{{ projectObj.depreciation | digitPercent(2) }}</td>
                        <th>发行方式</th>
                        <td>{{ publishModes[publishInfoObj.mode] }}</td>
                        <th>发行总量</th>
                        <td>{{ publishInfoObj.amount | unit('份/股') }}</td>
                    </tr>
                    <tr>
                        <th>资金募集总额</th>
                        <td>{{ publishInfoObj.totalAmount | unit('元') }}</td>
                        <th>发行时间</th>
                        <td>{{ publishInfoObj.startTime }}</td>
                        <th>募集期时长</th>
                        <td>{{ publishInfoObj.length | unit('天') }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="project-block project-block-basic" v-for="(templateGroup, gindex) in templateGroups" :key="gindex">
            <h2 class="project-block-title">{{ templateGroup.group || '基础分组' }}</h2>
            <div class="project-block-body">
                <table>
                    {{
                        ((items = templateGroup.items || []), void 0)
                    }}
                    <tr v-for="(arrs, mindex) in items" :key="mindex">
                        <template v-for="(template, tindex) in arrs">
                            <th :key="`${3 * mindex + tindex}_0`">{{ template.title }}</th>
                            <td :key="`${3 * mindex + tindex}_1`">{{ template.value | unit(template.unit) }}</td>
                        </template>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<style src="./project-data-basic.less" lang="less" scoped />

<script src="./project-data-basic.ts" />
