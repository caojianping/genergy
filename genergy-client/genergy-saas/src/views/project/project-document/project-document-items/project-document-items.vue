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
            <a-breadcrumb-item>{{ groupName }}</a-breadcrumb-item>
        </a-breadcrumb>

        <h1 class="project-title">
            您的项目已经通过审核，请在15个工作日内提交尽职调查所需的相关材料，我们将委托可信的第三方机构进行尽职调查工作。第三方公司在尽职调查期间，请贵公司相关部门务必尽量配合，以便尽职调查工作可以及时顺利完成。
        </h1>

        <DocumentItems
            :itemGroups="itemGroups"
            :projectId="projectId"
            :groupId="groupId"
            :isShadow="false"
            @uploadSuccess="handleUploadSuccess"
            @deleteSuccess="handleDeleteSuccess"
        />

        <div v-if="groupId === firstGroupId" class="diligence-submit">
            <div class="diligence-submit-prompt">
                <h3>尽职调查材料说明</h3>

                <p>1.所有的文件必须按照分类放到对应的文件目录下；</p>
                <p>2.文件包内除了必须的尽调材料外，还必须包含一张材料清单，里面需写明此文件包中包含的所有文件明细；</p>
                <p>
                    3.所有文件夹及文档的命名需要明确里面的内容。如有需要排序的文件，需要在文件名中标明序号(有时间排序的，文件名中需体现时间序号)；
                </p>
                <p>
                    4.如有以上必须的尽调材料以外的其它材料，需要说明材的用途；
                    5.如果中途有材料更新，需要说明材料更新的内容；
                </p>
                <p>6.以上尽调材料为必须准备材料，如果材料不全或需要以其它形式给出，需要给出具体的说明；</p>

                <a class="saas-upload-download" :href="diligenceTemplate" target="_blank" download>
                    尽职调查材料明细表.excel
                </a>
            </div>

            <div class="project-btns">
                <!-- <a-button type="primary" @click="confirmDiligence">确认尽调</a-button> -->
                <a-button type="primary" @click="confirmDiligence">提交尽调资料</a-button>
            </div>
        </div>
    </div>
</template>

<style src="./project-document-items.less" lang="less" scoped />

<script src="./project-document-items.ts" />
