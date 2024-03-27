import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuPc from "./MenuPc";
import MenuMobile from "./MenuMobile";

const Header = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [toggleMenu, setToggleMenu] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {innerWidth > 900 && <MenuPc />}
      {innerWidth <= 900 && (
        <MenuMobile
         
        />
      )}
    </>
  );
};

export default Header;
