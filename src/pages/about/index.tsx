import styles from './index.less';
import React, { useEffect, useState } from 'react';
import useRequest from '@ahooksjs/use-request';
import { Tabs } from 'antd';

const Index = () => {
  return (
    <div>
      <div className={styles.main}>
        <Tabs defaultActiveKey="1" onChange={() => {}}>
          <Tabs.TabPane tab="关于我" key="1">
            <div></div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="关于本站" key="2">
            <div></div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
