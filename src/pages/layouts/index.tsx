import { Layout, Menu, MenuProps } from 'antd'
import {
  HeartOutlined,
  DashboardOutlined,
  BugOutlined,
  DesktopOutlined,
  CloudOutlined
} from '@ant-design/icons'
import styles from './index.less'
import React, { useState } from 'react'
import { history } from 'umi'
const { Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number];

function getItem (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('前言', '/', <HeartOutlined />),
  getItem('HTML', 'HTML', <BugOutlined />, [
    getItem('Option 1', '/articleHtml'),
    getItem('Option 2', '/articleCss'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4')
  ]),
  getItem('CSS', 'CSS', <DashboardOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6')
  ]),
  getItem('JS', 'JS', <DesktopOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12')
  ])
]

const menuSelect = (val: any) => {
  history.push(val.key)
}

const rootSubmenuKeys = ['HTML', 'CSS', 'JS']

const Index = (props: any) => {
  const [collapsed, setCollapsed] = useState(false)
  const [openKeys, setOpenKeys] = useState<Array<string>>([])

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <Layout className={styles.layout}>
      <Sider
        className={styles.sider}
        collapsible
        theme="light"
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        {collapsed
          ? (
            <CloudOutlined className={styles.logoSmall} />
          )
          : (
            <div className={styles.logoBig}>高效率开发学习</div>
          )}
        <Menu
          mode="inline"
          openKeys={openKeys}
          theme="light"
          onOpenChange={onOpenChange}
          items={items}
          onSelect={menuSelect}
          defaultSelectedKeys={['/']}
        />
      </Sider>
      <Layout>
        <Content className={styles.content}>{props.children}</Content>
        <Footer className={styles.footer}>
          <a
            target="_blank"
            href="https://beian.miit.gov.cn/#/Integrated/index"
            rel="noreferrer"
          >
            浙ICP备20011916号-1
          </a>
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Index
