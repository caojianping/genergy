<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item>项目</a-breadcrumb-item>
            <a-breadcrumb-item>
                <router-link :to="{ path: '/project/data/disclose', query: { projectId: String(projectId || '') } }">
                    数据中心
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <router-link :to="{ path: '/project/data/disclose', query: { projectId: String(projectId || '') } }">
                    披露信息
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>披露信息上传</a-breadcrumb-item>
        </a-breadcrumb>

        <h1 class="project-title">
            您所披露的必须是与基础设施相关相关，且对资产的市场价值或收益会产生相应影响的信息。并且所有披露的信息必须真实可信，且不能包含信息披露者的个人主观判断因素。
        </h1>

        <div class="project-block project-block-upload">
            <h2 class="project-block-title">披露信息</h2>
            <div class="project-block-body">
                <a-form-model
                    ref="discloseForm"
                    :model="discloseForm"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                >
                    <a-form-model-item label="内容标题" prop="title">
                        <a-input
                            type="text"
                            v-model="discloseForm.title"
                            allowClear
                            placeholder="请输入内容标题"
                            @keyup.enter="submit"
                        />
                    </a-form-model-item>

                    <a-form-model-item label="内容描述" prop="content">
                        <a-input
                            type="textarea"
                            v-model="discloseForm.content"
                            allowClear
                            placeholder="请输入内容描述"
                            @keyup.enter="submit"
                        />
                    </a-form-model-item>

                    <a-form-model-item class="saas-upload-form" label="附件上传" prop="">
                        <a-upload
                            accept="application/pdf"
                            :file-list="files"
                            :multiple="true"
                            :remove="handleUploadRemove"
                            :before-upload="handleUploadBefore"
                        >
                            <div class="saas-upload-btn">
                                <a-icon type="plus" />
                                <p>上传文件</p>
                            </div>
                        </a-upload>
                        <p class="saas-upload-prompt">附件必须为pdf格式的文件</p>
                        <a class="saas-upload-download" :href="discloseTemplate" target="_blank" download>
                            信息披露文件模板.pdf
                        </a>
                    </a-form-model-item>

                    <div class="project-btns">
                        <a-button type="primary" size="large" @click="submit">保存</a-button>
                        <a-button type="danger" size="large" ghost @click="reset">重置</a-button>
                    </div>
                </a-form-model>
            </div>
        </div>
    </div>
</template>

<style src="./project-data-disclose-upload.less" lang="less" scoped />

<script src="./project-data-disclose-upload.ts" />
