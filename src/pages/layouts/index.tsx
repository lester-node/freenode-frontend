import { ConfigProvider } from 'antd';
import styles from './index.less';
import zhCN from 'antd/es/locale/zh_CN';
import React, { useRef, useState } from 'react';
import Icon, {
  CaretDownFilled,
  HomeOutlined,
  FileTextOutlined,
  UserSwitchOutlined,
  RocketOutlined,
  ReadOutlined,
  MenuOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import { useMount, useSize } from 'ahooks';

export default (props: any) => {
  const ref = useRef();
  const size: any = useSize(ref);
  const [active, setActive] = useState('首页');
  const [menuOpen, setMenuOpen] = useState(true);

  if (size?.width < 768) {
    // document.getElementById('menu').style.display = 'none';
  } else if (size?.width > 768) {
    document.getElementById('menu').style.display = 'flex';
  }

  useMount(() => {
    let pathname = window.location.pathname;
    if (pathname.includes('articleDetail') || pathname.includes('article')) {
      setActive('文章');
    }
    if (pathname.includes('course')) {
      setActive('教程');
    }
  });

  const menu = [
    {
      name: '首页',
      icon: <HomeOutlined />,
      onClick: (name: string) => {
        setActive(name);
        //history.push不会刷新页面，只会刷新props.children部分，但window.location.href会刷新页面
        history.push('/');
      },
    },
    {
      name: '教程',
      icon: <ReadOutlined />,
      onClick: (name: string) => {
        setActive(name);
        history.push('course');
      },
    },
    {
      name: '文章',
      icon: <FileTextOutlined />,
      onClick: (name: string) => {
        setActive(name);
        history.push('article');
      },
    },
    // {
    //   name: '其他',
    //   icon: <CaretDownFilled />,
    //   children: [
    //     {
    //       name: '其他1',
    //     },
    //     {
    //       name: '其他2',
    //     },
    //   ],
    // },
    // {
    //   name: '关于',
    //   icon: <UserSwitchOutlined />,
    //   onClick: (name: string) => {
    //     setActive(name);
    //     history.push('about');
    //   },
    // },
    {
      name: '后台',
      icon: <RocketOutlined />,
      onClick: () => {
        window.open('http://www.freenode.cn:3000');
      },
    },
  ];

  return (
    <div className={styles.layout}>
      <div className={styles.header} ref={ref}>
        <div
          className={styles.phoneLeft}
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <MenuOutlined />
        </div>
        <div
          className={styles.title}
          onClick={() => {
            setActive('首页');
            history.push('/');
          }}
        >
          <img src="./favicon.ico" />
          <div>高效率开发学习</div>
        </div>
        <div className={styles.phoneRight}>
          <SearchOutlined />
        </div>
        <div
          id="menu"
          className={styles.menu}
          style={{ display: menuOpen ? 'flex' : 'none' }}
        >
          {menu.map((item: any, index) => {
            if (item.children) {
              return (
                <div className={styles.nav} key={index}>
                  <span>{item.name}</span>
                  {item.icon}
                  <div className={styles.dropDown}>
                    {item.children &&
                      item.children.map((itemA: any, indexA: number) => {
                        return (
                          <div
                            key={indexA}
                            onClick={() => {
                              itemA.onClick && itemA.onClick(itemA.name);
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
                    item.onClick && item.onClick(item.name);
                  }}
                >
                  <span>{item.name}</span>
                  {item.icon}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className={styles.midder} onClick={() => {
        if (size?.width < 768){
          setMenuOpen(false)
        }
      }}>
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
