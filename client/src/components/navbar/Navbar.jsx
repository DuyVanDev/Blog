"use client";
import * as React from "react";
import AccountMenu from "../accountmenu/AccountMenu";
import SearchBar from "../searchbar/SearchBar";
import Link from "next/link";

const pages = ["Home", "Contact", "Write", "About"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    // <AppBar  position="static" style={{ background: "transparent" }}>
    //   <Container maxWidth="xl">
    //     <Toolbar disableGutters>
    //       <Link
    //         href={"/"}
    //         style={{
    //           flexGrow: 1,
    //           display: "flex",
    //           justifyContent: "flex-start",
    //           alignItems: "center",
    //         }}
    //       >
    //         <AdbIcon
    //           sx={{
    //             display: { xs: "none", md: "flex" },
    //             mr: 1,
    //             color: "black",
    //           }}
    //         />
    //         <Typography
    //           variant="h6"
    //           noWrap
    //           component="a"
    //           sx={{
    //             mr: 2,
    //             display: { xs: "none", md: "flex" },
    //             fontFamily: "monospace",
    //             fontWeight: 700,
    //             letterSpacing: ".1rem",
    //             color: "black",
    //             textDecoration: "none",
    //           }}
    //         >
    //           T-BLOG
    //         </Typography>
    //       </Link>

    //       <Box
    //         sx={{
    //           flexGrow: 1,
    //           display: { xs: "flex", md: "none" },
    //           marginLeft: { md: "50px" },
    //         }}
    //       >
    //         <IconButton
    //           size="large"
    //           aria-label="account of current user"
    //           aria-controls="menu-appbar"
    //           aria-haspopup="true"
    //           onClick={handleOpenNavMenu}
    //           color="inherit"
    //         >
    //           <MenuIcon />
    //         </IconButton>
    //         <Menu
    //           id="menu-appbar"
    //           anchorEl={anchorElNav}
    //           anchorOrigin={{
    //             vertical: "bottom",
    //             horizontal: "left",
    //           }}
    //           keepMounted
    //           transformOrigin={{
    //             vertical: "top",
    //             horizontal: "left",
    //           }}
    //           open={Boolean(anchorElNav)}
    //           onClose={handleCloseNavMenu}
    //           sx={{
    //             display: { xs: "block", md: "none" },
    //             marginLeft: { md: "50px" },
    //           }}
    //         >
    //           {pages.map((page) => (
    //             <MenuItem key={page} onClick={handleCloseNavMenu}>
    //               <Typography textAlign="center">{page}</Typography>
    //             </MenuItem>
    //           ))}
    //         </Menu>
    //       </Box>

    //       <Box sx={{display : {xs: "none", md: "flex"}, alignItems : "center", justifyContent : "center", gap : 12, flexBasis : "70%" }}>
    //         {pages.map((page) => (
    //             <Typography  fontSize={"12px"} color={"text.primary"} textAlign="center">{page}</Typography>
    //         ))}
    //       </Box>

    //       <Box style={{ flexGrow: 1 }}>
    //         <SearchBar />
    //       </Box>

    //       <Box
    //         sx={{
    //           flexGrow: { xs: 0, md: 4 },
    //           display: "flex",
    //           justifyContent: "flex-end",
    //         }}
    //       >
    //         <AccountMenu />
    //       </Box>
    //     </Toolbar>
    //   </Container>
    // </AppBar>
    <header className="container">
    <nav class="bg-white border-gray-200   py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://flowbite.com" class="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            <div class="flex items-center lg:order-2">
                <a href="#" class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Đăng nhập</a>
                <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Đăng ký</a>
                <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <SearchBar />
            </div>
        </div>
    </nav>
</header>
  );
}
export default Navbar;
