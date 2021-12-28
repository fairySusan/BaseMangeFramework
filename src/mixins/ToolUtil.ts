import store from '@/store';

export default class ToolUtil {
  /**判断是否为空对象 */
  public static isEmptyObject(obj: Object) {
    return Object.keys(obj).length === 0
  }

  /**深拷贝对象 */
  public static deepClone (obj: any): any {
    const objClone: any = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (obj[key] && typeof obj[key] === "object") {
            objClone[key] = this.deepClone(obj[key]);
          } else {
            objClone[key] = obj[key];
          }
        }
      }
    }
    return objClone;
  }

  /**
   * 判断密码是否有连续的三个字符
   */
  public static isKeyBoardContinuousChar(str: any) {
    let c1 = [
      ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '\"'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?']
    ];
    let c2 = [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
    ];
    str = str.split("");
    //获取坐标位置
    let y = [];
    let x = [];
    for (let c = 0; c < str.length; c++) {
      y[c] = 0;//当做~`键处理
      x[c] = -1;
      for (let i = 0; i < c1.length; i++) {
        for (let j = 0; j < c1[i].length; j++) {
          if (str[c] == c1[i][j]) {
            y[c] = i;
            x[c] = j;
          }
        }
      }
      if (x[c] != -1) continue;
      for (let i = 0; i < c2.length; i++) {
        for (let j = 0; j < c2[i].length; j++) {
          if (str[c] == c2[i][j]) {
            y[c] = i;
            x[c] = j;
          }
        }
      }
    }
    //匹配坐标连线
    for (let c = 1; c < str.length - 1; c++) {
      if (y[c - 1] == y[c] && y[c] == y[c + 1]) {
        if ((x[c - 1] + 1 == x[c] && x[c] + 1 == x[c + 1]) || (x[c + 1] + 1 == x[c] && x[c] + 1 == x[c - 1])) {
          return true;
        }
      } else if (x[c - 1] == x[c] && x[c] == x[c + 1]) {
        if ((y[c - 1] + 1 == y[c] && y[c] + 1 == y[c + 1]) || (y[c + 1] + 1 == y[c] && y[c] + 1 == y[c - 1])) {
          return true;
        }
      }
    }
    return false;
  }

   //密码强度检测函数
  public static calcPwdRank(l_Content: string) {
    if (l_Content.length < 8 || /^[0-9]{1,8}$/.test(l_Content)) {
      return 0
    }

    if (/^[0-9]*$/.test(l_Content) || /^[a-zA-Z]*$/.test(l_Content)) {
      return 0
    }
    let ls = 0;
    if (l_Content.match(/[a-z]/g)) { ls++; }
    if (l_Content.match(/[A-Z]/g)) { ls++; }
    if (l_Content.match(/[0-9]/g)) { ls++; }
    if (l_Content.match(/[^a-zA-Z0-9]/g)) { ls++; }
    if (l_Content.length < 8 && ls > 1) {
      ls = 1;
    }
    if (ls > 3) {
      ls = 3;
    }
    return ls;
  }

  // 返回DatePicker禁用今天以后的函数
  public static disabledAfeterTodayDate = (time: any) => {
    return time.getTime() > Date.now()
  }

  public static validatePassword(rule:any, value:string, callback:Function){
    const pwdRank = ToolUtil.calcPwdRank(value)
    if(value === ''){
        callback(new Error('未填写密码'));
    }else if(value.length < 8 || value.length > 20){
        callback(new Error('密码长度在8到20位'));
    }else if (value.toLowerCase().indexOf('hx')!=-1) {
        callback(new Error('不能使用 hx 作为密码'));
    } else if (value.toLowerCase().indexOf(store.state.user.userInfo?.account as string) !== -1) {
        callback(new Error('不能使用姓名拼音作为密码'));
    } else if (ToolUtil.isKeyBoardContinuousChar(value)) {
        callback(new Error("键盘连续字符不能超过 3 个"))
    } else if (pwdRank !== 3) {
        callback(new Error("包含数字、小写字母、大写字母、特殊符号 4 类中至少3类"))
    } else {
        callback()
    }
  }

  // 将函数放入异步队列来执行
  public static deferCall(fn: (value: void) => void | PromiseLike<void>) {
    return Promise.resolve().then(fn)
  }

  /**
   * a标签 下载指定后缀名的文件。前提是文件需要数据流形式
   * @param blobData blob对象内容
   * @param fileName 文件名
   * @param suffix 文件后缀名
   */
  public static AtagDownLoadHandle(blobData: Blob, fileName?: string) {
    // 创建下载链接
    const realName = fileName;
    // 非ie
    const downloadHref = window.URL.createObjectURL(blobData);
    // 创建a标签并为其添加属性
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadHref;
    downloadLink.download = realName || '文件';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink)
    // 触发点击事件执行下载
    downloadLink.click();

    URL.revokeObjectURL(downloadLink.href) // 释放URL 对象
    document.body.removeChild(downloadLink)
  }
}