"use client"
import React,{useEffect, useState} from 'react';
import { Layout, Menu, Breadcrumb, Dropdown, Icon ,message, Avatar,Space, Table, Tag  } from 'antd';



import "./page.module.css";
import Link from 'next/link';
import DashSidebar from '@/components/DashSidebar/DashSidebar';
import DashPosts from '@/components/Admin/DashPosts/DashPosts';

const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

function Home () {
  const [ data, setData ] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5167/api/BlogPost/pagination?page=${currentPage}&pageSize=6`
      );
      
      const result = await response.json();
      const filterData = result?.data?.filter(item => item?.isApprove == false)
      setData(filterData);
    };
  
    fetchData();
  }, [currentPage]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      <DashPosts data={data}/>
      {/* users */}
    </div>
  )
}

export default Home;