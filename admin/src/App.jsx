import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import DashPosts from "./components/DashPosts";
import DashSidebar from "./components/DashSidebar";
import { MainRouter } from "./router/MainRouter";
import { ConfigProvider } from "antd";

function App() {
  return (
    <>
      
        <MainRouter />
    </>
  );
}

export default App;
