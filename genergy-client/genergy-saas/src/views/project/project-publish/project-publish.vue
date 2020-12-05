<template>
    <div class="project-container">
        <ProjectGuide v-if="!projectId || (projectId && projectStatus !== 40)" :type="1" />
        <a-form-model v-else ref="publishForm" :model="publishForm" :rules="rules" layout="horizontal">
            <div class="project-block project-block-shadow">
                <h2 class="project-block-title">项目发行</h2>
                <div class="project-block-body">
                    <a-row>
                        <a-col span="8">
                            <a-form-model-item label="项目名称" prop="">
                                <a-input type="text" :value="projectName" disabled />
                            </a-form-model-item>
                        </a-col>

                        <a-col span="8">
                            <a-form-model-item label="项目编号" prop="">
                                <a-input type="text" :value="projectId" disabled />
                            </a-form-model-item>
                        </a-col>

                        <a-col span="8">
                            <a-form-model-item label="发行方式" prop="mode">
                                <a-select
                                    v-model="publishForm.mode"
                                    :options="modeOptions"
                                    placeholder="请选择发行方式"
                                />
                            </a-form-model-item>
                        </a-col>

                        <a-col span="8">
                            <a-form-model-item label="募集总额" prop="totalAmount">
                                <a-input-number
                                    v-model="publishForm.totalAmount"
                                    :min="0"
                                    :precision="2"
                                    placeholder="请输入募集总额"
                                    @keyup.enter="submit"
                                />
                                <span class="saas-unit">元</span>
                            </a-form-model-item>
                        </a-col>

                        <a-col span="8">
                            <a-form-model-item :label="`${modeUnits[1]}总数`" prop="amount">
                                <a-input-number
                                    v-model="publishForm.amount"
                                    :min="0"
                                    :precision="0"
                                    placeholder="请输入份额/股份总数"
                                    @keyup.enter="submit"
                                />
                                <span class="saas-unit">{{ modeUnits[0] }}</span>
                            </a-form-model-item>
                        </a-col>

                        <a-col span="8">
                            <a-form-model-item :label="`${modeUnits[2]}价格`" prop="">
                                <a-input-number
                                    :value="price"
                                    :precision="2"
                                    disabled
                                />
                                <span class="saas-unit">元</span>
                            </a-form-model-item>
                        </a-col>

                        <a-col span="8">
                            <a-form-model-item label="最小年化收益率" prop="minRate">
                                <a-input-number
                                    v-model="publishForm.minRate"
                                    :min="0"
                                    :precision="2"
                                    placeholder="请输入最小年化收益率"
                                    @keyup.enter="submit"
                                />
                                <span class="saas-unit">%</span>
                            </a-form-model-item>
                        </a-col>

                        <a-col span="8">
                            <a-form-model-item label="最大年化收益率" prop="maxRate">
                                <a-input-number
                                    v-model="publishForm.maxRate"
                                    :min="0"
                                    :precision="2"
                                    placeholder="请输入最大年化收益率"
                                    @keyup.enter="submit"
                                />
                                <span class="saas-unit">元</span>
                            </a-form-model-item>
                        </a-col>

                        <a-col span="8">
                            <a-form-model-item label="募集时长" prop="length">
                                <a-input-number
                                    v-model="publishForm.length"
                                    :min="0"
                                    :precision="0"
                                    placeholder="请输入募集时长"
                                    @keyup.enter="submit"
                                />
                                <span class="saas-unit">天</span>
                            </a-form-model-item>
                        </a-col>

                        <a-col span="8">
                            <a-form-model-item label="募集开始时间" prop="startTime">
                                <a-date-picker
                                    v-model="publishForm.startTime"
                                    format="YYYY-MM-DD"
                                    allowClear
                                    placeholder="请输入募集开始时间"
                                />
                            </a-form-model-item>
                        </a-col>

                        <a-col span="8">
                            <a-form-model-item label="项目周期" prop="cycle">
                                <a-input-number
                                    v-model="publishForm.cycle"
                                    :min="0"
                                    :precision="0"
                                    placeholder="请输入项目周期"
                                    @keyup.enter="submit"
                                />
                                <span class="saas-unit">天</span>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                </div>
            </div>

            <DocumentItems
                :itemGroups="itemGroups"
                :projectId="projectId"
                :groupId="basicGroupId"
                :isShadow="true"
                @uploadSuccess="handleUploadSuccess"
                @deleteSuccess="handleDeleteSuccess"
            />

            <div class="project-btns">
                <a-button type="primary" size="large" @click="submit">提交</a-button>
                <a-button type="danger" size="large" @click="reset">重置</a-button>
            </div>
        </a-form-model>
    </div>
</template>

<style src="./project-publish.less" lang="less" scoped />

<script src="./project-publish.ts" />
