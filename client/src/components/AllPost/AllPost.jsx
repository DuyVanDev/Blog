'use client'
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Post from "../Post/Post.jsx";
import { AuthContext } from "../../../context/AuthContext.js";

const AllPost = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5167/api/BlogPost/pagination?page=${currentPage}&pageSize=10`
      );
      const result = await response.json();
      setData(result.data);
      setTotalPages(Math.ceil(result.totalCount / 2)); //
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage]);
  const handleChange = (event, value) => {
    setIsLoading(true);
    setCurrentPage(value);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <div>
      <div>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <div className="flex flex-col gap-6">
            {data.map((post) => <Post post={post} key={post.postID} />)}
          </div>
        )}
      </div>
      <Pagination count={totalPages} page={currentPage} onChange={handleChange} />

    </div>
    
  );
};

export default AllPost;
