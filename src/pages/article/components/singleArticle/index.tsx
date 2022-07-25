import styles from './index.less';
import React from 'react';
import moment from 'moment';
import { history } from 'umi';
import { ClockCircleOutlined } from '@ant-design/icons';

const Index = (props: any) => {
  const { data } = props;

  const goArticleDetail = () => {
    history.push({ pathname: '/articleDetail', state: { id: data.id } });
  };

  return (
    <div className={styles.article} onClick={goArticleDetail}>
      <div className={styles.title}>
        {data.classifyName ? (
          <div className={styles.classify}>{data.classifyName}</div>
        ) : null}
        {data.title}
      </div>
      <div className={styles.content}>
        <ClockCircleOutlined className={styles.icon} />
        {moment(data.updatedAt).format('YYYY-MM-DD')}
      </div>
    </div>
  );
};

export default Index;
