import React from "react";
import Image from "next/image";
import { Box, Container, Grid, Typography } from "@mui/material";
const Footer = () => {
  const footers = ["Contact", "Company", "Phone", "City"];
  return (
    <Box sx={{ bgcolor: '#F6F6F7', p: 6 }} component="footer">
    <Typography variant="h6" align="center" gutterBottom>
      Footer
    </Typography>
    <Typography
      variant="subtitle1"
      align="center"
      color="text.secondary"
      component="p"
    >
      Something here to give the footer a purpose!
    </Typography>
  </Box>
  );
};

export default Footer;
