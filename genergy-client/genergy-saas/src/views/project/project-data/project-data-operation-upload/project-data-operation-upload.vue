<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item>项目</a-breadcrumb-item>
            <a-breadcrumb-item>
                <router-link :to="{ path: '/project/data/operation', query: { projectId: String(projectId || '') } }">
                    数据中心
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <router-link :to="{ path: '/project/data/operation', query: { projectId: String(projectId || '') } }">
                    运行数据
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>运行数据上传</a-breadcrumb-item>
        </a-breadcrumb>

        <h1 class="project-title">
            请每期按照固定时间上传基础设施运行的相关数据信息。所有上传的信息都必须保证数据的正确性与真实性。如发现有数据造假的情况，则将依法追究相应的法律责任。
        </h1>

        <div class="project-block project-block-upload">
            <h2 class="project-block-title">运行数据</h2>
            <div class="project-block-body">
                <a-form-model
                    ref="operationForm"
                    :model="operationForm"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                >
                    <a-form-model-item label="基础设施名称" prop="title">
                        <a-input type="text" v-model="projectName" disabled />
                    </a-form-model-item>

                    <a-form-model-item label="数据日期" prop="date">
                        <a-date-picker
                            v-model="operationForm.date"
                            format="YYYY-MM-DD"
                            allowClear
                            placeholder="请输入数据日期"
                        />
                    </a-form-model-item>

                    <a-form-model-item label="日照时长" prop="sunshineDuration">
                        <a-input-number
                            v-model="operationForm.sunshineDuration"
                            :min="0"
                            :precision="1"
                            placeholder="请输入日照时长"
                            @keyup.enter="submit"
                        />
                        <span class="saas-unit">小时</span>
                    </a-form-model-item>

                    <a-form-model-item label="当日发电总量" prop="totalPower">
                        <a-input-number
                            v-model="operationForm.totalPower"
                            :min="0"
                            :precision="2"
                            placeholder="请输入当日发电总量"
                            @keyup.enter="submit"
                        />
                        <span class="saas-unit">kwh</span>
                    </a-form-model-item>

                    <a-form-model-item label="当日上网电量" prop="sellPower">
                        <a-input-number
                            v-model="operationForm.sellPower"
                            :min="0"
                            :precision="2"
                            placeholder="请输入当日上网电量"
                            @keyup.enter="submit"
                        />
                        <span class="saas-unit">kwh</span>
                    </a-form-model-item>

                    <a-form-model-item label="当日最低气温" prop="minimumTemperature">
                        <a-input-number
                            v-model="operationForm.minimumTemperature"
                            :min="0"
                            :precision="0"
                            placeholder="请输入当日最低气温"
                            @keyup.enter="submit"
                        />
                        <span class="saas-unit">度</span>
                    </a-form-model-item>

                    <a-form-model-item label="当日最高气温" prop="maximumTemperature">
                        <a-input-number
                            v-model="operationForm.maximumTemperature"
                            :min="0"
                            :precision="0"
                            placeholder="请输入当日最高气温"
                            @keyup.enter="submit"
                        />
                        <span class="saas-unit">度</span>
                    </a-form-model-item>

                    <a-form-model-item label="当日天气状况" prop="weather">
                        <a-select
                            v-model="operationForm.weather"
                            :options="weatherOptions"
                            allowClear
                            placeholder="请选择当日天气状况"
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
                        <p class="saas-upload-prompt">上传影响基础设施运营的数据文件</p>
                        <a class="saas-upload-download" :href="operationTemplate" target="_blank" download>
                            技术设施运行数据文件模板.pdf
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

<style src="./project-data-operation-upload.less" lang="less" scoped />

<script src="./project-data-operation-upload.ts" />
