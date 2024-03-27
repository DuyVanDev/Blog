'use client'
import React, { useState } from 'react';
import { Avatar, Popover } from 'antd';

// const content = (
//   <div>
//     <p>User information goes here.</p>
//     <p>User information goes here.</p>
//   </div>
// );

const PopupMenu = ({children, content}) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visibility) => {
    setVisible(visibility);
  };

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      placement="bottomRight"
    >
      {children}
      {/* <Avatar
        src="link-to-avatar-image.jpg"
        alt="User Avatar"
        size={64}
        style={{ cursor: 'pointer' }}
      /> */}
    </Popover>
  );
};

export default PopupMenu;