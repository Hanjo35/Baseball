// src/App.jsx
import React from "react";
import "./styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { PostProvider } from "./context/PostContext";

import Header from "./components/Header";
import TopBanner from "./components/TopBanner";
import MainNews from "./components/MainNews";
import Board from "./components/Board";
import RightBanner from "./components/RightBanner";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WritePost from "./pages/WritePost";
import BoardPage from "./pages/BoardPage";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import AdminPage from "./pages/AdminPage";
import RequireAdmin from "./components/RequireAdmin";

export default function App() {
  const MLB = [];

  const NPB = [];

  const KBO = [];

  const NEWS = [];

  const OTHERS = [];

  return (
    <UserProvider>
      <PostProvider>
        <BrowserRouter>
          <div className="app-layout">
            <Header />
            <TopBanner />
            <div className="main-content">
              <div className="left-section">
                <Routes>
                  <Route path="/" element={<MainNews />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/write" element={<WritePost />} />
                  <Route path="/post/:id" element={<PostPage />} />
                  <Route path="/:category" element={<BoardPage />} />
                  <Route path="/edit/:id" element={<EditPost />} />
                  <Route
                    path="/admin"
                    element={
                      <RequireAdmin>
                        <AdminPage />
                      </RequireAdmin>
                    }
                  />
                </Routes>
              </div>
              <RightBanner />
            </div>
          </div>
        </BrowserRouter>
      </PostProvider>
    </UserProvider>
  );
}
