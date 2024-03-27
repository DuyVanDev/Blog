"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Image from "next/image";
import useAxios from "@/utils/useAxios";
import { AuthContext } from "../../../context/AuthContext";

import dayjs from "dayjs";
import { UserOutlined } from "@ant-design/icons";
import { CalculateTimeAgo } from "@/common/CalculateTimeAgo";
import Markdown from "markdown-to-jsx";
import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Popover } from "antd";

function SimpleDialog(props) {
  const { onClose, open, postId } = props;
  const handleClose = () => {};

  return (
    <></>
    // <Dialog
    //   style={{
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    //   onClose={onClose}
    //   open={open}
    // >
    //   <DialogTitle>Set backup account</DialogTitle>
    //   <List sx={{ pt: 0 }}>
    //     <Link href={`/edit?id=${postId}`}>
    //       <ListItem disableGutters>
    //         <ListItemButton autoFocus>
    //           <ListItemAvatar>
    //             <Avatar>{/* <AddIcon /> */}</Avatar>
    //           </ListItemAvatar>
    //           <ListItemText primary="Edit" />
    //         </ListItemButton>
    //       </ListItem>
    //     </Link>
    //     <ListItem disableGutters>
    //       <ListItemButton autoFocus>
    //         <ListItemAvatar>
    //           <Avatar>{/* <AddIcon /> */}</Avatar>
    //         </ListItemAvatar>
    //         <ListItemText primary="Delete" />
    //       </ListItemButton>
    //     </ListItem>
    //   </List>
    // </Dialog>
  );
}

