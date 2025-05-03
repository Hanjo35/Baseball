import { UserContext } from "../context/UserContext";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addPost } from "../api/post";

export default function WritePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("MLB");

  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const newPost = {
      title,
      content,
      writer: user.nickname,
      category: category.toUpperCase(),
    };

    const result = await addPost(newPost);
    if (result) {
      alert("게시글이 등록되었습니다!");
      navigate("/");
    }
  };

  return (
    <div className="write-post-page">
      <h2>글쓰기</h2>
      <form onSubmit={handleSubmit}>
        <label>
          제목:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          내용:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <label>
          게시판:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="KBO">KBO</option>
            <option value="MLB">MLB</option>
            <option value="NEWS">NPB</option>
            <option value="OTHERS">자유게시판</option>
          </select>
        </label>
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
}
