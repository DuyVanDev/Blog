"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import useAxios from "@/utils/useAxios";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import Editor from "@/Editor";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
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

const Edit = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userParams = searchParams.get("id");
  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);
  const [newTitle, setNewTitle] = useState(data.title);
  const [newContent, setNewContent] = useState(data.content);
  const [newImage, setNewImage] = useState(data.image);
  const [newCategory, setNewCategory] = useState(data.categoryID);
  const [newCategoryName, setNewCategoryName] = useState(data.categoryName);
  console.log(userParams);
  let { authTokens, logoutUser, user } = useContext(AuthContext);

  let api = useAxios();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5167/api/BlogPost/${userParams}`
      );
      const getCate = await axios.get(`http://localhost:5167/api/Category`);
      setData(response.data);
      setNewContent(response.data.content);
      setNewTitle(response.data.title);
      setNewImage(response.data.image);
      setNewCategory(response.data.categoryID);
      setNewCategoryName(response.data.categoryName);
      setCategories(getCate.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
    debugger;

    try {
      var form = new FormData();
      form.append("image", newImage);
      form.append("postId", userParams);
      form.append("userId", authTokens.userId);
      form.append("title", newTitle);
      form.append("content", newContent);
      form.append("categoryId", newCategory);
      const options = {
        method: "put",
        data: form,

        url: `http://localhost:5167/api/BlogPost/${userParams}`,
      };
      const { data } = await api(options);
      if (data) {
        router.push(`profile/?id=${authTokens.userId}`);
      }
      // const newData = {
      //   postID: userParams,
      //   title: newTitle,
      //   content: newContent,
      //   userID: authTokens.userId,
      //   image: newImage,
      //   categoryID: newCategory,
      //   createdAt: date,
      // };
      // const { data } = await api.put(
      //   `http://localhost:5167/api/BlogPost/${userParams}`,
      //   newData
      // );
      // if (data) {
      //   router.push(`profile/?id=${authTokens.userId}`);
      // }

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
              <TextField
                id="outlined-select-currency"
                select
                onChange={(e) => {
                  setNewCategory(e.target.value);
                }}
              >
                {categories?.map((option) => (
                  <MenuItem key={option.categoryID} value={option.categoryID}>
                    {option.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>
        </Box>

        <Button onClick={submitForm} variant="contained" startIcon={<MdEdit />}>
          Lưu
        </Button>
      </form>
    </Container>
  );
};

export default Edit;
