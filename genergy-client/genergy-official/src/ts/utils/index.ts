// 判断是不是日期字符串
function isDateString(str: string): boolean {
    return !isNaN(Date.parse(str));
}

// 判断是不是空对象
function isEmptyObject(obj: any): boolean {
    return !obj || JSON.stringify(obj) === '{}';
}


// 日期替换函数，返回yyyy/MM/dd hh:mm格式日期
function dateReplace(date: string) {
    if (!date) return '';
    return date.replace(/-/g, '/');
}

// 日期转换函数
function dateConvert(date: string | number | Date): Date | null {
    if (!date) return null;

    let result: Date = new Date();
    if (typeof date === 'string') {
        if (date.indexOf('-') > -1) result = new Date(dateReplace(date));
        else result = new Date(date);
    } else if (typeof date === 'number') result = new Date(date);
    else if (date instanceof Date) result = date;
    else result = new Date(date);
    return result;
}

// 日期格式化函数，返回一个自定义格式日期
function dateFormat(date: string | number | Date, format: string = 'yyyy-MM-dd hh:mm', isZeroize: boolean = true): string {
    let cdate = dateConvert(date);
    if (!cdate) return '';

    let dy = cdate.getFullYear(),
        dM = cdate.getMonth() + 1,
        dd = cdate.getDate(),
        dh = cdate.getHours(),
        dm = cdate.getMinutes(),
        ds = cdate.getSeconds(),
        dS = cdate.getMilliseconds(),
        config = {
            'y+': dy.toString(),
            'M+': !isZeroize ? dM.toString() : dM < 10 ? '0' + dM.toString() : dM.toString(),
            'd+': !isZeroize ? dd.toString() : dd < 10 ? '0' + dd.toString() : dd.toString(),
            'h+': !isZeroize ? dh.toString() : dh < 10 ? '0' + dh.toString() : dh.toString(),
            'm+': !isZeroize ? dm.toString() : dm < 10 ? '0' + dm.toString() : dm.toString(),
            's+': !isZeroize ? ds.toString() : ds < 10 ? '0' + ds.toString() : ds.toString(),
            'S': dS.toString()
        };

    for (let key in config) {
        let pattern = new RegExp(key);
        if (!pattern.test(format)) continue;

        let matches = format.match(pattern);
        if (!matches) continue;

        let first = matches[0],
            value = config[key];
        if (key === 'S') format = format.replace(first, value);
        else format = format.replace(first, value.substr(value.length - first.length));
    }
    return format;
}

// 日期凌晨化函数，返回一个日期的凌晨时间
function dateMorning(date: string | number | Date): Date {
    let cdate: Date = dateConvert(date) || new Date(),
        year = cdate.getFullYear(),
        month = cdate.getMonth(),
        day = cdate.getDate();
    return new Date(year, month, day);
}

// 日期星期几函数，返回周期几
function dateWeek(date: string | number | Date): string {
    let cdate: Date = dateConvert(date) || new Date();
    return '周' + '日一二三四五六'.charAt(cdate.getDay());
}

// 日期换行函数
function dateLine(date: number | string): string {
    if (typeof date == 'number' && date <= 0) return '--';
    if (!date) return '--';

    let cdate = dateFormat(date),
        parts = cdate.split(' ');
    return parts.join('<br/>');
}

// 日期计算函数，返回一个计算后的新日期
function dateCalculate(date: Date, type: string = 'y', value: number = 0): Date {
    let result: number = 0,
        clone = new Date(date.getTime());
    switch (type) {
        case 'y':
            result = clone.setFullYear(clone.getFullYear() + value);
            break;
        case 'M':
            result = clone.setMonth(clone.getMonth() + value);
            break;
        case 'd':
            result = clone.setDate(clone.getDate() + value);
            break;
        case 'h':
            result = clone.setHours(clone.getHours() + value);
            break;
        case 'm':
            result = clone.setMinutes(clone.getMinutes() + value);
            break;
        case 's':
            result = clone.setSeconds(clone.getSeconds() + value);
            break;
        case 'S':
            result = clone.setMilliseconds(clone.getMilliseconds() + value);
            break;
    }
    return new Date(result);
}

