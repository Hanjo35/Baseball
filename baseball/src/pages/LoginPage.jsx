// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("로그인 실패: " + error.message);
        return;
      }

      // login({ nickname: profile?.nickname || "사용자", email: user.email });
      alert("로그인 성공!");
      navigate("/");
    } catch (err) {
      alert("예기치 않은 오류가 발생했습니다.");
      console.error(err);
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
