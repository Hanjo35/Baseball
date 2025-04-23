// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TopBanner from "./components/TopBanner";
import MainNews from "./components/MainNews";
import Board from "./components/Board";
import RightBanner from "./components/RightBanner";
import PostDetail from "./pages/PostDetail";
import { PostProvider } from "./context/PostContext";
import "./styles.css";

export default function App() {
  const MLB = [
    { title: "이정후 연타석 홈런 작렬!", comments: 8, views: 2340 },
    { title: "오타니 홈런!", comments: 14, views: 5321 },
  ];

  const KBO = [
    { title: "키움 잘 좀 해봐", comments: 9, views: 4210 },
    { title: "한화 이번엔 가을 갈까요?", comments: 6, views: 1987 },
  ];

  const NEWS = [
    { title: "LG 5연승 질주", comments: 9, views: 4210 },
    { title: "한화 연승가도 언제까지 이어질까", comments: 6, views: 1987 },
  ];

  const OTHERS = [
    { title: "카리나 이쁘네요", comments: 9, views: 4210 },
    { title: "민지가 더 이쁜 듯", comments: 6, views: 1987 },
  ];

  return (
    <PostProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Header />
          <TopBanner />
          <Routes>
            <Route path="/" element={<MainNews />} />
            <Route path="/mlb" element={<Board title="MLB" />} />
            <Route path="/kbo" element={<Board title="KBO" />} />
            <Route path="/news" element={<Board title="NEWS" />} />
            <Route path="/others" element={<Board title="OTHERS" />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
          <RightBanner />
        </div>
      </BrowserRouter>
    </PostProvider>
  );
}
