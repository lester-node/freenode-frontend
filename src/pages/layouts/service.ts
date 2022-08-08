import { get, post } from '@/utils/request';

const api = {
  courseTree: (data: any) => post('/v1/course/courseTree', data),
};

export default api;
