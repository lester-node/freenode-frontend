import styles from './index.less';
import React, { useState } from 'react';
import { useMount } from 'ahooks';
import useRequest from '@ahooksjs/use-request';
import api from './service';
import { message } from 'antd';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/zh-cn';
import './style/toastui-editor-viewer.css';
import _ from 'lodash';

const Index = (props: any) => {
  const state = props.location.state;
  const [articleData, setArticleData] = useState<any>({});

  useMount(() => {
    if (state?.id) {
      articleSelectOneRun({ id: state?.id });
    }
  });

  const { run: articleSelectOneRun } = useRequest(
    (obj) => api.articleSelectOne(obj),
    {
      manual: true,
      onSuccess: (res: any) => {
        if (res.result === 0) {
          setArticleData(res.data);
        } else {
          message.error(res.message || '操作失败');
        }
      },
      onError: (res: any) => {
        message.error(res.message || '操作失败');
      },
    },
  );

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        {!_.isEmpty(articleData) ? (
          <Viewer
            initialValue={articleData.content}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Index;
