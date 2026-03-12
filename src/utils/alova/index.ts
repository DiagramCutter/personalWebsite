//index.ts
import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'
import { ElMessage } from 'element-plus'
import { useLoginDataStore } from '@/stores/loginData'

export const AlovaInstance = createAlova({
  baseURL: '/api',
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  shareRequest: true,
  timeout: 10000,

  // 请求拦截器
  beforeRequest(method) {
    // 假设我们需要添加token到请求头
    if (useLoginDataStore().token) {
      method.config.headers.token = useLoginDataStore().token
    }
  },
  // 响应拦截器
  responded: {
    onSuccess: async (response: Response) => {
      const json = await response.json()
      if (json.code !== 0) {
        ElMessage.error(json.msg)
      }
      return json
    },
    // 抛出错误时，将会进入请求失败拦截器内
    onError(error) {
      throw new Error(error)
    },
  },
})
