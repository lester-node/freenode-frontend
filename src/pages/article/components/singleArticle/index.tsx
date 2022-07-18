import styles from './index.less';
import React from 'react';
import moment from 'moment';
import { history } from 'umi';

const Index = (props: any) => {
  const { data } = props;

  const goArticleDetail = () => {
    history.push({ pathname: '/articleDetail', state: { id: data.id } });
  };
  
  return (
    <div className={styles.article} onClick={goArticleDetail}>
      <div>{data.title}</div>
      <div>{moment(data.updatedAt).format('YYYY-MM-DD')}</div>
    </div>
  );
};

export default Index;