const MyPost = ({ post, index }) => {
  const { authTokens } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const api = useAxios();
  const handleDelete = async (id) => {
    const options = {
      method: "delete",

      url: `http://localhost:5167/api/BlogPost/${id}`,
    };
    const { data } = await api(options);
  }

  const content = (
    <div>
      <span className="flex flex-col items-center gap-4 px-4 py-3 cursor-pointer hover:bg-lightgray">
        <Link href={`/edit?id=${post.postID}`}>
          <p>Chỉnh sửa</p>
        </Link>
        <span onClick={() => handleDelete(post?.postID)}><p>Xóa</p></span>
      </span>
    </div>
  );

  const date = new Date();
  return (
    <div
      key={post?.postID}
      className={`relative w-full flex flex-col gap-8 items-center rounded 
     md:flex-row
        `}
      //  ${index / 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
    >
      <Link
        href={`/blog/${post?.postID}`}
        className="w-full h-auto md:h-64 md:w-2/4 "
      >
        <img
          src={post?.image}
          alt={post?.title}
          className="object-cover w-full h-full rounded"
        />
      </Link>

      <div className="w-full md:w-2/4 flex flex-col gap-3">
        <div className="flex gap-2">
          <span className="text-sm text-gray-600">
            {CalculateTimeAgo(post?.createdAt)}
          </span>
          <span className={`text-sm text-${post?.color}-600 font-semibold`}>
            {post?.categoryName}
          </span>
        </div>

        <h6 className="text-xl 2xl:text-3xl font-semibold ">{post?.title}</h6>

        <div className="flex-1 overflow-hidden text-gray-600  text-sm text-justify">
          <Markdown options={{ wrapper: "article" }}>
            {post?.content?.slice(0, 250) + "..."}
          </Markdown>
        </div>

        <Link href={`/`} className="flex items-center gap-2 ">
          <span className="underline">Đọc thêm</span> <AiOutlineArrowRight />
        </Link>
      </div>
      <div className="absolute top-0 right-0">
        <Popover
          content={content}
          placement="bottomLeft"
          trigger="click"
        >
          <HiOutlineDotsVertical />
        </Popover>
      </div>
    </div>

    // <Container
    //   style={{
    //     position: "relative",
    //   }}
    // >
    //   <Link href={`blog/${post.postID}`}>
    //     <Grid
    //       container
    //       spacing={3}
    //       mb={6}
    //       mt={2}
    //       style={{
    //         position: "relative",
    //         display: "flex",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <Grid xs={12} md={4}>
    //         <Box
    //           sx={{
    //             position: "relative",
    //             height: "150px",
    //             width: "100%",
    //             minWidth: "250px",
    //           }}
    //         >
    //           <Image
    //             src={post.image}
    //             alt=""
    //             fill
    //             priority
    //             style={{
    //               objectFit: "cover",
    //               backgroundPosition: "center",
    //               boxShadow: "5px 10px",
    //             }}
    //           />
    //         </Box>
    //       </Grid>

    //       <Grid xs={12} md={8} pl={{xs : 0, md : 2}}>
    //         <Typography variant="subtitle" component="h3" mb={1}>
    //           {post.title}
    //         </Typography>
    //         <Box
    //           sx={{
    //             display: "flex",
    //             marginBottom: "8px",
    //             justifyContent: "space-between",
    //             alignItems: "center",
    //           }}
    //         >
    //           <Typography
    //             xs={12}
    //             color="textSecondary"
    //             fontWeight={"bold"}
    //             fontSize={11}
    //             variant="subtitle"
    //             component="p"
    //           >
    //             @{post.username}
    //           </Typography>
    //           <div>
    //             <Typography
    //               xs={12}
    //               color="textSecondary"
    //               fontSize={9}
    //               fontWeight={600}
    //               variant="subtitle"
    //               component="p"
    //             >
    //               {dayjs(post.createdAt).format("DD/MM/YYYY ")}
    //             </Typography>
    //           </div>
    //         </Box>
    //         <Typography
    //           color="textPrimary"
    //           fontSize={13}
    //           variant="string"
    //           component="p"
    //         >
    //           <div
    //             style={{ lineHeight: 1.6 }}
    //             dangerouslySetInnerHTML={{
    //               __html: post.content.slice(0, 250),
    //             }}
    //           />
    //         </Typography>
    //       </Grid>
    //     </Grid>
    //   </Link>

    //   <Box
    //     onClick={handleClickOpen}
    //     style={{ position: "absolute", top: 0, right: 0 }}
    //   >
    //     <MoreVertIcon style={{ cursor: "pointer" }} />
    //   </Box>
    //   <SimpleDialog open={open} postId={post.postID} onClose={handleClose} />
    // </Container>

    // <Container sx={{marginTop : 10}}>
    //   <Grid item xs={12} sm={6} md={4}>
    //     <Link href={`blog/${post.postID}`}>
    //       <Card className={classes.card}>
    //         <CardActionArea>
    //           <CardMedia
    //             className={classes.media}
    //             image={post.image}
    //             title={post.title}
    //           />
    //           <CardContent>
    //             <Typography gutterBottom variant="h5" component="h2">
    //               {post.title}
    //             </Typography>
    //             <Typography variant="body2" color="textSecondary" component="p">
    //               <div dangerouslySetInnerHTML={{ __html: post.content }} />
    //             </Typography>
    //           </CardContent>
    //         </CardActionArea>
    //         <CardActions className={classes.cardActions}>
    //           {/* <Box className={classes.author}>
    //           <Avatar src="https://images.unsplash.com/photo-1584999734482-0361aecad844?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80" />
    //           <Box ml={2}>
    //             <Typography variant="subtitle2" component="p">
    //               {post.user.username}
    //             </Typography>
    //             <Typography
    //               variant="subtitle2"
    //               color="textSecondary"
    //               component="p"
    //             >
    //               {post.createdAt}
    //             </Typography>
    //           </Box>
    //         </Box> */}
    //           <Box>
    //             <Link href={`/edit?id=${post.postID}`}>
    //               <BookmarkBorderIcon />
    //             </Link>
    //           </Box>
    //         </CardActions>
    //       </Card>
    //     </Link>
    //   </Grid>
    // </Container>
  );
};

export default MyPost;
