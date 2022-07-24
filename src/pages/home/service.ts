import { get, postFormData } from '@/utils/request';

const api = {
  articlePage: (data: any) => get('/v1/article/articlePage', data),
  classifyPage: (data: any) => get('/v1/classify/classifyPage', data),
  tagPage: (data: any) => get('/v1/tag/tagPage', data),
  // articlePage: (data: any) => get('/v1/article/articlePage', data),
};

export default api;
