<template>
    <a-form-model-item :label="template.title" :prop="template.name">
        {{ ((controlType = template.controlType), void 0) }}
        {{ ((options = template.selectValue), void 0) }}
        {{ ((value = template.value), void 0) }}
        {{ ((unit = template.unit || ''), void 0) }}
        {{ ((normalPlaceholder = '请输入' + template.title), void 0) }}
        {{ ((choosePlaceholder = '请选择' + template.title), void 0) }}
        <a-input
            v-if="controlType === 0"
            :value="value"
            allowClear
            :placeholder="normalPlaceholder"
            @change="handleFormChange($event.target.value)"
        />
        <a-input-number
            v-else-if="controlType === 1"
            :value="value"
            :placeholder="normalPlaceholder"
            @change="handleFormChange"
        />
        <a-textarea
            v-else-if="controlType === 2"
            :value="value"
            allowClear
            :autosize="{ minRows: 5, maxRows: 8 }"
            :placeholder="normalPlaceholder"
            @change="handleFormChange($event.target.value)"
        />
        <a-select
            v-else-if="controlType === 3"
            :value="value"
            allowClear
            :options="options"
            :placeholder="choosePlaceholder"
            @change="handleFormChange"
        />
        <a-date-picker
            v-else-if="controlType === 6"
            :value="value ? moment(value) : undefined"
            allowClear
            format="YYYY-MM-DD"
            :placeholder="normalPlaceholder"
            @change="handleDatePickerChange"
        />
        <span v-if="unit" class="saas-unit">{{ unit }}</span>
    </a-form-model-item>
</template>

<style src="./template-control.less" lang="less" scoped />

<script src="./template-control.ts" />
