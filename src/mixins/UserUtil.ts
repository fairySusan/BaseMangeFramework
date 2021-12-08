import { UserI } from "@/https/login/Type";
import store from "@/store";

/**
 * 用户信息存取处理
 */
export class UserInfoHandler {
    private static userinfoKey = 'userInfo'; // key值
    private static powerListKey = 'powerList'
    private static userRoleKey = 'userRole'

    /**
     * 获取用户信息
     */
    public static getUserInfo(): UserI | undefined {
        const uinfo = localStorage.getItem(UserInfoHandler.userinfoKey);
        if (uinfo === null) {
            console.warn('还未存入用户信息');
            return undefined;
        } else {
            return JSON.parse(uinfo);
        }
    }

    /**
     * 设置用户信息
     * @param value 设置的值
     */
    public static setUserInfo(value: string) {
        localStorage.setItem(UserInfoHandler.userinfoKey, value);
    }

    /**
     * 设置用户角色
     * @param value 设置的值
     */
    public static setUserRole(value: string[]) {
        localStorage.setItem(UserInfoHandler.userRoleKey, JSON.stringify(value));
    }

    /**
    * 获取用户角色
    * @param value 设置的值
    */
    public static getUserRole(): string[] {
        const roleList = localStorage.getItem(UserInfoHandler.userRoleKey);
        if (roleList === null) {
            console.warn('还未存入用户角色');
            return [];
        } else {
            return JSON.parse(roleList);
        }
    }

    /**
     * 移除用户角色
     */
    public static removeUserRole() {
        sessionStorage.removeItem(UserInfoHandler.userRoleKey);
    }


    /**
     * 移出用户信息，一般退出登录之后就清除
     */
    public static removeUserInfo() {
        localStorage.removeItem(UserInfoHandler.userinfoKey)
        UserInfoHandler.removeUserPowerList()
        UserInfoHandler.removeUserRole()
    }

    /**
     * 获取用户权限列表
     */
    // public static getUserPowerList(): PowerSettingItem[] | [] {
    //     const powerList = sessionStorage.getItem(UserInfoHandler.powerListKey);
    //     if (powerList === null) {
    //         console.warn('还未存入用户权限列表');
    //         return [];
    //     } else {
    //         return JSON.parse(powerList);
    //     }
    // }

    /**
     * 设置用户权限列表
     */
    // public static setUserPowerList(data: PowerSettingItem[]) {
    //     sessionStorage.setItem(UserInfoHandler.powerListKey, JSON.stringify(data));
    // }

    /**
     * 移除用户权限列表
     */
    public static removeUserPowerList() {
        sessionStorage.removeItem(UserInfoHandler.powerListKey);
    }
}
