<template>
    <a-layout class="layout-project">
        <a-layout-header>
            <a-row class="clearfix">
                <a-col class="align-left" :xl="{ span: 6 }" :lg="{ span: 5 }" :md="{ span: 4 }" :span="24">
                    <a-select :value="projectId" placeholder="请选择项目" @change="toggleProject">
                        <a-select-option
                            v-for="(project, index) in projectOptions"
                            :key="index"
                            :value="project.value"
                            :title="project.label"
                        >
                            {{ project.label }}
                        </a-select-option>
                    </a-select>
                </a-col>

                <a-col class="align-center" :xl="{ span: 12 }" :lg="{ span: 14 }" :md="{ span: 16 }" :span="18">
                    <nav>
                        <router-link
                            v-for="(nav, index) in navs"
                            :key="index"
                            :to="{ path: nav.path, query: nav.query }"
                            :class="currentPath.indexOf(nav.key) > -1 ? 'active' : ''"
                        >
                            {{ nav.title }}
                        </router-link>
                    </nav>
                </a-col>

                <a-col class="align-right" :xl="{ span: 6 }" :lg="{ span: 5 }" :md="{ span: 4 }" :span="6">
                    <a-button icon="plus" @click="addProject">新建项目</a-button>
                </a-col>
            </a-row>
        </a-layout-header>

        <router-view></router-view>
    </a-layout>
</template>

<style src="./layout-project.less" lang="less" scoped />

<script src="./layout-project.ts" />
