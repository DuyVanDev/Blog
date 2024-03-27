"use client";
import * as React from "react";
import { Avatar } from "antd";
import { AuthContext } from "../../../context/AuthContext";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import PopupMenu from "../PopupMenu/PopupMenu";

export default function AccountMenu() {
  const { user,authTokens, logoutUser } = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  const content = (
    <div>
     
      <span className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-lightgray">
      <Link href={`profile/?id=${authTokens?.userId}`}>Trang cá nhân</Link>
        {/* <Link>Trang cá nhân</Link> */}
      </span>
      <Link href={"/write"} className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-lightgray">
        <p>Viết bài</p>
      </Link>
      <span className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-lightgray">
        <p>Bài viết đã lưu</p>
      </span>
      <span onClick={logoutUser} className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-lightgray">
        <p>Đăng xuất</p>
      </span>
    </div>
  );
  return (
    <div className="lg:order-2">
      {authTokens ? (
        <div className="flex items-center justify-center gap-4">
          <PopupMenu content={content}>
            {/* <FontAwesomeIcon icon={faBell} /> */}
          </PopupMenu>
          <PopupMenu content={content}>
            <img src="https://res.cloudinary.com/dqpjoki72/image/upload/v1710771648/avatar_xp9qzc.webp" alt="" width={30}/>
            <span>{authTokens.username}</span>
          </PopupMenu>
        </div>
      ) : (
        <div class="flex items-center lg:order-2">
          <a href="#">
            <Link
              href={"/dashboard/login"}
              class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              {" "}
              Đăng nhập
            </Link>
          </a>
          <Link
            href={"/dashboard/register"}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Đăng ký
          </Link>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </div>
   
  );
}
