// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">SPORTSPARK</div>
      <nav className="nav">
        <Link to="/">홈</Link>
        <Link to="/mlb">MLB</Link>
        <Link to="/kbo">KBO</Link>
        <Link to="/news">뉴스</Link>
        <Link to="/others">자유게시판</Link>
        <Link to="/login">로그인</Link>
      </nav>
    </header>
  );
}
