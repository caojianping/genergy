<template>
    <a-layout class="layout-project-document">
        <ProjectGuide v-if="!projectId || (projectId && projectStatus <= 15)" :type="3" />
        <template v-else>
            <a-layout-sider>
                <a-menu mode="vertical" :selected-keys="selectedKeys">
                    <a-menu-item v-for="menu in menus" :key="menu.path">
                        <router-link :to="{ path: menu.path, query: menu.query }">
                            <a-icon :type="menu.icon" />
                            {{ menu.title }}
                        </router-link>
                    </a-menu-item>
                </a-menu>
            </a-layout-sider>

            <a-layout-content>
                <router-view></router-view>
            </a-layout-content>
        </template>
    </a-layout>
</template>

<style src="./layout-project-document.less" lang="less" scoped />

<script src="./layout-project-document.ts" />
