import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";
const getData = async () => {
  const res = await fetch("http://localhost:5167/api/BlogPost?limit=6", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};
const RecentlyPost = async () => {
  const data = await getData();
  return (
    <Box maxWidth={"lg"}>
      <Typography variant="h5" fontWeight={"bold"} pb={2}>
        Mới
      </Typography>

      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.postID}>
            <Link href={`blog/${item.postID}`}>
              <Card>
                <CardMedia
                  sx={{ padding: "8px" }}
                  component="img"
                  height="240"
                  image={item.image}
                  alt="Anh"
                />
                <CardContent
                  sx={{
                    height: "110px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    display: "-webkit-box",
                  }}
                >
                  <Typography fontSize={18} variant="h6" color="text.primary">
                    {item.title}
                  </Typography>
                </CardContent>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "8px 16px",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "red",
                      height: 30,
                      width: 30,
                      marginRight: "8px",
                    }}
                    aria-label="recipe"
                  >
                    {item.username.slice(0, 1).toUpperCase()}
                  </Avatar>
                  <Typography
                    sx={{
                      color: "#97989F",
                      fontSize: "13px",
                      fontWeight: "600",
                      flexGrow: 2,
                    }}
                  >
                    {item.username}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#97989F",
                      fontSize: "13px",
                      flexGrow: 2,
                    }}
                  >
                    {dayjs(item.createdAt).format("DD/MM/YYYY")}
                  </Typography>
                </Box>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Link href={"/blog"}>
          <Button variant="outlined">Xem tất cả</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default RecentlyPost;
