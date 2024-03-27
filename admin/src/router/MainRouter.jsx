import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Wrapper } from "./Wrapper";
import React, { Suspense, useEffect } from "react";
import Home from "../pages/Home/Home";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import DashPostsNoApprove from "../components/DashPostsNoApprove";
import BlogDetail from "../pages/BlogDetail/BlogDetail";
export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route
            path={"/"}
            element={
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            }
          />
          <Route
            path={"/bai-viet-chua-duyet"}
            element={
              <DefaultLayout>
                <DashPostsNoApprove />
              </DefaultLayout>
            }
          />
          <Route
            path={"/bai-viet/:id"}
            element={
              <DefaultLayout>
                <BlogDetail />
              </DefaultLayout>
            }
          />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};
