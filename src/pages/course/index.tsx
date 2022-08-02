import styles from './index.less';
import React, { useEffect, useRef, useState } from 'react';
import useRequest from '@ahooksjs/use-request';
import { message, Tree } from 'antd';
import type { DirectoryTreeProps } from 'antd/es/tree';
import api from './service';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/zh-cn';
import '../../style/toastui-editor-viewer.css';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import _ from 'lodash';

const Index = () => {
  const viewRef = useRef<any>();
  const [treeData, setTreeData] = useState([]);
  const [articleData, setArticleData] = useState<any>({});

  const scrollChange = () => {
    // 变量 scrollHeight 是滚动条的总高度
    let scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    // 变量 windowHeight 是可视区的高度
    let windowHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    // 变量scrollTop为当前页面的滚动条纵坐标位置
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    // 滚动条到底部得距离 = 滚动条的总高度 - 可视区的高度 - 当前页面的滚动条纵坐标位置
    var scrollBottom = scrollHeight - windowHeight - scrollTop;
    //滚动的时候切换菜单又很小概率页面切过去了又触发了函数，判断是否存在
    if (document.getElementById('leftScroll')) {
      if (scrollBottom < 105) {
        document.getElementById('leftScroll').style.bottom =
          105 - scrollBottom + 'px';
      } else {
        document.getElementById('leftScroll').style.bottom = 0;
      }
    }
  };

  useEffect(() => {
    courseArticleSelectOneRun('2342b97c-a8e3-4f8e-a5f3-80ee2d5e42a9');
    // 滚动条滚动时触发
    window.addEventListener('scroll', scrollChange);
    return () => {
      window.removeEventListener('scroll', scrollChange);
    };
  }, []);

  const { run: courseTreeRun } = useRequest(() => api.courseTree({}), {
    manual: false,
    onSuccess: (res: any) => {
      if (res.result === 0) {
        setTreeData(res.data);
      } else {
        message.error(res.message || '操作失败');
      }
    },
    onError: (res: any) => {
      message.error(res.message || '操作失败');
    },
  });

  const { run: courseArticleSelectOneRun } = useRequest(
    (id) => api.courseArticleSelectOne({ id }),
    {
      manual: true,
      onSuccess: (res: any) => {
        if (res.result === 0) {
          setArticleData(res.data);
          viewRef.current.getInstance().setMarkdown(res.data.content);
        } else {
          message.error(res.message || '操作失败');
        }
      },
      onError: (res: any) => {
        message.error(res.message || '操作失败');
      },
    },
  );

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    if (info.node.isLeaf) {
      setArticleData({});
      courseArticleSelectOneRun(info.node.key);
    }
  };

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.left} id="leftScroll">
          {treeData.length ? (
            <Tree.DirectoryTree
              treeData={treeData}
              onSelect={onSelect}
              defaultExpandedKeys={['655507ea-664a-4700-a276-591d20ab1e22']}
              defaultSelectedKeys={['2342b97c-a8e3-4f8e-a5f3-80ee2d5e42a9']}
            />
          ) : null}
        </div>
        <div className={styles.right}>
          <div className={styles.articleLeft}>
            <div className={styles.articleContent}>
              <Viewer ref={viewRef} />
            </div>
          </div>
          <div className={styles.articleRight}>
            <MarkNav
              className={styles.articleMenu}
              source={articleData.content}
              headingTopOffset={80}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
