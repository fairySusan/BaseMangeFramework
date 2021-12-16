import _axios from './HttpUtil';
import { JsonWebTokenI } from '@/https/login/Type';
import { BaseResponse } from './Interface';
import moment from 'moment'
import router from '@/router';

/**
 * 验证token的存取方法
 */
export class TokenHandler {
    // 验证token存到本地的key值
    public static authorTokenKey: string = 'AuthorToken';
    // 验证token过期时间存到本地的key值
    private static tokenExpireKey: string = 'tokenExpireTime';

    // 刷新token存到本地的key值
    private static refreshTokenKey: string = 'refreshToken';
    // 刷新token过期时间存到本地的key值
    private static refreshExpireTimeKey: string = 'refreshTokenExpireTime';

    /**
     * token过期，获取验证的token
     * @param refreshToken 
     */
    public static getNewAccessToken(): Promise<BaseResponse<JsonWebTokenI>> {
        return new Promise((resolve, reject) => {
            const refreshToken = localStorage.getItem('refreshToken');
            const params = {
                refreshToken: refreshToken
            }
            _axios.post('/api/jwt/refreshtoken', params).then((res: any) => {
                if (res.success) {
                    TokenHandler.setToken(res.data);
                    resolve(res)   
                } else {
                    router.replace('/login')
                }
            }).catch((fail) => {
              reject(fail)
              router.replace('/login')
            })
        })
    }

    /**
     * 获取验证的token
     */
    public static getToken(): string {
        const token = localStorage.getItem(TokenHandler.authorTokenKey);
        if (token === null) {
            // console.warn('还未存入token');
            return '';
        } else {
            return 'Bearer ' + token;
        }
    }

    /**
     * 设置验证的token,token过期时间，刷新token，刷新token过期时间
     * @param values 数据
     */
    public static setToken(data: JsonWebTokenI) {
        localStorage.setItem(TokenHandler.refreshTokenKey, data.refreshToken);
        localStorage.setItem(TokenHandler.refreshExpireTimeKey, data.refreshUctExpires);
        // 返回的过期时间是国际时间
        localStorage.setItem(TokenHandler.tokenExpireKey, moment(data.tokenUtcExpires).add(8,'h').format('YYYY-MM-DD HH:mm:ss'));
        localStorage.setItem(TokenHandler.authorTokenKey, data.accessToken)
    }

    /**
     * 移除token,token过期时间，刷新token，刷新token过期时间
     */
    public static removeToken() {
        localStorage.removeItem(TokenHandler.refreshTokenKey);
        localStorage.removeItem(TokenHandler.refreshExpireTimeKey);
        localStorage.removeItem(TokenHandler.tokenExpireKey);
        localStorage.removeItem(TokenHandler.authorTokenKey)
    }

    /**
     * 当前token是否过期
     * @returns 
     */
    public static isExpire(): boolean {
        let time = localStorage.getItem(TokenHandler.tokenExpireKey);
        if (time == null) return true;
        if (moment(time) > moment()) return false;
        return true;
    }

    /**
     * 倒计时刷新token，如果token过期，自动调用刷新token接口。
     */
    // public static isExpireToken(){
    //     const tokenExpireTime = localStorage.getItem('tokenExpireTime');

    //     if(tokenExpireTime != null){
    //         const localTime = new Date(tokenExpireTime).getTime();
    //         const curTime = new Date().getTime();

    //         // token过期倒计时时间，后面3*1000 是提前 3秒 刷新token
    //         const gapTime = localTime - curTime - 3 * 1000;

    //         let timer:number | null = setTimeout(() => {
    //             if(timer){
    //                 clearTimeout(timer);
    //                 timer = null;
    //                 TokenHandler.getNewAccessToken(); 
    //             }
    //         }, gapTime);
    //     }
    // }   

}

