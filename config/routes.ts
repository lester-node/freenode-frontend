export default [
  {
    path: '/',
    component: '@/pages/layouts',
    routes: [
      {
        title: '前言',
        path: '/',
        component: '@/pages/preface',
      },
      {
        title: '文章-HTML',
        path: '/articleHtml',
        component: '@/pages/articleHtml',
      },
      {
        title: '文章-CSS',
        path: '/articleCss',
        component: '@/pages/articleCss',
      },
    ],
  },
];
