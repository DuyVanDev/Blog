"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import useAxios from "@/untils/useAxios";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import Editor from "@/Editor";
import TaskIcon from "@mui/icons-material/Task";
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
import { red } from "@mui/material/colors";
import Link from "next/link";

const Edit = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userParams = searchParams.get("id");
  const [data, setData] = useState({});
  const [newTitle, setNewTitle] = useState(data.title);
  const [newContent, setNewContent] = useState(data.content);
  const [newImage, setNewImage] = useState(data.image);
  const [newCategory, setNewCategory] = useState(data.categoryID);
  const [newCategoryName, setNewCategoryName] = useState(data.categoryName);

  let { authTokens, logoutUser, user } = useContext(AuthContext);

  let api = useAxios();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5167/api/BlogPost/${userParams}`
      );
      setData(response.data);
      setNewContent(response.data.content);
      setNewTitle(response.data.title);
      setNewImage(response.data.image);
      setNewCategory(response.data.categoryID);
      setNewCategoryName(response.data.categoryName);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(newCategory);

  console.log(data);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewImage(reader.result);
    };
  };
  const submitForm = async (e) => {
    try {
      const newData = {
        title: newTitle,
        content: newContent,
        userID: authTokens.userId,
        image: newImage,
        categoryID: newCategory,
      };
      const { data } = await api.put(
        `http://localhost:5167/api/BlogPost/${userParams}`,
        newData
      );
      if (data) {
        router.push(`profile/?id=${authTokens.userId}`);
      }

      // Xử lý sau khi cập nhật thành công
      // Có thể hiển thị thông báo cập nhật thành công
    } catch (error) {
      // Xử lý lỗi
    }
  };

  return (
    <Container maxWidth="lg">
      <form action="">
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
            sx={{ width: "100%" }}
            id="standard-basic"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            variant="standard"
          />
        </Box>
        <Typography mt={2} variant="h6" fontSize={13} color="red">
          *Nội dung
        </Typography>
        <Box>
          <Editor value={newContent} onChange={setNewContent} />
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
              onChange={handleImage}
              name="image"
              helperText="Hãy chọn thumnail"
              type="file"
            />
          </Box>

          <Box sx={{ minWidth: 220 }}>
            <Typography mt={2} variant="h6" fontSize={13} color="red">
              *Danh mục
            </Typography>
            <FormControl fullWidth>
              <InputLabel htmlFor="category">{newCategoryName}</InputLabel>
              <Select
                labelId="category"
                id="demo-simple-select"
                label={newCategoryName}
                value={newCategoryName}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                  setNewCategoryName(e.target.name);
                }}
              >
                <MenuItem value={"653ca130d91168bfcc68bc8d"} name={"Công Nghệ"}>
                  Công Nghệ
                </MenuItem>
                <MenuItem value={"64e98e157529e41e695baba3"} name={"Thể Thao"}>
                  Thể Thao
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Button
          onClick={submitForm}
          variant="contained"
          startIcon={<TaskIcon />}
        >
          Lưu
        </Button>
      </form>
    </Container>
  );
};

export default Edit;
