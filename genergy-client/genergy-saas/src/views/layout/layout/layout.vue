<template>
    <a-layout class="layout">
        <a-layout-header>
            <a-row>
                <a-col class="align-left" :span="6">
                    <router-link class="logo" to="/home">{{ tokenInfo ? tokenInfo.companyName : '--' }}</router-link>
                </a-col>

                <a-col class="align-center" :span="12">
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

                <a-col class="align-right" :span="6">
                    <a-dropdown>
                        <a href="javascript:void(0)">
                            <span>{{ tokenInfo ? tokenInfo.userName : '--' }}</span>
                            <a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item key="1">
                                <router-link to="/user/info">个人资料</router-link>
                            </a-menu-item>
                            <a-menu-item key="2">
                                <router-link to="/user/password">密码修改</router-link>
                            </a-menu-item>
                            <a-menu-item key="3">
                                <router-link to="/user/system">系统管理</router-link>
                            </a-menu-item>
                            <a-menu-item key="4">
                                <span @click="logout">退出</span>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </a-col>
            </a-row>
        </a-layout-header>

        <router-view></router-view>
    </a-layout>
</template>

<style src="./layout.less" lang="less" scoped />

<script src="./layout.ts" />
