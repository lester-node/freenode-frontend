import React, { useState } from 'react'
import './github.css'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Row, Col, Input } from 'antd'
import MarkdownNav from 'markdown-navbar'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import gitContent from './git基本操作.md'

function Index () {
  return (
    <div>
      <Row gutter={12}>
        <Col span={18}>
          <ReactMarkdown
            // children={gitContent}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code ({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match
                  ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={dark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  )
                  : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
              }
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
