import styles from './index.less';
import React, { useEffect, useState } from 'react';
import useRequest from '@ahooksjs/use-request';
import { Tabs } from 'antd';

const Index = () => {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.div}>-----------11111---------------</div>
        </div>
        <div className={styles.right}>
          <div className={styles.div}>-----------2222---------------</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
