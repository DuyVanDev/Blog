"use client";
import React, { useContext } from "react";
import styles from "./page.module.css";
import Link from "next/link";

import { AuthContext } from "../../../../../context/AuthContext";

const Login = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div>
      <form action="" onSubmit={loginUser}>
        <input type="text" name="username" placeholder="Enter Username" />
        <input type="password" name="password" placeholder="Enter Password" />
        <input type="submit"/>
      </form>
      <Link href={"/dashboard/register"}>Register</Link>
    </div>
  );
};

export default Login;
