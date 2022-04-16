import { defineConfig } from 'umi';
import routes from './routes'
import proxy from './proxy';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: []
  },
  routes,
  proxy,
  fastRefresh: {},
  targets: {
    ie: 11,
  },
  publicPath:'./'
});
