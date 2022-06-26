import { defineConfig } from 'umi';
import routes from './routes';
import proxy from './proxy';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  routes,
  proxy,
  fastRefresh: {},
  targets: {
    ie: 11,
  },
  publicPath: './',
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
});
