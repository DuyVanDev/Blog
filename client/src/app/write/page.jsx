"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import useAxios from "@/untils/useAxios";
import { AuthContext } from "../../../context/AuthContext";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Editor from "@/Editor";
import TaskIcon from "@mui/icons-material/Task";
import axios from "axios";
import useSWR from "swr";

const Write = () => {
  let { authTokens, logoutUser, user } = useContext(AuthContext);

  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState(null);

  let api = useAxios();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:5167/api/Category",
    fetcher
  );
  useEffect(() => {
    if (!authTokens) {
      router.push("/dashboard/login");
    }
  }, []);


  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      if (!authTokens) {
        router.push("dashboard/login");
        return;
      }

      var form = new FormData();
      form.append("image", image);
      form.append("userId", authTokens.userId);
      form.append("title", title);
      form.append("content", content);
      form.append("categoryId", categoryId);

      const options = {
        method: "post",
        data: form,

        url: "http://localhost:5167/api/BlogPost",
      };

      const { data } = await api(options);
      if (data) {
        router.push(`profile/?id=${authTokens.userId}`);
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(title, content, image, cat, user.data.userId)
  };

  return (
    <Container maxWidth="lg">
      {!isLoading && <form action="">
        <Typography mt={2} variant="h6" fontSize={13} color="red">
          *Tiêu đề
        </Typography>
        <Box
          sx={{
            width: 300,
            maxWidth: "100%",
          }}
        >
          <TextField
            required
            sx={{ width: "100%" }}
            id="standard-basic"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="standard"
          />
        </Box>
        <Typography mt={2} variant="h6" fontSize={13} color="red">
          *Nội dung
        </Typography>
        <Box>
          <Editor value={content} onChange={setContent} />
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            display: {
              md: "flex",
              xs: "block",
            },
            alignItems: "center",
            justifyContent: "space-between",
          }}
          noValidate
          autoComplete="off"
        >
          <Box>
            <Typography mt={2} variant="h6" fontSize={13} color="red">
              *Thumnail
            </Typography>
            <TextField
              required
              onChange={handleImage}
              name="image"
              type="file"
            />
          </Box>

          <Box sx={{ minWidth: 220 }}>
            <Typography mt={2} variant="h6" fontSize={13} color="red">
              *Danh mục
            </Typography>
            
            <TextField
              id="outlined-select-currency"
              select
              onChange={(e) => {
                setCategoryId(e.target.value)
              }}
            >
              {data.map((option) => (
                <MenuItem key={option.categoryID} value={option.categoryID}>
                  {option.categoryName}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        <Button
          onClick={submitForm}
          variant="contained"
          startIcon={<TaskIcon />}
        >
          Lưu
        </Button>
      </form>}
    </Container>
  );
};

export default Write;
