import { Layout } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      className="h-full left-0  fixed  z-[999] bg-white border-2 border-graysecond max-lg:hidden pt-4"
      trigger={null}
      collapsible
      collapsed={collapsed}
      mode="light"
    >
      <Link
        to={"/"}
        className={`flex items-center gap-2 p-3  cursor-pointer  ${
          "/ca-nhan/danh-sach-dich-vu" && "bg-lightblue  text-black"
        }`}
      >
        <img
          src="https://pcrender.com/static/media/nvidia.d8464b510ab64c1b32e5df090967298b.svg"
          width={30}
        />
        <span className="text-md font-semibold">Đã duyệt</span>
      </Link>

      <Link
        to={"/bai-viet-chua-duyet"}
        className={`flex items-center gap-2 p-3  cursor-pointer  ${
          "/ca-nhan/thay-doi-thong-tin" && "bg-lightblue "
        }`}
      >
        <img
          src="https://pcrender.com/static/media/nvidia.d8464b510ab64c1b32e5df090967298b.svg"
          width={30}
        />
        <span className="text-md font-semibold">Chưa duyệt</span>
      </Link>

      <Link
        to={"/bai-viet-chua-duyet"}
        className={`flex items-center gap-2 p-3  cursor-pointer  ${
          "/ca-nhan/thay-doi-thong-tin" && "bg-lightblue "
        }`}
      >
        <img
          src="https://pcrender.com/static/media/nvidia.d8464b510ab64c1b32e5df090967298b.svg"
          width={30}
        />
        <span className="text-md font-semibold">Người dùng</span>
      </Link>
    </Sider>
  );
};

export default Sidebar;
