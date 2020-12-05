<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item>项目</a-breadcrumb-item>
            <a-breadcrumb-item>
                <router-link
                    :to="{
                        path: `/project/document/items/${firstGroupId || ''}`,
                        query: { projectId: String(projectId || '') }
                    }"
                >
                    文档中心
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <router-link
                    :to="{
                        path: `/project/document/items/${groupId || ''}`,
                        query: { projectId: String(projectId || '') }
                    }"
                >
                    {{ groupName }}
                </router-link></a-breadcrumb-item
            >
            <a-breadcrumb-item>{{ itemName }}</a-breadcrumb-item>
        </a-breadcrumb>

        <div class="project-block project-block-document">
            <div class="project-block-body clearfix">
                <div class="document-item" v-for="(file, index) in files" :key="index">
                    <div class="document-content">
                        <i v-if="groupId == 1" @click.stop="deleteFile(file.id)">&times;</i>
                        <a :href="file.url" target="_blank">
                            <img v-if="file.isImage" :src="file.url" />
                            <i v-else class="icon icon-file" :class="`icon-file-${file.fileSuffix}`" />
                        </a>
                        {{ ((name = file.fileName || `${file.id}.${file.fileSuffix}`), void 0) }}
                        <h3 :title="name">{{ name }}</h3>
                    </div>
                </div>

                <a-upload
                    name="file"
                    :accept="itemAccept"
                    :show-upload-list="false"
                    :action="`${action}?projectId=${projectId}&itemId=${itemId}`"
                    :headers="headers"
                    @change="handleUploadChange"
                >
                    <div class="saas-upload-btn">
                        <a-icon type="plus" />
                        <p>上传文件</p>
                    </div>
                </a-upload>
            </div>
        </div>
    </div>
</template>

<style src="./project-document-files.less" lang="less" scoped />

<script src="./project-document-files.ts" />
