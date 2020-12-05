export * from './user.model';
export * from './asset.model';
export * from './plant.model';

// 响应结果
export class ResponseResult<T> {
    code: number; // code码
    data: T; // 数据
    message: string; // 消息
    trace: string;

    constructor(code: number, data: T, message: string) {
        this.code = code;
        this.data = data;
        this.message = message;
    }
}

// 分页结果
export class PageResult<T> {
    public current: number; // 当前页码
    public size: number; // 分页尺寸
    public records: Array<T>; // 数据记录
    public total: number; // 记录总数

    constructor(current: number, size: number, records: Array<T>, total: number) {
        this.current = current;
        this.size = size;
        this.records = records;
        this.total = total;
    }
}
