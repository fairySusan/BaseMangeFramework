export class ValidateTool {

  // 手机号的正则
  static PhoneReg = /^1[3|4|5|6|7|8|9]\d{9}$/

  // 身份证的正则表达式
  static IdentityReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

  // 本网站登录账号正则
  static AccountReg = /^[a-z0-9A-Z]{3,20}$/

  // 验证数字
  static NumberReg = /^[0-9]*$/

  // 验证邮箱
  static EmailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;

  // 验证英文名称格式
  static EnglishNameReg = /^[a-zA-Z]+\/[a-zA-Z]+$/

  // 验证中文名称格式
  static ChineseNameReg = /^[\u4E00-\u9FA5]+$/

  /**
 * 检测格式为小数点后两位(0-1折扣率)
 * @param str 
 */
  // static CheckDecimalPoint = /^(0\.[0-9][0-9]|1\.00)$/;
  static CheckDecimalPoint = /^((0\.((?=0)(0[1-9])|([1-9]\d)))|1.00)$/;
  /*
  * 检测格式为小数点后两位(金额)
  */
  static CheckAmount = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
  /*
  * 含0正整数
  */
  static isPositiveInteger = /^[+]{0,1}(\d+)$/
  /*
  * http(s)地址验证
  */
  static httpVerification = /^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(:\d{0,5})?(\/.*)?$/
  static httpEnd = /^([^\/]([\s\S]*[^\/])?)?$/

  /**
   * 检测人名，能包括 张三·大 这种带点的中文 和 robert·max 英文带点的
   */
  public static checkName(str: string): boolean {
      const reg = /([\u4e00-\u9fa5·]{1,20}|[a-zA-Z.s]{1,20})/;
      return reg.test(str);
  }

  /**
   * 检测账户名，3-29位的数字或英文的组合
   * @param str 
   */
  public static checkAccount(str: string): boolean {
      const reg = /^[a-z0-9A-Z]{3,29}$/;
      return reg.test(str);
  }

  /**
   * 检测按钮名，2-50位的英文或横线的组合
   * @param str 
   */
  public static checkAButtonKey(str: string): boolean {
      const reg = /^[a-zA-Z][a-zA-Z-]{1,49}$/;
      return reg.test(str);
  }

  /**
   * 检测是否是邮箱
   * @param str 
   */
  public static isEmail(str: string): boolean {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      return reg.test(str);
  }

  /**
   * 检测是否是手机号
   * @param str 
   */
  public static isMobile(str: string): boolean {
      const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      return reg.test(str);
  }

  /**
   * 检测工号是否正确
   * @param str 
   * @param count 工号多少位，默认6位
   */
  public static isJobNumber(str: string, count = 6): boolean {
      const reg = new RegExp(`^[0-9]{${count}}$`);
      return reg.test(str);
  }

  /**
   * 检测密码强度
   * @param str 需要检测的密码
   * @returns 返回的是强度等级，越高越强
   */
  public static checkPwdStrong(str: string): number {
      let Lv = 0;
      if (str.length < 6) {
          return Lv
      }
      if (/[0-9]/.test(str)) {
          Lv++
      }
      if (/[a-z]/.test(str)) {
          Lv++
      }
      if (/[A-Z]/.test(str)) {
          Lv++
      }
      if (/[\.|-|_]/.test(str)) {
          Lv++
      }
      return Lv;
  }

  /**
   * 验证路由名称是否正确
   * @param routeStr 路由名称
   */
  public static validateRoute(routeStr: string): boolean {
      // 路由只匹配 /和英文和数字
      const routeReg = /^\/[A-Z | a-z | \/ | 0-9]+$/;
      return routeReg.test(routeStr);
  }

  /**
   * 验证是否是接受的文件类型
   * @param str 
   */
  public static isAcceptFileType(acceptType: string, str: string): boolean {
      const typeArr = acceptType.split(',');
      const result = typeArr.some((val) => {
          const type = str.split('/');
          if (val.indexOf('image') > -1 && type[0] === 'image') {
              return true;
          } else if (val.indexOf('pdf') > -1 && type[1] === 'pdf') {
              return true;
          } else {
              return false;
          }
      })
      return result;
  }

  /**
   * 验证是否是接受的文件类型
   * @param str 
   */
  public static isAcceptFile(acceptType: string, str: string): boolean {
      const typeArr = acceptType.split(',');
      const result = typeArr.some((val) => val === `.${str}`)
      return result;
  }
}