import { get, post } from '@/utils/request'

const api = {
  articlePage: (data: any) => get('/v1/article/articleFilterPage', data),
  classifyList: (data: any) => post('/v1/classify/classifyList', data),
  tagList: (data: any) => post('/v1/tag/tagList', data)
}

export default api
