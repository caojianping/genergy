<template>
    <div>
        <div
            :class="`project-block project-block-${isShadow ? 'shadow' : 'document'}`"
            v-for="(itemGroup, index) in itemGroups"
            :key="index"
        >
            <h2 class="project-block-title">{{ itemGroup.group || '基础分组' }}</h2>
            <div class="project-block-body clearfix">
                <div class="document-item" v-for="(item, sindex) in itemGroup.items" :key="sindex">
                    <div v-if="item.type === 0" class="document-content">
                        <router-link
                            :to="{
                                path: `/project/document/items/${groupId || ''}/files/${item.id}`,
                                query: { projectId: String(projectId || '') }
                            }"
                        >
                            <i class="icon icon-folder" />
                        </router-link>
                        <h3 :title="item.name">{{ item.name }}</h3>
                    </div>

                    <div v-else-if="item.type === 1 && item.fileId" class="document-content">
                        <i v-if="groupId == 1" @click.stop="deleteFile(item.fileId)">&times;</i>
                        <a :href="item.url" target="_blank">
                            <img v-if="item.isImage" :src="item.url" />
                            <i v-else class="icon icon-file" :class="`icon-file-${item.fileSuffix}`" />
                        </a>
                        {{ ((name = item.name || `${item.fileId}.${item.fileSuffix}`), void 0) }}
                        <h3 :title="name">{{ name }}</h3>
                    </div>

                    <div v-else-if="item.type === 1 && !item.fileId" class="document-content">
                        <a-upload
                            name="file"
                            :accept="item.accept"
                            :show-upload-list="false"
                            :action="`${action}?projectId=${projectId}&itemId=${item.id}`"
                            :headers="headers"
                            @change="handleUploadChange(item.id, $event)"
                        >
                            <div class="saas-upload-btn">
                                <a-icon type="plus" />
                                <p>上传文件</p>
                            </div>
                        </a-upload>
                        <h3 :title="item.name">{{ item.name }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./document-items.less" lang="less" scoped />

<script src="./document-items.ts" />
