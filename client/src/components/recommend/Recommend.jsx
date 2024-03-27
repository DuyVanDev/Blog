"use client";
import React from "react";
import Link from "next/link";
import useSWR from "swr";
import dayjs from "dayjs";
const RecommendPost = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:5167/api/BlogPost",
    fetcher
  );
  return (
    // <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
    //   <h2>Phổ biến</h2>
    //   {!isLoading ? (
    //     data.map((item, index) => (
    //       <ListItem alignItems="flex-start" key={index}>
    //         <ListItemAvatar>
    //           <Avatar alt="Remy Sharp" src={item.avatar} />
    //         </ListItemAvatar>
    //         <ListItemText
             
    //           primary={<Link style={{fontWeight : "bold", fontSize : 18, textTransform:"capitalize"}} href={`/blog/${item.postID}`}>{item.title}</Link>}
    //           secondary={
    //             <React.Fragment>
    //               <Typography
    //                 sx={{ display: "inline" }}
    //                 component="span"
    //                 variant="body2"
    //                 color="text.primary"
    //                 fontWeight="bold"
                    
    //               >
    //                 {item.username+ " "}
    //               </Typography>
    //                - {dayjs(data.createdAt).format("DD/MM/YYYY ")}
    //             </React.Fragment>
    //           }
    //         />
    //       </ListItem>
    //     ))
    //   ) : (
    //     <div>Loading...</div>
    //   )}
    // </List>
    <></>
  );
};

export default RecommendPost;
