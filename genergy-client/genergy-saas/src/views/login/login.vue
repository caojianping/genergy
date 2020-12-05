<template>
    <div class="login">
        <div class="login-main clearfix">
            <div class="login-banner" />

            <div class="login-content">
                <a-form-model class="login-form" ref="form" :model="loginForm" :rules="rules" layout="horizontal">
                    <h1 class="login-title">建融湘安新能源Saas平台</h1>

                    <h2 class="login-subtitle">用户登录</h2>

                    <a-form-model-item label="企业名称" prop="companyName">
                        <a-input
                            ref="companyName"
                            type="text"
                            :value="loginForm.companyName"
                            allowClear
                            placeholder="请输入企业名称"
                            @change="handleFormChange('companyName', $event.target.value)"
                            @keyup.enter="submit"
                        >
                            <a-icon slot="prefix" type="bank" />
                        </a-input>
                    </a-form-model-item>

                    <a-form-model-item label="用户名" prop="userName">
                        <a-input
                            type="text"
                            :value="loginForm.userName"
                            allowClear
                            placeholder="请输入用户名"
                            @change="handleFormChange('userName', $event.target.value)"
                            @keyup.enter="submit"
                            autocomplete="off"
                        >
                            <a-icon slot="prefix" type="user" />
                        </a-input>
                    </a-form-model-item>

                    <a-form-model-item label="密码" prop="password">
                        <a-input
                            type="password"
                            :value="loginForm.password"
                            allowClear
                            placeholder="请输入密码"
                            @change="handleFormChange('password', $event.target.value)"
                            @keyup.enter="submit"
                            autocomplete="off"
                        >
                            <a-icon slot="prefix" type="lock" />
                        </a-input>
                    </a-form-model-item>

                    <a-button type="primary" block size="large" @click="submit">登录</a-button>
                </a-form-model>
            </div>
        </div>
    </div>
</template>

<style src="./login.less" lang="less" scoped />

<script src="./login.ts" />
