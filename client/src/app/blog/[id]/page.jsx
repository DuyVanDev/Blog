import Image from "next/image";
import React from "react";
import Comments from "@/components/comments/Comments";
import {
  Avatar,
  Box,
  Container,
  Grid,
  List,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import RecommendPost from "@/components/recommend/Recommend";
import dayjs from "dayjs";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:5167/api/BlogPost/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const generateMetadata = async ({params})=> {
  const data = await getData(params.id);
  return {
    title : data.title,
    description : data.title
  }
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);
  return (
    <div>
      {data ? (
        <Container maxWidth="lg" sx={{marginTop : "32px"}}>
          <Grid container spacing={2} sx={{
              paddingX : {xs : 0, md : "50px"}
            }}>
            <Grid item xs={12} md={12} sm={12} >
              <h1>{data.title}</h1>
              
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  display : "flex",
                  justifyContent : "space-between",
                  alignItems : "center"
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={data.username} src={data.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={<span>{data.username}</span>}
                  secondary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {/* {data.createdAt} */}
                        {dayjs(data.createdAt).format("DD/MM/YYYY ")}
                      </Typography>
                  }
                />
              </List>

              <div
                style={{ marginTop: "12px" }}
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </Grid>
            
          </Grid>

          <Box sx={{
              paddingX : {xs : 0, md : "50px"}
            }}>
            <Comments postSlug={params.id} />
          </Box>
        </Container>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
