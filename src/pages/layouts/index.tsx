import { ConfigProvider, Input, message, Tree } from 'antd'
import styles from './index.less'
import zhCN from 'antd/es/locale/zh_CN'
import React, { createContext, useEffect, useRef, useState } from 'react'
import useRequest from '@ahooksjs/use-request'
import {
  HomeOutlined,
  FileTextOutlined,
  UserSwitchOutlined,
  RocketOutlined,
  ReadOutlined,
  MenuOutlined,
  SearchOutlined
} from '@ant-design/icons'
import { history } from 'umi'
import { useMount, useSize, useThrottleFn } from 'ahooks'
import api from './service'
import { DirectoryTreeProps } from 'antd/lib/tree'
import _ from 'lodash'

export const LayoutContext = createContext({})

export default (props: any) => {
  const ref = useRef<any>()
  const size: any = useSize(ref)
  const [active, setActive] = useState('首页')
  const [menuOpen, setMenuOpen] = useState(false)
  const [treeData, setTreeData] = useState<any>([])
  const [selectInfo, setSelectInfo] = useState<any>()
  const [menu, setMenu] = useState([
    {
      name: '首页',
      icon: <HomeOutlined />,
      onClick: (name: string) => {
        setActive(name)
        window.location.href = `${window.location.origin}/`
      }
    },
    {
      name: '教程',
      icon: <ReadOutlined />,
      onClick: (name: string) => {
        setActive(name)
        window.location.href = `${window.location.origin}/course`
      }
    },
    {
      name: '文章',
      icon: <FileTextOutlined />,
      onClick: (name: string) => {
        setActive(name)
        window.location.href = `${window.location.origin}/article`
      }
    },
    {
      name: '关于',
      icon: <UserSwitchOutlined />,
      onClick: (name: string) => {
        setActive(name)
        window.location.href = `${window.location.origin}/about`
      }
    },
    {
      name: '后台',
      icon: <RocketOutlined />,
      onClick: () => {
        window.open('https://www.freenode.cn:3000')
      }
    }
  ])

  const store = {
    size,
    selectInfo
  }

  const { run: courseTreeRun } = useRequest(() => api.courseTree({}), {
    manual: false,
    onSuccess: (res: any) => {
      if (res.result === 0) {
        setTreeData(res.data)
      } else {
        message.error(res.message || '操作失败')
      }
    },
    onError: (res: any) => {
      message.error(res.message || '操作失败')
    }
  })

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    setSelectInfo(info)
    if (info.node.isLeaf) {
      setMenuOpen(false)
    }
  }

  const { run } = useThrottleFn(
    (flag) => {
      setMenuOpen(flag)
    },
    { wait: 10 }
  )

  useEffect(() => {
    if (size?.width < 768) {
      run(false)
    } else if (size?.width > 768) {
      run(true)
    }
  }, [size])

  useMount(() => {
    const pathname = window.location.pathname
    if (pathname.includes('articleDetail') || pathname.includes('article')) {
      setActive('文章')
    }
    if (pathname.includes('course')) {
      setActive('教程')
    }
    if (pathname.includes('about')) {
      setActive('关于')
    }
  })

  return (
    <div className={styles.layout}>
      <div className={styles.header} ref={ref}>
        <div
          className={styles.phoneLeft}
          onClick={() => {
            setMenuOpen(!menuOpen)
          }}
        >
          <MenuOutlined />
        </div>
        <div
          className={styles.title}
          onClick={() => {
            setActive('首页')
            history.push('/')
          }}
        >
          <img src="./favicon.ico" />
          <div>拾柒的博客</div>
        </div>
        {/* <div className={styles.phoneRight}>
          <SearchOutlined />
        </div> */}
        <div className={styles.right}>
          <Input
            className={styles.search}
            placeholder="输入关键词"
            prefix={<SearchOutlined />}
          />
          <div
            id="menu"
            className={styles.menu}
            style={{ display: menuOpen ? 'flex' : 'none' }}
          >
            <div className={styles.navTop}>
              {menu.map((item: any, index) => {
                return (
                  <div
                    className={`${styles.nav} ${
                      item.name === active ? styles.active : null
                    }`}
                    key={index}
                    onClick={() => {
                      if (size.width < 768) {
                        setMenuOpen(false)
                      }
                      item.onClick && item.onClick(item.name)
                    }}
                  >
                    <span>{item.name}</span>
                    {item.icon}
                  </div>
                )
              })}
            </div>
            {window.location.pathname.includes('course')
            && size?.width < 768
              ? (
                <div className={styles.navBottom}>
                  {treeData.length
                    ? (
                      <Tree.DirectoryTree
                        treeData={treeData}
                        onSelect={onSelect}
                        defaultExpandedKeys={[treeData?.[0]?.key]}
                        defaultSelectedKeys={[treeData?.[0]?.children?.[0]?.key]}
                      />
                    )
                    : null}
                </div>
              )
              : null}
          </div>
        </div>
      </div>
      <div
        className={styles.midder}
        onClick={() => {
          if (size?.width < 768) {
            setMenuOpen(false)
          }
        }}
      >
        <ConfigProvider locale={zhCN}>
          <LayoutContext.Provider value={store}>
            {props.children}
          </LayoutContext.Provider>
        </ConfigProvider>
      </div>
      <div
        className={styles.footer}
        onClick={() => {
          if (size?.width < 768) {
            setMenuOpen(false)
          }
        }}
      >
        <div>Copyright © 2022 freenode.cn</div>
        <a
          className={styles.jumpMiit}
          onClick={() => {
            window.location.href
              = 'https://beian.miit.gov.cn/#/Integrated/index'
          }}
        >
          浙ICP备20011916号-1
        </a>
        <div>创作不易，本站所有内容转载须注明署名和出处。</div>
      </div>
    </div>
  )
}
