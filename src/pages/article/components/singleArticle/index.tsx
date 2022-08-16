import styles from './index.less';
import React from 'react';
import moment from 'moment';
import { history } from 'umi';
import {
  ClockCircleOutlined,
  TagOutlined,
  PushpinOutlined,
} from '@ant-design/icons';

const Index = (props: any) => {
  const { data } = props;

  const goArticleDetail = () => {
    history.push(`/articleDetail?id=${data.id}`);
  };

  return (
    <div className={styles.article} onClick={goArticleDetail}>
      <div className={styles.title}>{data.title}</div>
      <div className={styles.content}>
        {data.classifyName ? (
          <div className={styles.classify}>
            <PushpinOutlined className={styles.icon} />
            {data.classifyName}
          </div>
        ) : null}
        {data.tagName
          ? data.tagName.split(',').map((name: string, index: number) => {
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
          {moment(data.updatedAt).format('YYYY-MM-DD')}
        </div>
      </div>
    </div>
  );
};

export default Index;
