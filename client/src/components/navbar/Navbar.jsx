"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import styles from "./page.module.css";
import DarkModeToggle from "../DarkMode/DarkModeToggle";
import { AuthContext } from "../../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  // useEffect(() => {
  //   fetch('http://localhost:4000/profile', {
  //     credentials: 'include',
  //   }).then(response => {
  //     response.json().then(userInfo => {
  //       setUserInfo(userInfo);
  //     });
  //   });
  // }, []);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className={styles.container}>
      <Link href={"/"} className={styles.logo}>
        Van duy
      </Link>
      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((link) => (
          <Link key={link.id} className={styles.link} href={link.url}>
            {link.title}
          </Link>
        ))}

        {!authTokens ? (
          <div>
            <button className={styles.logout}>
              <Link href={"/dashboard/login"}>Login</Link>
            </button>
          </div>
        ) : (
          <div className={styles.contentInfo}>
            <div className={styles.info} onClick={handleClick} >
              <FontAwesomeIcon icon={faUser} />
              <p>{authTokens.username}</p>
            </div>
            {dropdown && (
              <ul className={styles.moreInfo}>
                <li>
                  <Link href={`/profile/?id=${authTokens.userId}`}>
                    Thong tin ca nhan
                  </Link>
                </li>
                <li>Dang xuat</li>
              </ul>
            )}

            <button onClick={logoutUser} className={styles.logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
