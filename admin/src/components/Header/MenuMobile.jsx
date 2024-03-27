import { CloseOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const MenuMobile = ({ open, onClose, innerWidth }) => {
  const location = useLocation();
  const pathname = location.pathname;
 
  const renderMenuMobile = () => {
    return (
      <div>
        <div className="">
          <div className="bg-white p-2 flex  gap-2 ">
            <img src={"a"} alt="logo" className="max-w-[160px]" />
          </div>

          <CloseOutlined
            style={{ fontSize: "20px" }}
            className="p-2 absolute top-[10px] right-[10px]"
            onClick={() => onClose(false)}
          />
        </div>
        <Link
          onClick={() => onClose(false)}
          to={"/ca-nhan/danh-sach-dich-vu"}
          className={`flex items-center gap-2 p-3  cursor-pointer  ${
            pathname == "/ca-nhan/danh-sach-dich-vu" &&
            "bg-lightblue  text-white"
          }`}
        >
          <img
            src="https://pcrender.com/static/media/nvidia.d8464b510ab64c1b32e5df090967298b.svg"
            width={30}
          />
          <span className="text-md font-semibold">Quản lý dịch vụ</span>
        </Link>

        <Link
          onClick={() => onClose(false)}
          to={"/ca-nhan/danh-sach-hop-dong"}
          className={`flex items-center gap-2 p-3  cursor-pointer  ${
            pathname == "/ca-nhan/danh-sach-hop-dong" &&
            "bg-lightblue text-white"
          }`}
        >
          <img
            src="https://pcrender.com/static/media/nvidia.d8464b510ab64c1b32e5df090967298b.svg"
            width={30}
          />
          <span className="text-md font-semibold">Quản lý hợp đồng</span>
        </Link>

        <Link
          onClick={() => onClose(false)}
          to={"/ca-nhan/thay-doi-thong-tin"}
          className={`flex items-center gap-2 p-3  cursor-pointer  ${
            pathname == "/ca-nhan/thay-doi-thong-tin" &&
            "bg-lightblue text-white"
          }`}
        >
          <img
            src="https://pcrender.com/static/media/nvidia.d8464b510ab64c1b32e5df090967298b.svg"
            width={30}
          />
          <span className="text-md font-semibold">Thay đổi thông tin</span>
        </Link>

        <div className="flex items-center gap-2 p-3  cursor-pointer  mt-4">
          <LogoutOutlined />
          <span className="font-bold" >
            Đăng xuất
          </span>
        </div>
      </div>
    );
  };
  return (
    <div>
      {/* {!toggleHeader&& ( */}
      <div className="bg-white p-2 flex items-center gap-2 justify-center text-text">
        <img src="a" alt="logo" className="max-w-[160px]" />
      </div>
      {/* )} */}
      <div className="bg-primary flex items-center justify-between p-3 shadow-2xl ">
        <MenuOutlined
          // onClick={() => onClose(!open)}
          className="text-[30px] text-white"
        />
      </div>
      <Drawer
        placement="left"
        className=""
        open={open}
        closable={false}
        width={innerWidth <= 400 ? "100%" : "80%"}
        onClose={() => onClose(false)}
      >
        {renderMenuMobile()}
      </Drawer>
    </div>
  );
};

export default MenuMobile;
