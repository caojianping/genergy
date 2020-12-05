<template>
    <div class="project-container">
        <a-row>
            <a-col class="overview-left" :lg="{ span: 18 }" :span="24">
                <a-row>
                    <a-col :md="{ span: 12 }" :span="24">
                        <div class="overview-block">
                            <header class="overview-block-header">
                                <h2 class="overview-block-title">动态通知</h2>
                                <a class="overview-block-more" @click="undevelop">
                                    更多
                                </a>
                            </header>

                            <div class="overview-block-body">
                                <p v-if="notifies.length <= 0" class="saas-none">暂无动态通知</p>
                                <ul v-else class="notifies">
                                    <li
                                        :class="{ unlink: !notify.linkType }"
                                        v-for="(notify, index) in notifies"
                                        :key="index"
                                        @click="goPage(notify.linkType)"
                                    >
                                        <p>
                                            <a-icon type="sound" />
                                            <span>{{ notify.title }}</span>
                                        </p>
                                        <p>{{ notify.msg }}</p>
                                        <time>{{ notify.notifyTime | dateFormat('MM月dd日 hh:mm:ss') }}</time>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </a-col>

                    <a-col :md="{ span: 12 }" :span="24">
                        <div class="overview-block">
                            <header class="overview-block-header">
                                <h2 class="overview-block-title">项目数据</h2>
                                <router-link
                                    class="overview-block-more"
                                    :to="{
                                        path: '/project/data/disclose',
                                        query: { projectId: String(projectId || '') }
                                    }"
                                >
                                    更多
                                </router-link>
                            </header>

                            <div class="overview-block-body">
                                {{ ((projectStatsObj = projectStats || {}), void 0) }}
                                <p
                                    v-if="
                                        !projectStatsObj.newDividend &&
                                            !projectStatsObj.totalDividend &&
                                            !projectStatsObj.newPower &&
                                            !projectStatsObj.totalPower &&
                                            !projectStatsObj.title
                                    "
                                    class="saas-none"
                                >
                                    暂无项目数据
                                </p>
                                <ul v-else class="project-stats">
                                    <li v-if="projectStatsObj.newDividend || projectStatsObj.totalDividend">
                                        <p>
                                            <label>最新分红</label>
                                            <span>{{ projectStatsObj.newDividend | unit('元') }}</span>

                                            <label>累计分红</label>
                                            <span>{{ projectStatsObj.totalDividend | unit('元') }}</span>
                                        </p>
                                        <p>
                                            <router-link
                                                :to="{
                                                    path: '/project/data/dividend',
                                                    query: { projectId: String(projectId || '') }
                                                }"
                                            >
                                                详情
                                            </router-link>
                                            <router-link
                                                :to="{
                                                    path: '/project/data/dividend/upload',
                                                    query: { projectId: String(projectId || '') }
                                                }"
                                            >
                                                分红数据上传
                                            </router-link>
                                        </p>
                                    </li>

                                    <li v-if="projectStatsObj.newPower || projectStatsObj.totalPower">
                                        <p>
                                            <label>最新发电</label>
                                            <span>{{ projectStatsObj.newPower | unit('kwh') }}</span>

                                            <label>累计发电</label>
                                            <span>{{ projectStatsObj.totalPower | unit('kwh') }}</span>
                                        </p>
                                        <p>
                                            <router-link
                                                :to="{
                                                    path: '/project/data/operation',
                                                    query: { projectId: String(projectId || '') }
                                                }"
                                            >
                                                详情
                                            </router-link>
                                            <router-link
                                                :to="{
                                                    path: '/project/data/operation/upload',
                                                    query: { projectId: String(projectId || '') }
                                                }"
                                            >
                                                运行数据上传
                                            </router-link>
                                        </p>
                                    </li>

                                    <li v-if="projectStatsObj.title">
                                        <p>
                                            <label>最新披露消息</label>
                                            <span>{{ projectStatsObj.title }}</span>
                                        </p>
                                        <p>
                                            <router-link
                                                :to="{
                                                    path: '/project/data/disclose',
                                                    query: { projectId: String(projectId || '') }
                                                }"
                                            >
                                                详情
                                            </router-link>
                                            <router-link
                                                :to="{
                                                    path: '/project/data/disclose/upload',
                                                    query: { projectId: String(projectId || '') }
                                                }"
                                            >
                                                披露信息上传
                                            </router-link>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :md="{ span: 12 }" :span="24">
                        <div class="overview-block">
                            <header class="overview-block-header">
                                <h2 class="overview-block-title">文档库列表</h2>
                                <router-link
                                    class="overview-block-more"
                                    :to="{
                                        path: `/project/document/items/${groupId || ''}`,
                                        query: { projectId: String(projectId || '') }
                                    }"
                                >
                                    更多
                                </router-link>
                            </header>

                            <div class="overview-block-body">
                                <p v-if="documentGroups.length <= 0" class="saas-none">暂无文档库列表</p>
                                <ul v-else class="documents clearfix">
                                    <li v-for="(group, index) in documentGroups" :key="index">
                                        <router-link
                                            :to="{
                                                path: `/project/document/items/${group.id}`,
                                                query: { projectId: String(projectId || '') }
                                            }"
                                        >
                                            <i class="icon icon-folder" />
                                            <p>{{ group.name }}</p>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </a-col>

                    <a-col :md="{ span: 12 }" :span="24">
                        <div class="overview-block">
                            <header class="overview-block-header">
                                <h2 class="overview-block-title">系统成员</h2>
                                <a class="overview-block-more" @click="undevelop">
                                    更多
                                </a>
                            </header>

                            <div class="overview-block-body">
                                <p v-if="users.length <= 0" class="saas-none">暂无系统成员</p>
                                <table class="users">
                                    <tr>
                                        <th>成员</th>
                                        <th>角色</th>
                                        <th>最后登录</th>
                                    </tr>
                                    <tr v-for="(user, index) in users" :key="index">
                                        <td>
                                            <a-icon type="user" />
                                            <span>{{ user.userName }}</span>
                                        </td>
                                        <td>{{ user.roleName }}</td>
                                        <td>{{ user.workName }}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </a-col>

            <a-col class="overview-right" :lg="{ span: 6 }" :span="24">
                <div class="overview-block">
                    <header class="overview-block-header">
                        <h2 class="overview-block-title">项目概况</h2>
                        <router-link
                            class="overview-block-more"
                            :to="{ path: '/project/data/basic', query: { projectId: String(projectId || '') } }"
                        >
                            详情
                        </router-link>
                    </header>
                    <div class="overview-block-body">
                        {{ ((projectObj = project || {}), void 0) }}
                        <dl>
                            <dt>{{ projectObj.name || '--' }}</dt>
                            <dd>
                                <label>项目编号</label>
                                <span>{{ projectObj.projectId || '--' }}</span>
                            </dd>
                            <dd>
                                <label>项目类型</label>
                                <span>{{ projectObj.projectTypeName || '--' }}</span>
                            </dd>
                            <dd>
                                <label>创建日期</label>
                                <span>{{ projectObj.completionDate || '--' }}</span>
                            </dd>
                            <dd>
                                <label>项目当前状态</label>
                                <span :class="`text-${projectStatusColors.get(projectObj.status)}`">
                                    {{ projectStatusNames.get(projectObj.status) }}
                                </span>
                            </dd>
                        </dl>

                        {{ ((publishInfoObj = publishInfo || {}), void 0) }}
                        <dl style="margin-top: 16px">
                            <dt>资产发行情况</dt>
                            <dd>
                                <label>资产发行开始时间</label>
                                <span>{{ publishInfoObj.startTime || '--' }}</span>
                            </dd>
                            <dd>
                                <label>发行方式</label>
                                <span>{{ publishModes[publishInfoObj.mode] }}</span>
                            </dd>
                            <dd>
                                <label>发行总量</label>
                                <span>{{ publishInfoObj.amount || '--' }}份/股</span>
                            </dd>
                            <dd>
                                <label>资金募集总额</label>
                                <span>{{ publishInfoObj.totalAmount || '--' }}元</span>
                            </dd>
                            <dd>
                                <label>募集时长</label>
                                <span>{{ publishInfoObj.length || '--' }}天</span>
                            </dd>
                            <dd>
                                <label>资金募集状态</label>
                                <span :class="`text-${publishStatusColors[publishInfoObj.status]}`">
                                    {{ publishStatusNames[publishInfoObj.status] }}
                                </span>
                            </dd>
                        </dl>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<style src="./project-overview.less" lang="less" scoped />

<script src="./project-overview.ts" />
