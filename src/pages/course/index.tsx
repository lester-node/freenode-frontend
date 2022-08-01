import styles from './index.less'; 
import React, { useEffect, useState } from 'react';
import useRequest from '@ahooksjs/use-request';
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

const Index = () => {
  const scrollChange = () => {
    // 变量 scrollHeight 是滚动条的总高度
    let scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    // 变量 windowHeight 是可视区的高度
    let windowHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    // 变量scrollTop为当前页面的滚动条纵坐标位置
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    // 滚动条到底部得距离 = 滚动条的总高度 - 可视区的高度 - 当前页面的滚动条纵坐标位置
    var scrollBottom = scrollHeight - windowHeight - scrollTop;
    if (scrollBottom < 105) {
      document.getElementById('leftScroll').style.bottom =
        105 - scrollBottom + 'px';
    } else {
      document.getElementById('leftScroll').style.bottom = 0;
    }
  };

  useEffect(() => {
    // 滚动条滚动时触发
    window.addEventListener('scroll', scrollChange, true);
    return () => {
      window.removeEventListener('scroll', scrollChange, false);
    };
  }, []);

  const treeData: DataNode[] = [
    {
      title: 'parent 0',
      key: '0-0',
      children: [
        { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
        { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
      ],
    },
    {
      title: 'parent 1',
      key: '0-1',
      children: [
        { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
        { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
      ],
    },
    {
      title: 'parent 2',
      key: '0-2',
      children: [
        { title: 'leaf 2-0', key: '0-2-0', isLeaf: true },
        { title: 'leaf 2-1', key: '0-2-1', isLeaf: true },
      ],
    },
    {
      title: 'parent 3',
      key: '0-3',
      children: [
        { title: 'leaf 3-0', key: '0-3-0', isLeaf: true },
        { title: 'leaf 3-1', key: '0-3-1', isLeaf: true },
      ],
    },
    {
      title: 'parent 4',
      key: '0-4',
      children: [
        { title: 'leaf 4-0', key: '0-4-0', isLeaf: true },
        { title: 'leaf 4-1', key: '0-4-1', isLeaf: true },
      ],
    },
    {
      title: 'parent 5',
      key: '0-5',
      children: [
        { title: 'leaf 5-0', key: '0-5-0', isLeaf: true },
        { title: 'leaf 5-1', key: '0-5-1', isLeaf: true },
      ],
    },
    {
      title: 'parent 6',
      key: '0-6',
      children: [
        { title: '1111111111111111111111111111111111111111111111112', key: '0-6-0', isLeaf: true },
        { title: 'leaf 6-1', key: '0-6-1', isLeaf: true },
      ],
    },
    {
      title: 'parent 7',
      key: '0-7',
      children: [
        { title: 'leaf 7-0', key: '0-7-0', isLeaf: true },
        { title: 'leaf 7-1', key: '0-7-1', isLeaf: true },
      ],
    },
  ];

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.left} id="leftScroll">
          <Tree.DirectoryTree
            treeData={treeData}
            onSelect={onSelect}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.div}>-----------2222---------------</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
