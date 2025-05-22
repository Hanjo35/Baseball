// src/components/Header.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const { user, logout } = useContext(UserContext);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img
            src="src/assets/야구야놀자.png"
            alt="야구야놀자 로고"
            style={{ height: "100px" }}
          />
        </Link>
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link to="/mlb">MLB</Link>
            </li>
            <li>
              <Link to="/kbo">KBO</Link>
            </li>
            <li>
              <Link to="/news">뉴스</Link>
            </li>
            <li>
              <Link to="/others">덕아웃톡</Link>
            </li>
            {user ? (
              <>
                <li className="welcome-message">
                  {user.nickname}님 환영합니다
                </li>
                <li>
                  <button onClick={logout} className="logout-button">
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
                <li>
                  <Link to="/signup">회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
