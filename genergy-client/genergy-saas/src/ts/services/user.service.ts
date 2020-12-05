import { Caxios } from '@/ts/common';
import { Urls, CaxiosType } from '@/ts/config';
import { UserModel } from '@/ts/models';

export class UserService {
    // 获取用户列表
    public async fetchUsers(): Promise<Array<UserModel>> {
        let result = await Caxios.get<Array<UserModel> | null>({ url: Urls.user.list }, CaxiosType.Token);
        return (result || []).slice(0, 8);
    }
}
