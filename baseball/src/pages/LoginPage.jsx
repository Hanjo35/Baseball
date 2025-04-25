// src/pages/LoginPage.jsx
import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log("로그인 시도:", { email, password });
    // alert("로그인 로직은 아직 연결되지 않았습니다.");
    // login({ nickname: "한조", email });
    if (email === "admin@test.com" && password === "admin123") {
      login({ nickname: "관리자", email });
      alert("로그인 성공!");
      navigate("/");
    } else {
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <div className="login-page">
      <h2>로그인</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label>
          이메일
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
