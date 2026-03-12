// api.ts
import type { ResponseData } from '@/interface/response.ts'
import { AlovaInstance } from './index.ts'

export const api = (parms: object) => {
  return AlovaInstance.Post<ResponseData<string>>('/login', parms)
}
