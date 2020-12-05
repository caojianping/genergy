<template>
    <div class="project-container">
        <a-form-model ref="projectForm" :model="projectForm" :rules="rules" layout="horizontal">
            <div class="project-block project-block-shadow">
                <h2 class="project-block-title">基本信息</h2>
                <div class="project-block-body">
                    <a-row>
                        <a-col span="8">
                            <a-form-model-item label="项目类型">
                                <a-select
                                    :value="projectForm.projectType"
                                    :options="typeOptions"
                                    placeholder="请选择项目类型"
                                    @change="toggleType"
                                />
                            </a-form-model-item>
                        </a-col>
                        <a-col span="8">
                            <a-form-model-item label="基础设施名称" prop="name">
                                <a-input v-model="projectForm.name" allowClear placeholder="请输入基础设施名称" />
                            </a-form-model-item>
                        </a-col>
                        <a-col span="8">
                            <a-form-model-item label="设施状态" prop="runningStatus">
                                <a-select
                                    v-model="projectForm.runningStatus"
                                    :options="statusOptions"
                                    allowClear
                                    placeholder="请选择设施状态"
                                />
                            </a-form-model-item>
                        </a-col>
                        <a-col span="8">
                            <a-form-model-item label="项目总投资" prop="totalInvestment">
                                <a-input-number
                                    v-model="projectForm.totalInvestment"
                                    :min="0"
                                    :precision="2"
                                    placeholder="请输入项目总投资"
                                />
                                <span class="saas-unit">元</span>
                            </a-form-model-item>
                        </a-col>
                        <a-col span="8">
                            <a-form-model-item label="设施折旧率" prop="depreciation">
                                <a-input-number
                                    v-model="projectForm.depreciation"
                                    :min="0"
                                    :precision="2"
                                    placeholder="请输入设施折旧率"
                                />
                                <span class="saas-unit">%</span>
                            </a-form-model-item>
                        </a-col>
                        <a-col span="8">
                            <a-form-model-item label="出让价值" prop="value">
                                <a-input-number
                                    v-model="projectForm.value"
                                    :min="0"
                                    :precision="2"
                                    placeholder="请输入出让价值"
                                />
                                <span class="saas-unit">元</span>
                            </a-form-model-item>
                        </a-col>
                        <a-col span="8">
                            <a-form-model-item label="项目公司" prop="projectCompany">
                                <a-input v-model="projectForm.projectCompany" allowClear placeholder="请输入项目公司" />
                            </a-form-model-item>
                        </a-col>
                        <a-col span="8">
                            <a-form-model-item label="项目方法人代表" prop="projectLegal">
                                <a-input
                                    v-model="projectForm.projectLegal"
                                    allowClear
                                    placeholder="请输入项目方法人代表"
                                />
                            </a-form-model-item>
                        </a-col>
                        <a-col span="8">
                            <a-form-model-item label="项目公司位置" prop="projectLocation">
                                <a-input
                                    v-model="projectForm.projectLocation"
                                    allowClear
                                    placeholder="请输入项目公司位置"
                                />
                            </a-form-model-item>
                        </a-col>
                        <a-col span="8">
                            <a-form-model-item label="建设公司" prop="constructionCompany">
                                <a-input
                                    v-model="projectForm.constructionCompany"
                                    allowClear
                                    placeholder="请输入建设公司"
                                />
                            </a-form-model-item>
                        </a-col>
                        <a-col span="8">
                            <a-form-model-item label="建成日期" prop="completionDate">
                                <a-date-picker
                                    v-model="projectForm.completionDate"
                                    allowClear
                                    format="YYYY-MM-DD"
                                    placeholder="请输入建成日期"
                                />
                            </a-form-model-item>
                        </a-col>
                        <a-col span="8">
                            <a-form-model-item label="运营日期" prop="operationDate">
                                <a-date-picker
                                    v-model="projectForm.operationDate"
                                    allowClear
                                    format="YYYY-MM-DD"
                                    placeholder="请输入运营日期"
                                />
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                </div>
            </div>

            <div
                class="project-block project-block-shadow"
                v-for="(templateGroup, index) in projectForm.templateGroups"
                :key="index"
            >
                <h2 class="project-block-title">{{ templateGroup.group }}</h2>
                <div class="project-block-body">
                    <a-row>
                        {{ ((items = templateGroup.items || []), void 0) }}
                        <a-col
                            :span="items.length === 1 && item.controlType === 2 ? 24 : 8"
                            v-for="(item, sindex) in items"
                            :key="sindex"
                        >
                            <TemplateControl :template="item" @change="handleTemplateChange" />
                        </a-col>
                    </a-row>
                </div>
            </div>

            <div class="project-btns">
                <a-button type="default" size="large" @click="archive">存档（草稿）</a-button>
                <a-button type="primary" size="large" @click="submit">提交</a-button>
                <a-button type="danger" size="large" @click="reset">重置</a-button>
            </div>
        </a-form-model>
    </div>
</template>

<style src="./project-create.less" lang="less" scoped />

<script src="./project-create.ts" />
