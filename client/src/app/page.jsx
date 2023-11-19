import Image from "next/image";
import Hero from "../../public/banner.png";
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
import styles from "./page.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import RecentlyPost from "@/components/RecentlyPost/RecentlyPost";
import AdsSpace from "@/components/AdsSpace/AdsSpace";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ marginTop: "20px" }}>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Image
          className={styles.img}
          src={Hero} // Path to your image inside the public directory
          alt="Background Image"
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            borderRadius: "8px",

            height: "400px",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent overlay if desired
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Your content goes here */}
          <h1 style={{color: "white"}}>TBlog -Tin tức cực shock</h1>
        </Box>
      </Box>
      <AdsSpace />
      <RecentlyPost />
      <AdsSpace />

    </Container>
  );
}