// 日期倒计时函数，返回倒计时
function dateCountdown(seconds: number, isComplex: boolean = false): string {
    let secondTime = 0,     // 秒数
        minuteTime = 0,     // 分钟
        hourTime = 0,       // 小时
        dayTime = 0;        // 天数
    if (seconds > 60) {
        minuteTime = parseInt(String(seconds / 60));            // 分钟：秒数除以60取整
        secondTime = parseInt(String(seconds % 60));            // 秒数：秒数除以60取余（处理分钟后得重新处理秒数）

        if (minuteTime > 60) {
            hourTime = parseInt(String(minuteTime / 60));       // 小时：分钟除以60取整
            minuteTime = parseInt(String(minuteTime % 60));     // 分钟：分钟除以60取余（处理小时后得重新处理分钟）

            if (hourTime > 24) {
                dayTime = parseInt(String(hourTime / 24));      // 天数：小时除以24取整
                hourTime = parseInt(String(hourTime % 24));     // 小时：小时除以24取余（处理天数后得重新处理小时）
            }
        }
    } else {
        secondTime = parseInt(String(seconds));
    }
    if (!isComplex) {
        let result = '';
        if (seconds >= 3600 * 24) {
            result += `<i>${dayTime}</i>天`;
        }
        if (seconds >= 3600) {
            result += `<i>${zeroizeDigit(hourTime)}</i>时`;
        }
        if (seconds >= 60) {
            result += `<i>${zeroizeDigit(minuteTime)}</i>分`;
        }
        if (seconds > 0) {
            result += `<i>${zeroizeDigit(secondTime)}</i>秒`;
        }
        return result;
    } else {
        let dayStr = '';
        if (seconds >= 3600 * 24) {
            dayStr = String(dayTime).split('').map((item: string) => `<i>${item}</i>`).join('');
            dayStr += '<span>天</span>';
        }

        let hourStr = zeroizeDigit(hourTime).split('').map((item: string) => `<i>${item}</i>`).join('');
        hourStr += '<span>时</span>';

        let minuteStr = zeroizeDigit(minuteTime).split('').map((item: string) => `<i>${item}</i>`).join('');
        minuteStr += '<span>分</span>';

        let secondStr = zeroizeDigit(secondTime).split('').map((item: string) => `<i>${item}</i>`).join('');
        secondStr += '<span>秒</span>';
        return dayStr + hourStr + minuteStr + secondStr;
    }
}

// 日期相等校验函数，返回true/false
function dateEqual(leftDate: Date, rightDate: Date, hasTime: boolean = false): boolean {
    if (!hasTime) return dateMorning(leftDate).getTime() === dateMorning(rightDate).getTime();
    return leftDate.getTime() === rightDate.getTime();
}


// 数组去重函数，返回一个去重的新数组
function arrayDistinct(arrs: Array<any>, key: string = ''): Array<any> {
    if (arrs.length <= 0) return [];

    let temp = {},
        result: Array<any> = [];
    for (let i = 0; i < arrs.length; i++) {
        let item = arrs[i],
            value = key ? item[key] : JSON.stringify(item);
        if (!temp[value]) {
            result.push(item);
            temp[value] = true;
        }
    }
    return result;
}

// 数组排序，返回一个排序后的新数组
function arraySort(arrs: Array<any>, field: string = '', isAsc: boolean = false): Array<any> {
    if (arrs.length <= 0) return [];

    arrs.sort((m, n) => {
        let v1 = field ? m[field] : m,
            v2 = field ? n[field] : n;
        if (v1 > v2) return isAsc ? 1 : -1;
        else if (v1 < v2) return isAsc ? -1 : 1;
        else return 0;
    });
    return arrs;
}


// 获取对象key集合
function getAllKeys(data: any): Array<string> {
    data = data || {};
    let keys: Array<any> = [];
    for (let key in data) {
        keys.push(key);
    }
    return keys;
}

// 获取对象第一个key
function getFirstKey(data: any): string {
    data = data || {};
    let firstKey = '';
    for (let key in data) {
        firstKey = key;
        break;
    }
    return firstKey;
}

