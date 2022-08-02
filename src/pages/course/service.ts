import { get, post } from '@/utils/request';

const api = {
  courseTree: (data: any) => post('/v1/course/courseTree', data),
  courseArticleSelectOne: (data: any) =>
    post('/v1/courseArticle/courseArticleSelectOne', data),
};

export default api;
