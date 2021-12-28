import { Loading } from "@element-plus/icons";
import { ElMessage } from "element-plus";

export function MessageLoading(options: {
  message: string
}) {
  return ElMessage({
    message: options && (options.message ? options.message: '正在加载...'),
    duration: 0,
    icon: Loading,
    customClass: 'vLoadingMessage'
  })
}