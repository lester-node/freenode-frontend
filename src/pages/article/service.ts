import { get, post } from '@/utils/request';

const api = {
  articlePage: (data: any) => get('/v1/article/articlePage', data),
  classifyList: (data: any) => post('/v1/classify/classifyList', data),
  tagEnum: (data: any) => post('/v1/tag/tagEnum', data),
};

export default api;
