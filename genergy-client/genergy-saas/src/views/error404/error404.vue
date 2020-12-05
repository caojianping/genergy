<template>
    <div>
        <a-result status="404" title="404" sub-title="对不起，您访问的页面不存在">
            <template #extra>
                <a-button type="primary" @click="goHome">
                    返回首页
                </a-button>
            </template>
        </a-result>
    </div>
</template>

<style src="./error404.less" lang="less" scoped />

<script src="./error404.ts" />
