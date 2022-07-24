import styles from './index.less';
import React, { useState } from 'react';
import {
  GithubFilled,
  WechatFilled,
  QqCircleFilled,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
  MailFilled,
} from '@ant-design/icons';
import useRequest from '@ahooksjs/use-request';
import api from './service';
import { message, Rate } from 'antd';
import { history } from 'umi';

const Index = () => {
  const [total, setTotal] = useState({
    course: 0,
    article: 0,
    classify: 0,
    tag: 0,
  });

  const { run: articlePageRun } = useRequest(
    () =>
      api.articlePage({
        page: 1,
        rows: 10,
      }),
    {
      manual: false,
      onSuccess: (res: any) => {
        if (res.result === 0) {
          setTotal({
            ...total,
            article: res.data.total,
          });
        } else {
          message.error(res.message || '操作失败');
        }
      },
      onError: (res: any) => {
        message.error(res.message || '操作失败');
      },
    },
  );

  const { run: classifyPageRun } = useRequest(
    () =>
      api.classifyPage({
        page: 1,
        rows: 10,
      }),
    {
      manual: false,
      onSuccess: (res: any) => {
        if (res.result === 0) {
          setTotal({
            ...total,
            classify: res.data.total,
          });
        } else {
          message.error(res.message || '操作失败');
        }
      },
      onError: (res: any) => {
        message.error(res.message || '操作失败');
      },
    },
  );

  const { run: tagPageRun } = useRequest(
    () =>
      api.tagPage({
        page: 1,
        rows: 10,
      }),
    {
      manual: false,
      onSuccess: (res: any) => {
        if (res.result === 0) {
          setTotal({
            ...total,
            tag: res.data.total,
          });
        } else {
          message.error(res.message || '操作失败');
        }
      },
      onError: (res: any) => {
        message.error(res.message || '操作失败');
      },
    },
  );

  const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  return (
    <div className={styles.main}>
      <div className={styles.font}>
        <div>Hello！欢迎观看我的小破站（正在建设中）！</div>
        <div>此网站是我对于前端开发的总结和理解，记录下我的奇思妙想。</div>
        <div>如有错误的地方，请一定要指出，相互交流开发心得。</div>
        <div>
          目前两年前端工作经验（
          <div className={styles.personAbility}>
            个人技能
            <div className={styles.showPersonAbility}>
              <ol>
                <li>
                  <Rate
                    defaultValue={4}
                    character={({ index }: { index: number }) =>
                      customIcons[index + 1]
                    }
                    disabled
                    className={styles.grade}
                  />
                  JavaScript、React、Vue
                </li>
                <li>
                  <Rate
                    defaultValue={4}
                    character={({ index }: { index: number }) =>
                      customIcons[index + 1]
                    }
                    disabled
                    className={styles.grade}
                  />
                  uniapp、H5、小程序
                </li>
                <li>
                  <Rate
                    defaultValue={3}
                    character={({ index }: { index: number }) =>
                      customIcons[index + 1]
                    }
                    disabled
                    className={styles.grade}
                  />
                  Node、Koa2
                </li>
                <li>
                  <Rate
                    defaultValue={3}
                    character={({ index }: { index: number }) =>
                      customIcons[index + 1]
                    }
                    disabled
                    className={styles.grade}
                  />
                  Nginx、Docker、Jenkins
                </li>
                <li>
                  <Rate
                    defaultValue={4}
                    character={({ index }: { index: number }) =>
                      customIcons[index + 1]
                    }
                    disabled
                    className={styles.grade}
                  />
                  Git
                </li>
                <li>
                  <Rate
                    defaultValue={2}
                    character={({ index }: { index: number }) =>
                      customIcons[index + 1]
                    }
                    disabled
                    className={styles.grade}
                  />
                  Linux
                </li>
                <li>
                  <Rate
                    defaultValue={2}
                    character={({ index }: { index: number }) =>
                      customIcons[index + 1]
                    }
                    disabled
                    className={styles.grade}
                  />
                  MySQL
                </li>
              </ol>
            </div>
          </div>
          ），如有好的工作或者兼职机会，也欢迎联系。
        </div>
      </div>
      <div className={styles.icon}>
        <div>
          <GithubFilled
            onClick={() => {
              window.open('https://github.com/blog-code');
            }}
          />
        </div>
        <div className={styles.showImg}>
          <WechatFilled />
          {/* 使用相对地址必须使用require，不使用会去找public文件夹里面  */}
          <img
            src={require('./imgs/weixin.jpg')}
            alt=""
            className={styles.imgTwo}
          />
        </div>
        <div className={styles.showImg}>
          <QqCircleFilled />
          <img src={require('./imgs/qq.jpg')} alt="" />
        </div>
        <div className={styles.showEmail}>
          <MailFilled />
          <div className={styles.email}>邮箱：13974412325@163.com</div>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.middleDiv}>
          <div>教程</div>
          <div>{total.article}</div>
        </div>
        <div
          className={styles.middleDiv}
          onClick={() => {
            history.push('article');
          }}
        >
          <div>文章</div>
          <div>{total.article}</div>
        </div>
        <div
          className={styles.middleDiv}
          onClick={() => {
            history.push('article');
          }}
        >
          <div>分类</div>
          <div>{total.classify}</div>
        </div>
        <div
          className={styles.middleDiv}
          onClick={() => {
            history.push('article');
          }}
        >
          <div>标签</div>
          <div>{total.tag}</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
