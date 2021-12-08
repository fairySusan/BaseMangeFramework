export class ToolUtil {
  /**判断是否为空对象 */
  public isEmptyObject(obj: Object) {
    return Object.keys(obj).length === 0
  }

  /**深拷贝对象 */
  public deepClone (obj: any): any {
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
}