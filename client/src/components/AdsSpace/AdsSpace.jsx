import { Box, Typography } from "@mui/material";
import React from "react";

const AdsSpace = () => {
  return (
    <Box
      maxWidth="lg"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" , margin :"28px 0"}}
    >
      <Box sx={{backgroundColor : "#E8E8EA", padding : "8px 250px", display: "flex",flexDirection : "column", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="body2" color={"#696A75"} fontFamily={"Work Sans"}>Advertisement</Typography>

        <Typography variant="p" color={"#696A75"} fontSize={"20px"} fontFamily={"Work Sans"}>You can place ads</Typography>
      </Box>
    </Box>
  );
};

export default AdsSpace;
