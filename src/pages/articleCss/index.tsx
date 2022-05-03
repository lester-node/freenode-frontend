import React, { useState } from 'react'
import hljs from 'highlight.js'
import './github.css'
import marked from 'marked'
import { Row, Col, Input } from 'antd'
import MarkdownNav from 'markdown-navbar'
import gitContent from './git基本操作.md'

function Index () {
  hljs.configure({
    classPrefix: 'hljs-',
    languages: ['CSS', 'HTML', 'JavaScript', 'TypeScript', 'Markdown']
  })

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: (code) => hljs.highlightAuto(code).value,
    gfm: true, // 默认为true。 允许 Git Hub标准的markdown.
    breaks: true // 默认为false。 允许回车换行。该选项要求 gfm 为true。
  })

  return (
    <div>
      <Row gutter={12}>
        <Col span={18}>
          <div
            dangerouslySetInnerHTML={{
              __html: marked(gitContent || '').replace(
                /<pre>/g,
                "<pre class='hljs'>"
              )
            }}
          />
        </Col>
        <Col span={6}>
          <MarkdownNav
            source={gitContent || ''}
            headingTopOffset={15}
            ordered={true}
            updateHashAuto={false}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Index
