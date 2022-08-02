import styles from './index.less';
import React, { useState } from 'react';
import { useMount } from 'ahooks';
import useRequest from '@ahooksjs/use-request';
import api from './service';
import { message } from 'antd';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/zh-cn';
import '../../style/toastui-editor-viewer.css';
import _ from 'lodash';
import {
  LeftOutlined,
  ClockCircleOutlined,
  PushpinOutlined,
  TagOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { history } from 'umi';
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

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
        <div className={styles.left}>
          <div className={styles.title}>
            <div
              className={styles.back}
              onClick={() => {
                history.push('article');
              }}
            >
              <LeftOutlined className={styles.icon} />
              返回文章列表
            </div>
            <div className={styles.middle}>
              {articleData.title}
            </div>
            <div className={styles.right}>
              {articleData.classifyName ? (
                <div className={styles.classify}>
                  <PushpinOutlined className={styles.icon} />
                  {articleData.classifyName}
                </div>
              ) : null}
              {articleData.tagName
                ? articleData.tagName.split(',').map((name: string,index:number) => {
                    return (
                      <div className={styles.tag} key={index}>
                        <TagOutlined className={styles.icon} />
                        <div>{name}</div>
                      </div>
                    );
                  })
                : null}
              <div className={styles.time}>
                <ClockCircleOutlined className={styles.icon} />
                {moment(articleData.updatedAt).format('YYYY-MM-DD')}
              </div>
            </div>
          </div>
          {!_.isEmpty(articleData) ? (
            <div className={styles.articleContent}>
              <Viewer initialValue={articleData.content} />
            </div>
          ) : null}
        </div>
        <div className={styles.right}>
          <MarkNav
            className={styles.articleMenu}
            source={articleData.content}
            headingTopOffset={80}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