// 获取对象第一个value
function getFirstValue(data: any): any {
    data = data || {};
    let firstValue = '';
    for (let key in data) {
        firstValue = data[key];
        break;
    }
    return firstValue;
}


// json字符串转换函数
function parseJSON<T>(value: string = ''): T {
    try {
        return <T>(JSON.parse(value));
    } catch (e) {
        throw e;
    }
}

// 简易的对象副本函数
function duplicate<T>(data: T): T {
    return <T>parseJSON(JSON.stringify(data));
}

// 查询参数字符串
function buildParams(data: { [key: string]: any }): string {
    if (JSON.stringify(data) === '{}') return '';

    let temp: Array<any> = [];
    for (let key in data) {
        let value = data[key];
        temp.push(`${key}=${String(value)}`);
    }
    return temp.join('&');
}

// 补零数字
function zeroizeDigit(digit: number): string {
    return digit >= 0 && digit < 10 ? `0${String(digit)}` : String(digit);
}

// 插入字符串
function insertStr(source: string, position: number, str: string): string {
    return source.slice(0, position) + str + source.slice(position);
}

// 获取根链接路径
function getRootUrl(): string {
    let {protocol, host, pathname} = window.location;
    return `${protocol}//${host}${pathname}`;
}

// 取整
function getIntpart(data: number): number {
    let str = String(data),
        position = str.indexOf('.');
    return position > -1 ? Number(str.substring(0, position)) : data;
}

// 转换百分比
function convertPercent(data: number): number {
    return Number((data * 100).toFixed(2));
}

// 字符串trim函数
function trim(value: any): any {
    if (typeof value === 'string') {
        value = value.trim();
    }
    return value;
}

// 跳转至顶部
function jumpTop() {
    let root = document.getElementById('root');
    root && root.scrollIntoView(true);
}


// 判断是否为IE9
function isIE9() {
    let appName = window.navigator.appName || '',
        appVersion = window.navigator.appVersion || '',
        version = appVersion.split(';')[1];
    if (!version) return false;

    version = version.replace(/[ ]/g, '').replace('MSIE', '');
    return appName == 'Microsoft Internet Explorer' && parseInt(version) <= 9;
}

// 判断是否为移动端
function isMobile() {
    let userAgent = window.navigator.userAgent || '';
    return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

// 打印错误
function printError(err: any, flag: string, isAlert: boolean = false): void {
    window.console && window.console.log(`${flag} err:`, typeof err, err);
    isAlert && alert(`${flag} err:` + JSON.stringify(err, null, 2));
}

export const Utils = {
    isDateString,           // 判断是不是日期字符串
    isEmptyObject,          // 判断是不是空对象

    dateReplace,            // 日期替换函数，返回yyyy/MM/dd hh:mm格式日期
    dateConvert,            // 日期转换函数
    dateFormat,             // 日期格式化函数，yyyy/MM/dd hh:mm:ss
    dateMorning,            // 日期凌晨化函数，时分秒为0
    dateWeek,               // 日期星期几函数
    dateLine,               // 日期换行函数
    dateCalculate,          // 日期计算函数
    dateCountdown,          // 日期倒计时函数
    dateEqual,				// 日期相等校验函数

    arrayDistinct,          // 数组去重函数（可去重对象）
    arraySort,              // 数组排序（可去重对象）

    getAllKeys,             // 获取对象key集合
    getFirstKey,            // 获取对象第一个key
    getFirstValue,          // 获取对象第一个value

    parseJSON,              // json字符串转换函数
    duplicate,              // 简易的对象副本函数，对象拷贝范围：对象、对象数组
    buildParams,            // 查询参数字符串
    zeroizeDigit,           // 补零数字
    insertStr,              // 插入字符串
    getRootUrl,             // 获取根链接路径
    getIntpart,             // 取整
    convertPercent,         // 转换百分比
    trim,                   // 字符串trim函数
    jumpTop,                // 跳转至顶部

    isIE9: isIE9,           // 判断是否为IE9
    isMobile: isMobile,		// 判断是否为移动端
    printError,             // 打印错误
};
