import styles from "./index.less";
import React from "react";
import {
  EyeOutlined,
  GithubFilled,
  DribbbleSquareOutlined,
  WechatFilled,
} from "@ant-design/icons";
import Tooltip from "antd/es/tooltip";
import { history } from "umi";

const Index = () => {
  const data = [
    {
      title: "案例解析（文章）",
      describe: "在工作中遇到的各种花里胡哨的问题进行记录",
      img: "./images/article.jpg",
      onClick: () => {
        history.push("/article");
      },
    },
    {
      title: "随笔",
      describe: "记录生活中的点点滴滴",
      img: "./images/record.jpg",
      onClick: () => {
        history.push("/article");
      },
    },
    {
      title: "个人描述（关于）",
      describe: "记载此网站前后端所使用的技术和个人总结",
      img: "./images/person.jpg",
      onClick: () => {
        history.push("/about");
      },
    },
    {
      title: "管理系统（后台）",
      describe: "对教程、文章、分类和标签的博客管理系统",
      img: "./images/computer.jpg",
      onClick: () => {
        window.open("https://www.freenode.cn:3000");
      },
    },
  ];

  const jumpArticle = () => {
    history.push("/article");
  };

  return (
    <div className={styles.main}>
      <div className={styles.top} id="top">
        <div>
          <img src="./favicon.ico" />
          拾柒的博客
        </div>
        <div>随心而至、随性而往</div>
        <div>致富!</div>
        <div>
          <div className={styles.read} onClick={jumpArticle}>
            <EyeOutlined />
            <span>阅读文章</span>
          </div>
        </div>
        <div>
          <div className={styles.jump}>
            <Tooltip title="访问作者的github">
              <GithubFilled
                className={styles.icon}
                onClick={() => {
                  window.open("https://github.com/blog-code");
                }}
              />
            </Tooltip>
            <Tooltip title="访问作者的csdn">
              <DribbbleSquareOutlined
                className={styles.icon}
                onClick={() => {
                  window.open("https://blog.csdn.net/xx1233218");
                }}
              />
            </Tooltip>
            <Tooltip title="添加作者的微信号：adnnba">
              <WechatFilled className={styles.icon} />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={styles.general} id="general">
        <div className={styles.title}>博客总览</div>
        <div className={styles.content}>
          {data.map((item, index) => {
            return (
              <div className={styles.block} onClick={item.onClick} key={index}>
                <img src={require(`${item.img}`)} />
                <div className={styles.blockTop}>{item.title}</div>
                <div className={styles.blockBottom}>{item.describe}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
