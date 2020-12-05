import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ProjectTemplateModel } from '@/ts/models';

@Component({
    name: 'TemplateControl',
    components: {}
})
export default class TemplateControl extends Vue {
    @Prop() readonly template!: ProjectTemplateModel;

    // 处理表单change事件
    handleFormChange(value: any) {
        this.$emit('change', this.template.name, value);
    }

    // 处理日期change事件
    handleDatePickerChange(date: any, dateString: string) {
        this.$emit('change', this.template.name, dateString);
    }
}
