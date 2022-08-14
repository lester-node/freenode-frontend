import { defineConfig } from 'umi';
import px2rem from 'postcss-plugin-px2rem';
import routes from './routes';
import proxy from './proxy';
import theme from './theme';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  routes,
  proxy,
  theme,
  fastRefresh: {},
  targets: {
    ie: 11,
  },
  publicPath: './',
  headScripts: [{ src: `./resources/js/jquery.min.js` }],
  extraBabelPlugins: [
    [
      'import',
      { libraryName: 'antd', libraryDirectory: 'lib', style: true },
      'antd',
    ],
    ...(process.env.NODE_ENV == 'development'
      ? []
      : ['transform-remove-console']),
  ],
  ...(process.env.NODE_ENV == 'development'
    ? {}
    : {
        chunks: ['antdesigns', 'vendors', 'umi'],
        chainWebpack: function (config, { webpack }) {
          config.merge({
            optimization: {
              minimize: true,
              splitChunks: {
                chunks: 'async',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                  vendors: {
                    name: 'vendors',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|lodash|lodash-decorators|redux-saga|re-select|dva|moment)[\\/]/,
                    priority: -10,
                  },
                  antdesigns: {
                    name: 'antdesigns',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
                    priority: -11,
                  },
                },
              },
            },
          });
        },
      }),
  extraPostCSSPlugins: [
    px2rem({
      //rootValue不是根元素的font-size，是css中px的缩放比例，例如根元素font-size为16px，css元素高为100px，则元素高为16px
      rootValue: 16,
      selectorWhiteList: ['Mui'],
      exclude: /node_modules|global.less/i,
    }),
  ],
});
