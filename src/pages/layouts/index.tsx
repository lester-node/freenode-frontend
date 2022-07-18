import { ConfigProvider } from 'antd';
import styles from './index.less';
import zhCN from 'antd/es/locale/zh_CN';
import React, { useState } from 'react';
import {
  CaretDownFilled,
  AlignLeftOutlined,
} from '@ant-design/icons';
import { history } from 'umi';

export default (props: any) => {
  const [active, setActive] = useState('文章');
  const menu = [
    {
      name: '首页',
      jump: '',
    },
    {
      name: '笔记',
      children: [
        {
          name: 'CSS',
        },
        {
          name: 'JS',
        },
      ],
    },
    {
      name: '文章',
      jump: 'article',
    },
    {
      name: '关于',
    },
    {
      name: '后台',
    },
  ];

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div
          className={styles.title}
          onClick={() => {
            setActive('首页');
            history.push('/');
          }}
        >
          高效率开发学习
        </div>
        <div className={styles.menu}>
          {menu.map((item, index) => {
            if (item.children) {
              return (
                <div className={styles.nav} key={index}>
                  <span>{item.name}</span>
                  <CaretDownFilled />
                  <div className={styles.dropDown}>
                    {item.children &&
                      item.children.map((itemA: any, indexA) => {
                        return (
                          <div
                            key={indexA}
                            onClick={() => {
                              setActive(itemA.name);
                              //history.push不会刷新页面，只会刷新props.children部分，但window.location.href会刷新页面
                              history.push(itemA.jump || '');
                            }}
                            className={`${
                              itemA.name == active ? styles.active : null
                            }`}
                          >
                            {itemA.name}
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className={`${styles.nav} ${
                    item.name == active ? styles.active : null
                  }`}
                  key={index}
                  onClick={() => {
                    setActive(item.name);
                    history.push(item.jump || '');
                  }}
                >
                  <span>{item.name}</span>
                  <AlignLeftOutlined />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className={styles.main}>
        <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider>
      </div>
      <div className={styles.footer}>
        <div>Copyright © 2022 高效率开发学习</div>
        <a
          className={styles.jumpMiit}
          onClick={() => {
            window.location.href =
              'https://beian.miit.gov.cn/#/Integrated/index';
          }}
        >
          浙ICP备20011916号-1
        </a>
        <div>
          创作不易，本站所有内容转载须注明署名和出处，且不可用于商业用途。
        </div>
      </div>
    </div>
  );
};
