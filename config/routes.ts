export default [
  {
    path: '/',
    component: '@/pages/layouts',
    routes: [
      {
        title: '拾柒的博客',
        path: '/',
        component: '@/pages/home',
      },
      {
        title: '教程',
        path: 'course',
        component: '@/pages/course',
      },
      {
        title: '文章',
        path: 'article',
        component: '@/pages/article',
      },
      {
        title: '文档',
        path: 'articleDetail',
        component: '@/pages/articleDetail',
      },
      {
        title: '关于',
        path: 'about',
        component: '@/pages/about',
      },
    ],
  },
];
