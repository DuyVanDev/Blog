"use client";
import React, { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  Stack,
  Fab,
} from "@mui/material";
import {
  NavToolbar,
  pages,
  MenuButton,
  colors,
  MenuListItemButton,
  MenuListItemText,
} from "./Tools";
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from "@mui/icons-material/Pets";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import { AuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <AppBar style={{ background: "#333333" }} position="fixed">
      <Container maxWidth="xl">
        <NavToolbar disableGutters>
          <Box>
            <Link href="/" color={colors.textColor}>
              <PetsIcon sx={{ fontSize: { md: "40px", xs: "25px" } }} />
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex", gap: "28px" } }}>
            {pages.map((page, index) => (
              <MenuButton key={index}>
                <Link href={page.link}>{page.name}</Link>
              </MenuButton>
            ))}
          </Box>

          {!authTokens ? (
            <Box sx={{ display: { xs: "none", md: "flex", gap: "28px" } }}>
               <MenuButton>
                <Link href="/dashboard/login">Login</Link>
              </MenuButton>
              <MenuButton>
                <Link href="/dashboard/login">Register</Link>
              </MenuButton>
            </Box>
          ) : (
            <Link href={`profile/?id=${authTokens.userId}`}>
            <Box sx={{ display: { xs: "none", md: "flex", gap: "28px" } }}>
              <MenuButton>
                <PersonIcon />
                <p>{authTokens.username}</p>
              </MenuButton>

            </Box></Link>
          )}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <IconButton onClick={() => setOpenMenu(!openMenu)}>
              <MenuOpenIcon
                sx={{ fontSize: "25px", color: colors.textColor }}
              />
            </IconButton>
            <Drawer
              PaperProps={{
                sx: {
                  backgroundColor: "#F9F9F9",
                },
              }}
              anchor="left"
              open={openMenu}
              onClose={() => setOpenMenu(!openMenu)}
            >
              <Link
                href="/"
                sx={{
                  textAlign: "center",
                  color: colors.bgColors,
                  padding: "10px",
                }}
              >
                <PetsIcon sx={{ fontSize: "50px" }} />
              </Link>
              <List>
                {pages.map((page, index) => (
                  <ListItem disablePadding key={index}>
                    <MenuListItemButton
                      component="a"
                      href={page.link}
                      key={index}
                    >
                      <MenuListItemText primary={page.name} />
                    </MenuListItemButton>
                  </ListItem>
                ))}
              </List>
              <Stack
                direction="row"
                spacing={1}
                m={1}
                pt={3}
                sx={{ justifyContent: "center" }}
              >
                <Fab
                  variant="extended"
                  sx={{
                    padding: "10px",
                  }}
                >
                  <LinkedInIcon />
                </Fab>
                <Fab
                  variant="extended"
                  sx={{
                    padding: "10px",
                  }}
                >
                  <FacebookIcon />
                </Fab>
                <Fab
                  variant="extended"
                  sx={{
                    padding: "10px",
                  }}
                >
                  <GitHubIcon />
                </Fab>
              </Stack>
            </Drawer>
          </Box>
        </NavToolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
