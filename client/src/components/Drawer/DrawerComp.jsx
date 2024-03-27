"use client";
import React, { useState } from "react";
import Comments from "../comments/Comments";
import { Button, Drawer } from "antd";

const DrawerComp = ({ open, showDrawer, onClose, postId }) => {
  return (
    <>
      {/* <Drawer
        title="Bình luận "
        width={520}
        closable={false}
        onClose={onClose}
        open={open}
      >
        <Comments postId={postId}/>
      </Drawer> */}
    </>
  );
};

export default DrawerComp;
