export default [
  {
    path: '/',
    component: '@/pages/layouts',
    routes: [
      {
        title: '高效率开发学习',
        path: '/',
        component: '@/pages/home',
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
