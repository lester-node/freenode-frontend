import {} from 'antd'
import styles from './index.less'
import React, { useState } from 'react'
import { history } from 'umi'

export default () => {
  const menu = [
    {
      name: '笔记',
      children: [
        {
          name: 'CSS'
        },
        {
          name: 'JS'
        }
      ]
    },
    {
      name: '错题集',
      children: [
        {
          name: 'CSS'
        },
        {
          name: 'JS'
        }
      ]
    },
    {
      name: '作品'
    },
    {
      name: '关于'
    }
  ]

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.title}>高效率开发学习</div>
        <div className={styles.menu}></div>
      </div>
      <div className={styles.main}></div>
      <div className={styles.footer}></div>
    </div>
  )
}
