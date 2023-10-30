import {
  Box,
  Button,
  ListItemButton,
  ListItemText,
  Toolbar,
  styled,
  Typography,
  keyframes
} from "@mui/material";
//   import bannerImage from "../image/brandBanner.jpg";

export const colors = {
  textColor: "#ffffff",
  bgColors: "#1976D2",
  color1: "#000000"
};

// export const NavToolbar = () => ({
//   display: "flex",
//   flexFlow: "row",
//   justifyContent: "space-between",
//   alignItems: "center"
// });

export const pages = [
  { name: "Blog", link: "/blog" },
  { name: "About", link: "#about" },
  { name: "Portfolio", link: "#portfolio" },
  { name: "Contact", link: "#contact" }
];

export const MenuButton = styled(Button)(() => ({
  color: colors.textColor,
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: "500"
}));

export const MenuListItemButton = styled(ListItemButton)(() => ({
  fontFamily: "Roboto",
  borderBottom: "1px solid #d1d1d1",
  alignItems: "center",
  textAlign: "center",
  "& $lastChild": {
    borderBottom: "none"
  }
}));

export const MenuListItemText = styled(ListItemText)(() => ({
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: "500"
}));

//Header Components & Css

export const Header_Box = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    minHeight: "70vh",
    height: "auto",
    padding: "10px"
  },
  [theme.breakpoints.only("sm")]: {
    minHeight: "55vh",
    height: "auto",
    padding: "10px"
  },
  [theme.breakpoints.only("xs")]: {
    minHeight: "45vh",
    height: "auto",
    padding: "10px"
  },
  // background: `linear-gradient(to bottom right, #04303140,#00606473),url(${bannerImage})`,
  // display: "flex",
  // flexFlow: "column wrap",
  // justifyContent: "center",
  // backgroundSize: "cover",
  // backgroundRepeat: "no-repeat"
}));

export const Header_buttons = styled(Box)(() => ({
  display: "flex",
  position: "relative",
  marginTop: "20px",
  "&:before": {
    content: "''",
    width: "40px",
    height: "40px",
    backgroundColor: colors.bgColors,
    borderRadius: "50%"
  }
}));

export const Header_buttons_1 = styled(Typography)(() => ({
  textDecoration: "none",
  color: colors.textColor,
  cursor: "pointer",
  position: "absolute",
  left: "22px",
  lineHeight: "40px",
  fontFamily: "Roboto",
  fontWeight: "bold"
}));

export const Header_buttons_2 = styled(Typography)(() => ({
  textDecoration: "none",
  color: colors.textColor,
  cursor: "pointer",
  position: "absolute",
  left: "100px",
  lineHeight: "50px",
  fontFamily: "Roboto",
  fontWeight: "bold",
  animation: `${upDown} 1s infinite ease`
}));

const upDown = keyframes`
0% {
  padding-top:0px;
  transform: scale(1,1);
  }
  100% {
    padding-top:10px;
    transform: scale(1,2);
  }
`;

//Skill Section
