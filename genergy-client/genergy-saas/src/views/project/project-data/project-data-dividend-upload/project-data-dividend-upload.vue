<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item>项目</a-breadcrumb-item>
            <a-breadcrumb-item>
                <router-link :to="{ path: '/project/data/dividend', query: { projectId: String(projectId || '') } }">
                    数据中心
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <router-link :to="{ path: '/project/data/dividend', query: { projectId: String(projectId || '') } }">
                    分红数据
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>分红数据上传</a-breadcrumb-item>
        </a-breadcrumb>

        <h1 class="project-title">
            请每期按照固定时间上传收益分红相关的数据信息。所有上传的信息都必须保证数据的正确性与真实性。如发现有数据造假的情况，则将依法追究相应的法律责任。
        </h1>

        <div class="project-block project-block-upload">
            <h2 class="project-block-title">分红数据</h2>
            <div class="project-block-body">
                <a-form-model
                    ref="dividendForm"
                    :model="dividendForm"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                >
                    <a-form-model-item label="分红周期" prop="">
                        <a-input-number
                            type="text"
                            :value="dividendPeriod"
                            disabled
                        />
                        <span class="saas-unit">期</span>
                    </a-form-model-item>

                    <a-form-model-item label="收益开始时间" prop="beginTime">
                        <a-date-picker
                            v-model="dividendForm.beginTime"
                            format="YYYY-MM-DD"
                            allowClear
                            placeholder="请输入收益开始时间"
                        />
                    </a-form-model-item>

                    <a-form-model-item label="收益结束时间" prop="endTime">
                        <a-date-picker
                            v-model="dividendForm.endTime"
                            format="YYYY-MM-DD"
                            allowClear
                            placeholder="请输入收益结束时间"
                        />
                    </a-form-model-item>

                    <a-form-model-item label="本期累计收益" prop="totalIncome">
                        <a-input-number
                            v-model="dividendForm.totalIncome"
                            :min="0"
                            :precision="2"
                            placeholder="请输入本期累计收益"
                            @keyup.enter="submit"
                        />
                        <span class="saas-unit">元</span>
                    </a-form-model-item>

                    <a-form-model-item label="运营支出" prop="operationExpenses">
                        <a-input-number
                            v-model="dividendForm.operationExpenses"
                            :min="0"
                            :precision="2"
                            placeholder="请输入运营支出"
                            @keyup.enter="submit"
                        />
                        <span class="saas-unit">元</span>
                    </a-form-model-item>

                    <a-form-model-item label="资金预留" prop="fundReservation">
                        <a-input-number
                            v-model="dividendForm.fundReservation"
                            :min="0"
                            :precision="2"
                            placeholder="请输入资金预留"
                            @keyup.enter="submit"
                        />
                        <span class="saas-unit">元</span>
                    </a-form-model-item>

                    <a-form-model-item label="其它支出" prop="otherExpenses">
                        <a-input-number
                            v-model="dividendForm.otherExpenses"
                            :min="0"
                            :precision="2"
                            placeholder="请输入其它支出"
                            @keyup.enter="submit"
                        />
                        <span class="saas-unit">元</span>
                    </a-form-model-item>

                    <a-form-model-item label="本期可分红收益" prop="dividendIncome">
                        <a-input-number
                            v-model="dividendForm.dividendIncome"
                            :min="0"
                            :precision="2"
                            placeholder="请输入本期可分红收益"
                            @keyup.enter="submit"
                        />
                        <span class="saas-unit">元</span>
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
                        <p class="saas-upload-prompt">
                            附件需要包含所有收益、支出、预留的资金明细。所有数据的金额必须明确，不可含糊其词。
                        </p>
                        <a class="saas-upload-download" :href="dividendTemplate" target="_blank" download>
                            资金明细记录模板.pdf
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

<style src="./project-data-dividend-upload.less" lang="less" scoped />

<script src="./project-data-dividend-upload.ts" />
