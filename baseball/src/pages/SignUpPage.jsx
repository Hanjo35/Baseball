// src/pages/SignUpPage.jsx
import React, { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, password, nickname } = formData;

    // 닉네임 중복 확인
    const { data: existingProfiles, error: nicknameError } = await supabase
      .from("profiles")
      .select("id,nickname")
      .eq("nickname", nickname);

    if (nicknameError) {
      alert("닉네임 확인 중 오류 발생: " + nicknameError.message);
      return;
    }

    if (existingProfiles.length > 0) {
      alert("이미 사용 중인 닉네임입니다.");
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      alert("회원가입 실패: " + signUpError.message);
      return;
    }

    // 사용자 id로 profiles 테이블에 닉네임 저장
    const userId = signUpData.user?.id;
    if (userId) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ id: userId, nickname }]);

      if (profileError) {
        alert("닉네임 저장 실패: " + profileError.message);
        return;
      }

      alert("회원가입 성공! 입력한 이메일로 전송된 인증 링크를 확인해주세요.");
      navigate("/login");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">회원가입</h2>
      <form onSubmit={handleSignUp} className="form-fields">
        <input
          name="email"
          type="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          name="nickname"
          placeholder="닉네임"
          value={formData.nickname}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">
          가입하기
        </button>
      </form>
    </div>
  );
}
