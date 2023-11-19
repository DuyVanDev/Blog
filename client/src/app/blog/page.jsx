"use client";
import React, { useContext, useEffect, useState } from "react";
import Post from "@/components/Post/Post";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { CircularProgress, Pagination, PaginationItem } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {
    padding: "0 200px",
    marginTop: "30px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "0 200px",
    marginTop: "30px",
  },
}));

const Blog = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5167/api/BlogPost/pagination?page=${currentPage}&pageSize=2`
      );
      const result = await response.json();
      setData(result.data);
      setTotalPages(Math.ceil(result.totalCount / 2)); // Adjust based on your pageSize
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage]);
  const handleChange = (event, value) => {
    setIsLoading(true)
    setCurrentPage(value);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };
  console.log(currentPage)

  return (
    <Root>
      <Container maxWidth="lg">
        <Box maxWidth="lg" minHeight={"70vh"}>
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
            data.map((post) => <Post post={post} key={post.postID} />)
          )}
        </Box>
        <Box my={2} sx={{display : "flex", justifyContent : "center", alignItems : "center"}}>
        <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
        </Box>
      </Container>
    </Root>
  );
};

export default Blog;
