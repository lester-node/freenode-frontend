import styles from './index.less'
import React, { useEffect, useRef } from 'react'
import moment from 'moment'
import { history } from 'umi'
import {
  ClockCircleOutlined,
  TagOutlined,
  PushpinOutlined
} from '@ant-design/icons'
import { Viewer } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/i18n/zh-cn'
import '../../../../style/toastui-editor-viewer.css'
import { Button } from 'antd'

const Index = (props: { data: any }) => {
  const viewRef = useRef<any>()
  const { data } = props

  useEffect(() => {
    viewRef.current
      ?.getInstance()
      .setMarkdown(data.content.substr(0, 200) + '...')
  }, [])

  const goArticleDetail = () => {
    history.push(`/articleDetail?id=${data.id}`)
  }

  return (
    <div className={styles.article}>
      <div className={styles.top}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.tagClassify}>
          {data.classifyName
            ? (
              <div className={styles.classify}>
                <PushpinOutlined className={styles.icon} />
                {data.classifyName}
              </div>
            )
            : null}
          {data.tagName
            ? data.tagName.split(',').map((name: string, index: number) => {
              return (
                <div className={styles.tag} key={index}>
                  <TagOutlined className={styles.icon} />
                  <div>{name}</div>
                </div>
              )
            })
            : null}
        </div>
      </div>
      <div className={styles.middle}>
        <Viewer ref={viewRef} />
      </div>
      <div className={styles.bottom}>
        <div className={styles.time}>
          <ClockCircleOutlined className={styles.icon} />
          {moment(data.updatedAt).format('YYYY-MM-DD')}
        </div>
        <Button
          className={styles.jumpButton}
          type="primary"
          onClick={goArticleDetail}
        >
          阅读全文
        </Button>
      </div>
    </div>
  )
}

export default Index
