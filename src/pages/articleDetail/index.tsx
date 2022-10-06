import styles from "./index.less";
import React, { useEffect, useRef, useState } from "react";
import useRequest from "@ahooksjs/use-request";
import api from "./service";
import { message } from "antd";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/i18n/zh-cn";
import "../../style/toastui-editor-viewer.css";
import _ from "lodash";
import {
  HomeOutlined,
  ClockCircleOutlined,
  PushpinOutlined,
  TagOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { history } from "umi";

const Index = (props: any) => {
  const viewRef = useRef<any>();
  const query = props.location.query;
  const [articleData, setArticleData] = useState({
    title: "",
    classifyName: "",
    tagName: "",
    updatedAt: "",
    content: "",
  });

  useEffect(() => {
    if (query?.id) {
      articleSelectOneRun({ id: query?.id });
    }
  }, [query.id]);

  const { run: articleSelectOneRun } = useRequest(
    (obj) => api.articleSelectOne(obj),
    {
      manual: true,
      onSuccess: (res: { result: number; data: any; message: string }) => {
        if (res.result === 0) {
          viewRef.current?.getInstance().setMarkdown(res.data.content);
          setArticleData(res.data);
        } else {
          message.error(res.message || "操作失败");
        }
      },
      onError: (res: { message: string }) => {
        message.error(res.message || "操作失败");
      },
    }
  );

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.title}>
          <div
            className={styles.back}
            onClick={() => {
              history.push("/article");
            }}
          >
            <HomeOutlined className={styles.icon} />
            返回文章列表
          </div>
          <div className={styles.middle}>{articleData.title}</div>
          <div className={styles.right}>
            {articleData.classifyName ? (
              <div className={styles.classify}>
                <PushpinOutlined className={styles.icon} />
                {articleData.classifyName}
              </div>
            ) : null}
            {articleData.tagName
              ? articleData.tagName
                  .split(",")
                  .map((name: string, index: number) => {
                    return (
                      <div className={styles.tag} key={index}>
                        <TagOutlined className={styles.icon} />
                        <div>{name}</div>
                      </div>
                    );
                  })
              : null}
            <div className={styles.time}>
              <ClockCircleOutlined className={styles.icon} />
              {moment(articleData.updatedAt).format("YYYY-MM-DD")}
            </div>
          </div>
        </div>
        <div className={styles.articleContent}>
          <Viewer ref={viewRef} />
        </div>
      </div>
    </div>
  );
};

export default Index;
