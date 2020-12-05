import { TypeUtil } from './type.util';
import { DateUtil } from './date.util';
import { IPageParameters } from '@/ts/interfaces';

/**
 * 构建参数字符串
 * @param parameters 参数
 */
function buildParameters(parameters: { [key: string]: any }): string {
    if (TypeUtil.isEmptyObject(parameters)) return '';

    let temp: Array<any> = [];
    for (let key in parameters) {
        let value = parameters[key];
        temp.push(`${key}=${String(value)}`);
    }
    return temp.join('&');
}

/**
 * 构建分页参数字符串
 * @param parameters 分页参数
 * @param convertFields 转换字段
 * @param encodeFields 编码字段
 * @param format 格式化
 */
function buildPageParameters<T>(
    parameters: IPageParameters<T>,
    convertFields: Array<string> = [],
    encodeFields: Array<string> = [],
    format: string = 'yyyy-MM-dd hh:mm:ss'
): string {
    if (!parameters) return '';

    let temp: Array<any> = [],
        conditions = parameters.conditions;
    if (conditions) {
        for (let key in conditions) {
            let value: any = conditions[key];
            if (TypeUtil.isUndefinedOrNull(value)) {
                temp.push(`${key}=}`);
            } else {
                if (encodeFields.indexOf(key) > -1) {
                    value = encodeURI(value);
                }
                if (convertFields.indexOf(key) > -1) {
                    value = DateUtil.dateFormat(String(value), format, true);
                }
                temp.push(`${key}=${String(value)}`);
            }
        }
    }

    temp.push(`pageNum=${String(parameters.pageNum)}`);
    temp.push(`pageSize=${String(parameters.pageSize)}`);
    return temp.join('&');
}

/**
 * 解析参数
 * @param key 参数key
 */
function resolveParameters(key: string): string {
    let regex = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'),
        str = window.location.search || window.location.hash || '',
        flag = str.indexOf('?') + 1,
        matches = str.substr(flag).match(regex);
    if (!matches) return '';
    return unescape(matches[2]);
}

export const ParameterUtil = {
    buildParameters,
    buildPageParameters,
    resolveParameters
};
