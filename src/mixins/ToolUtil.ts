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
}