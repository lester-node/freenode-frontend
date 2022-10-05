import { get, post } from '@/utils/request'

const api = {
  courseTree: (data: any) => post('/v1/course/courseTree', data),
  articleList: (data: any) => get('/v1/article/articleList', data)
}

export default api
