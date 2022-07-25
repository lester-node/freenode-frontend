import { get, post } from '@/utils/request';

const api = {
  articlePage: (data: any) => get('/v1/article/articlePage', data),
  classifyEnum: (data: any) => post('/v1/classify/classifyEnum', data),
  tagEnum: (data: any) => post('/v1/tag/tagEnum', data),
};

export default api;
