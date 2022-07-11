import styles from './index.less';
import React from 'react';
import {
  CaretDownFilled,
  AlignLeftOutlined,
  GithubFilled,
  WechatFilled,
  QqCircleFilled,
} from '@ant-design/icons';

const Index = () => {
  return (
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
  );
};

export default Index;
