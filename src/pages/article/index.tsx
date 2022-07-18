import styles from './index.less';
import React, { useEffect, useState } from 'react';
import useRequest from '@ahooksjs/use-request';
import api from './service';
import { message, Pagination } from 'antd';
import config from './config';
import SingleArticle from './components/singleArticle';

const Index = () => {
  const [pageData, setPageData] = useState(config.PAGEDATA);
  const [tableParams, setTableParams] = useState(config.TABLEPARAMS);

  useEffect(() => {
    articlePageRun(tableParams);
  },[tableParams.page])

  const { run: articlePageRun } = useRequest((obj) => api.articlePage(obj), {
    manual: true,
    onSuccess: (res: any) => {
      if (res.result === 0) {
        setPageData({
          dataList: res.data.rows,
          total: res.data.total,
        });
      } else {
        message.error(res.message || '操作失败');
      }
    },
    onError: (res: any) => {
      message.error(res.message || '操作失败');
    },
  });

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.data}>
          {pageData.dataList.map((item,index) => (
            <SingleArticle data={item} key={index}/>
          ))}
        </div>
        <Pagination
          className={styles.dataPagination}
          total={pageData.total}
          pageSize={tableParams.rows}
          current={tableParams.page}
          size="small"
          showQuickJumper={false}
          showSizeChanger={false}
          onChange={async (page: number, pageSize: number) => {
            setTableParams({
              ...tableParams,
              page: page,
              rows: pageSize,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Index;
