import { post } from '@/utils/request'

const api = {
  articleSelectOne: (data: any) => post('/v1/article/articleSelectOne', data)
}

export default api
