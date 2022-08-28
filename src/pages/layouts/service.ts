import { get, post } from "@/utils/request";

const api = {
  courseTree: (data: any) => post("/v1/course/courseTree", data),
  articleAndCourseList: (data: any) =>
    get("/v1/article/articleAndCourseList", data),
};

export default api;
