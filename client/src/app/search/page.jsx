"use client";
import React, { useState } from "react";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import Post from "@/components/Post/Post";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { styled } from "@mui/material/styles";

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
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Search = () => {
  const search = useSearchParams();
  const searchQuery = search.get("q");
  const { data, isLoading, error } = useSWR(
    `http://localhost:5167/search?q=${searchQuery}`,
    fetcher
  );

  console.log(data);
  return (
    <Root>
      <Container maxWidth="lg">
        <Box maxWidth="lg" minHeight={"80vh"}>
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
      </Container>
    </Root>
  );
};

export default Search;
