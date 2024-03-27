import { useEffect, useState } from "react";
import DashPosts from "../../components/DashPosts";
import DashSidebar from "../../components/DashSidebar";
import "@/index.css";
import { ConvertTime } from "../../common/ConvertTime";
import Sidebar from "../../components/Sidebar/Sidebar";

function Home() {
  const [dataApprove, setDataApprove] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5167/api/BlogPost/pagination?page=${currentPage}&pageSize=6`
      );

      const result = await response.json();
      const filterData = result?.data?.filter(
        (item) => item?.isApprove == true
      );
      setDataApprove(filterData);
    };

    fetchData();
  }, [currentPage]);
  return (
    <div className="">
       
      
      <div className="container">
        <DashPosts data={dataApprove} />
      </div>
      {/* users */}
    </div>
  );
}

export default Home;
