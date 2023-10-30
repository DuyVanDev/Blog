"use client";
import React, { useContext, useState } from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import MyPost from "@/components/MyPost/MyPost";
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
export const metadata = {
  title: "T-BLOG",
  description: "T-BLOG tin tức cực shock",
};
const Profile = () => {
  const searchParams = useSearchParams();
  const userParams = searchParams.get("id");

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:5167/api/BlogPost/post/?userId=${userParams}`,
    fetcher
  );

  return (
    <Root>
      <Container maxWidth="lg">
        <Link href={"/write"}><Button variant="outlined">Viết bài</Button></Link>
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
            data?.map((post) => (
              <MyPost post={post} userParams={userParams} key={post.postID} />
            ))
          )}
        </Box>
      </Container>
    </Root>
  );
};

export default Profile;
