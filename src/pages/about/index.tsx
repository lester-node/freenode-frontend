import styles from './index.less'
import React, { useEffect, useState } from 'react'
import useRequest from '@ahooksjs/use-request'
import api from './service'
import { message, Pagination, Tooltip } from 'antd'
import config from './config'
import {
  EyeOutlined,
  GithubFilled,
  DribbbleSquareOutlined,
  WechatFilled
} from '@ant-design/icons'

const Index = () => {
  const [total, setTotal] = useState({
    article: 0,
    classify: 0,
    tag: 0
  })

  const { run: articlePageRun } = useRequest(
    () =>
      api.articlePage({
        page: 1,
        rows: 10
      }),
    {
      manual: false,
      onSuccess: (res: any) => {
        if (res.result === 0) {
          setTotal({
            ...total,
            article: res.data.total
          })
        } else {
          message.error(res.message || '操作失败')
        }
      },
      onError: (res: any) => {
        message.error(res.message || '操作失败')
      }
    }
  )

  const { run: classifyPageRun } = useRequest(
    () =>
      api.classifyPage({
        page: 1,
        rows: 10
      }),
    {
      manual: false,
      onSuccess: (res: any) => {
        if (res.result === 0) {
          setTotal({
            ...total,
            classify: res.data.total
          })
        } else {
          message.error(res.message || '操作失败')
        }
      },
      onError: (res: any) => {
        message.error(res.message || '操作失败')
      }
    }
  )

  const { run: tagPageRun } = useRequest(
    () =>
      api.tagPage({
        page: 1,
        rows: 10
      }),
    {
      manual: false,
      onSuccess: (res: any) => {
        if (res.result === 0) {
          setTotal({
            ...total,
            tag: res.data.total
          })
        } else {
          message.error(res.message || '操作失败')
        }
      },
      onError: (res: any) => {
        message.error(res.message || '操作失败')
      }
    }
  )

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.top}>
            <img src="./favicon.ico" />
            拾柒
          </div>
          <div className={styles.describe}>一个很菜的前端工程师</div>
          <div className={styles.classify}>
            <div className={styles.row}>
              文章：<span className={styles.tip}>{total.article}</span>
            </div>
            <div className={styles.row}>
              分类：<span className={styles.tip}>{total.classify}</span>
            </div>
            <div className={styles.row}>
              标签：<span className={styles.tip}>{total.tag}</span>
            </div>
          </div>
          <div className={styles.jump}>
            <div className={styles.content}>
              <Tooltip title="访问作者的github">
                <GithubFilled
                  className={styles.icon}
                  onClick={() => {
                    window.open('https://github.com/blog-code')
                  }}
                />
              </Tooltip>
              <Tooltip title="访问作者的csdn">
                <DribbbleSquareOutlined
                  className={styles.icon}
                  onClick={() => {
                    window.open('https://blog.csdn.net/xx1233218')
                  }}
                />
              </Tooltip>
              <Tooltip title="添加作者的微信号：adnnba">
                <WechatFilled className={styles.icon} />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.wrap}>
            <div className={styles.website}>
              <div className={styles.title}>关于个人</div>
              <div className={styles.content}>
                此网站是我对于前端开发的总结和理解。如有错误的地方，请一定要指出，相互交流开发心得。
              </div>
            </div>
            <div className={styles.skill}>
              <div className={styles.title}>拥有技能</div>
              <div className={styles.content}>
                <div className={styles.row}>
                  <div style={{ background: '#F9EBEA' }}>html</div>
                  <div style={{ background: '#85C1E9' }}>css</div>
                  <div style={{ background: '#FEF9E7' }}>javascript</div>
                  <div style={{ background: '#F8F9F9' }}>typescript</div>
                </div>
                <div className={styles.row}>
                  <div style={{ background: '#85C1E9' }}>react</div>
                  <div style={{ background: '#A3E4D7' }}>vue</div>
                  <div style={{ background: '#D7BDE2' }}>webpack</div>
                  <div style={{ background: '#F9E79F' }}>gulp</div>
                  <div style={{ background: '#F5EEF8' }}>webGL</div>
                  <div style={{ background: '#F8C471' }}>uniapp</div>
                </div>
                <div className={styles.row}>
                  <div style={{ background: '#FEF9E7' }}>h5</div>
                  <div style={{ background: '#D5F5E3' }}>小程序</div>
                  <div style={{ background: '#82E0AA' }}>node</div>
                  <div style={{ background: '#EAD3F0' }}>koa2</div>
                  <div style={{ background: '#F8F9F9' }}>nginx</div>
                  <div style={{ background: '#F5EEF8' }}>docker</div>
                </div>
                <div className={styles.row}>
                  <div style={{ background: '#82E0AA' }}>jenkins</div>
                  <div style={{ background: '#E8F8F5' }}>linux</div>
                  <div style={{ background: '#00CCFF' }}>mysql</div>
                  <div style={{ background: '#90C5F0' }}>git</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
