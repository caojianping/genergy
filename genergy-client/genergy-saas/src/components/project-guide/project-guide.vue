<template>
    <div>
        <a-result v-if="!projectId" status="info" title="您还未创建过项目，赶紧去创建吧！">
            <template #extra>
                <a-button type="primary" @click="addProject">
                    创建项目
                </a-button>
                <a-button type="default" @click="goHome">
                    返回首页
                </a-button>
            </template>
        </a-result>
        <template v-else>
            <!-- 发行项目页面 -->
            <template v-if="type === 1">
                <a-result v-if="projectStatus === 10" status="info" title="请等待项目资料的审核！" />
                <a-result v-else-if="projectStatus === 15" status="error" title="项目资料审核失败！" />
                <a-result v-else-if="projectStatus === 20" status="warning" title="请先完成尽调资料的上传">
                    <template #extra>
                        <a-button type="primary" @click="goDiligence">
                            上传尽调资料
                        </a-button>
                    </template>
                </a-result>
                <a-result v-else-if="projectStatus === 30" status="warning" title="您还需要先上传披露信息、运行数据">
                    <template #extra>
                        <a-button type="primary" @click="goDisclose">
                            上传披露信息、运行数据
                        </a-button>
                    </template>
                </a-result>
                <a-result v-else-if="projectStatus >= 50" status="info" title="当前项目已经发行" />
            </template>
            <!-- 数据中心模块 -->
            <template v-else-if="type === 2">
                <a-result v-if="projectStatus === 10" status="info" title="请等待项目资料的审核！" />
                <a-result v-else-if="projectStatus === 15" status="error" title="项目资料审核失败！" />
                <a-result v-else-if="projectStatus === 20" status="warning" title="请先完成尽调资料的上传">
                    <template #extra>
                        <a-button type="primary" @click="goDiligence">
                            上传尽调资料
                        </a-button>
                    </template>
                </a-result>
            </template>
            <!-- 文档中心模块 -->
            <template v-else-if="type === 3">
                <a-result v-if="projectStatus === 10" status="info" title="请等待项目资料的审核！" />
                <a-result v-else-if="projectStatus === 15" status="error" title="项目资料审核失败！" />
            </template>
        </template>
    </div>
</template>

<style src="./project-guide.less" lang="less" scoped />

<script src="./project-guide.ts" />
