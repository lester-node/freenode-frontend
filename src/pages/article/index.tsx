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
  const [classifyData, setClassifyData] = useState<any>([]);
  const [tagData, setTagData] = useState<any>([]);

  useEffect(() => {
    articlePageRun(tableParams);
  }, [tableParams.page, tableParams.tagId, tableParams.classifyId]);

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

  const { run: classifyEnumRun } = useRequest(() => api.classifyList({}), {
    manual: false,
    onSuccess: (res: any) => {
      if (res.result === 0) {
        setClassifyData([{ id: '', name: '全部' }, ...res.data]);
      } else {
        message.error(res.message || '操作失败');
      }
    },
    onError: (res: any) => {
      message.error(res.message || '操作失败');
    },
  });

  const { run: tagPageRun } = useRequest(() => api.tagEnum({}), {
    manual: false,
    onSuccess: (res: any) => {
      if (res.result === 0) {
        setTagData([{ id: '', name: '全部' }, ...res.data]);
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
        <div className={styles.left}>
          <div className={styles.block}>
            <div className={styles.title}>分类</div>
            <div className={styles.bigBlock}>
              {classifyData.map((item: any, index: number) => {
                return (
                  <div
                    style={{ backgroundColor: `#${config.COLOR_1[index]}` }}
                    className={styles.smallBlock}
                    onClick={() => {
                      setTableParams({
                        page: 1,
                        rows: 10,
                        classifyId: item.id,
                        tagId: tableParams.tagId,
                      });
                    }}
                  >
                    {item.name == '全部'
                      ? `${item.name}`
                      : `${item.name}(${item.articleTotal})`}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.title}>标签</div>
            <div className={styles.bigBlock}>
              {tagData.map((item: any, index: number) => {
                return (
                  <div
                    style={{ backgroundColor: `#${config.COLOR_2[index]}` }}
                    className={styles.smallBlock}
                    onClick={() => {
                      setTableParams({
                        page: 1,
                        rows: 10,
                        tagId: item.id,
                        classifyId: tableParams.classifyId,
                      });
                    }}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>最新文章</div>
          <div className={styles.bigBlock}>
            <div className={styles.data}>
              {pageData.dataList.map((item, index) => (
                <SingleArticle data={item} key={index} />
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
      </div>
    </div>
  );
};

export default Index;
