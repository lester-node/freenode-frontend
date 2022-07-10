import {} from 'antd';
import styles from './index.less';
import React, { useState } from 'react';
import {
  CaretDownFilled,
  AlignLeftOutlined,
  GithubFilled,
  WechatFilled,
  QqCircleFilled,
} from '@ant-design/icons';
import { history } from 'umi';

export default () => {
  const menu = [
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
      name: '错题集',
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
      name: '作品',
    },
    {
      name: '关于',
    },
  ];

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.title}>高效率开发学习</div>
        <div className={styles.menu}>
          {menu.map((item) => {
            return (
              <div className={styles.nav}>
                <span>{item.name}</span>
                {item.name == '关于' || item.name == '作品' ? (
                  <AlignLeftOutlined />
                ) : (
                  <CaretDownFilled />
                )}
                <div className={styles.dropDown}>
                  {item.children &&
                    item.children.map((itemA) => {
                      return <div>{itemA.name}</div>;
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.font}>
          <div>Hello！欢迎观看我的小破站！</div>
          <div>此网站是我对于前端开发的总结和理解，记录下我的奇思妙想。</div>
          <div>如有错误的地方，请一定要指出，相互交流开发心得。</div>
          <div>
            目前两年前端工作经验（<a>个人简历</a>
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
        </div>
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
