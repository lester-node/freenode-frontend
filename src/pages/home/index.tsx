import styles from "./index.less";
import React, { useContext, useEffect } from "react";
import { LayoutContext } from "../layouts/index";

const Index = () => {
  const { size } = useContext<any>(LayoutContext);

  useEffect(() => {
    if (size && size.width < 1000) {
      const topDiv: any = document.getElementById("top");
      const bottomDiv: any = document.getElementById("bottom");
      topDiv.style.width = `${size.width - 40}px`;
      bottomDiv.style.width = `${size.width - 40}px`;
    }
  }, [size]);

  return (
    <div className={styles.main}>
      <div className={styles.top} id="top">
        <div>
          <img src="./favicon.ico" />
          拾柒的博客
        </div>
        <div>随心而至、随性而往</div>
        <div>暴富!</div>
      </div>
      <div className={styles.bottom} id="bottom">
        <div className={styles.block}>
          <div
            className={styles.blockTop}
            onClick={() => {
              window.location.href = `${window.location.origin}/course`;
            }}
          >
            知识总结（教程）
          </div>
          <div className={styles.blockBottom}>
            对html、css、js、react等等知识点进行梳理整理
          </div>
        </div>
        <div className={styles.block}>
          <div
            className={styles.blockTop}
            onClick={() => {
              window.location.href = `${window.location.origin}/article`;
            }}
          >
            案例解析（文章）
          </div>
          <div className={styles.blockBottom}>
            在工作中遇到的各种花里胡哨的问题进行记录
          </div>
        </div>
        <div className={styles.block}>
          <div
            className={styles.blockTop}
            onClick={() => {
              window.location.href = `${window.location.origin}/about`;
            }}
          >
            个人描述（关于）
          </div>
          <div className={styles.blockBottom}>
            记载此网站前后端所使用的技术和个人总结
          </div>
        </div>
        <div className={styles.block}>
          <div
            className={styles.blockTop}
            onClick={() => {
              window.open("https://www.freenode.cn:3000");
            }}
          >
            管理系统（后台）
          </div>
          <div className={styles.blockBottom}>
            对教程、文章、分类和标签的博客管理系统
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
