import { get, postFormData } from '@/utils/request';

const api = {
  articlePage: (data: any) => get('/v1/article/articlePage', data),
};

export default api;
