"use client";
import Link from "next/link";
import React, { useContext } from "react";
import Image from "next/image";
import useAxios from "@/untils/useAxios";
import { AuthContext } from "../../../context/AuthContext";
import {
  Avatar,
  Box,
  Container,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {
    padding: "0 200px",
    marginTop: "90px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "0 200px",
    marginTop: "90px",
  },
}));

function SimpleDialog(props) {
  const { onClose, open, postId } = props;
console.log(open)
  const handleClose = () => {};

  return (
    <Dialog
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClose={onClose}
      open={open}
    >
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        <Link href={`/edit?id=${postId}`}>
          <ListItem disableGutters>
            <ListItemButton autoFocus>
              <ListItemAvatar>
                <Avatar>{/* <AddIcon /> */}</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Edit" />
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItem disableGutters>
          <ListItemButton autoFocus>
            <ListItemAvatar>
              <Avatar>{/* <AddIcon /> */}</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

const MyPost = (props) => {
  const [open, setOpen] = React.useState(false);

  const { post } = props;
  const { authTokens } = useContext(AuthContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let api = useAxios();

  const date = new Date();
  return (
    <Container
      style={{
        position: "relative",
      }}
    >
      <Link href={`blog/${post.postID}`}>
        <Grid
          container
          spacing={3}
          mb={6}
          mt={2}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid xs={12} md={4}>
            <Box
              sx={{
                position: "relative",
                height: "150px",
                width: "100%",
                minWidth: "250px",
              }}
            >
              <Image
                src={post.image}
                alt=""
                fill
                priority
                style={{
                  objectFit: "cover",
                  backgroundPosition: "center",
                  boxShadow: "5px 10px",
                }}
              />
            </Box>
          </Grid>

          <Grid xs={12} md={8} pl={{xs : 0, md : 2}}>
            <Typography variant="subtitle" component="h3" mb={1}>
              {post.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                marginBottom: "8px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                xs={12}
                color="textSecondary"
                fontWeight={"bold"}
                fontSize={11}
                variant="subtitle"
                component="p"
              >
                @{post.username}
              </Typography>
              <div>
                <Typography
                  xs={12}
                  color="textSecondary"
                  fontSize={9}
                  fontWeight={600}
                  variant="subtitle"
                  component="p"
                >
                  {dayjs(post.createdAt).format("DD/MM/YYYY ")}
                </Typography>
              </div>
            </Box>
            <Typography
              color="textPrimary"
              fontSize={13}
              variant="string"
              component="p"
            >
              <div
                style={{ lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{
                  __html: post.content.slice(0, 250),
                }}
              />
            </Typography>
          </Grid>
        </Grid>
      </Link>

      <Box
        onClick={handleClickOpen}
        style={{ position: "absolute", top: 0, right: 0 }}
      >
        <MoreVertIcon style={{ cursor: "pointer" }} />
      </Box>
      <SimpleDialog open={open} postId={post.postID} onClose={handleClose} />
    </Container>

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
