import styles from './index.less'
import React, { useContext, useEffect, useRef, useState } from 'react'
import useRequest from '@ahooksjs/use-request'
import { message, Tree } from 'antd'
import type { DirectoryTreeProps } from 'antd/es/tree'
import api from './service'
import { Viewer } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/i18n/zh-cn'
import '../../style/toastui-editor-viewer.css'
import _ from 'lodash'
import { LayoutContext } from '../layouts/index'

const Index = () => {
  const { selectInfo } = useContext<any>(LayoutContext)
  const viewRef = useRef<any>()
  const [treeData, setTreeData] = useState<any>([])

  const { run: courseTreeRun } = useRequest(() => api.courseTree({}), {
    manual: false,
    onSuccess: (res: any) => {
      if (res.result === 0) {
        setTreeData(res.data)
        courseArticleSelectOneRun(res.data?.[0]?.children?.[0]?.key)
      } else {
        message.error(res.message || '操作失败')
      }
    },
    onError: (res: any) => {
      message.error(res.message || '操作失败')
    }
  })

  const { run: courseArticleSelectOneRun } = useRequest(
    (id) => api.courseArticleSelectOne({ id }),
    {
      manual: true,
      onSuccess: (res: any) => {
        if (res.result === 0) {
          viewRef.current.getInstance().setMarkdown(res.data.content)
        } else {
          message.error(res.message || '操作失败')
        }
      },
      onError: (res: any) => {
        message.error(res.message || '操作失败')
      }
    }
  )

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    if (info.node.isLeaf) {
      courseArticleSelectOneRun(info.node.key)
    }
  }

  useEffect(() => {
    if (selectInfo) {
      onSelect([], selectInfo)
    }
  }, [selectInfo])

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.left} id="leftScroll">
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
        <div className={styles.right}>
          <div className={styles.articleContent}>
            <Viewer ref={viewRef} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
