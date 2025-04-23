import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../context/PostContext";

export default function WritePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("MLB");

  const { addPost } = useContext(PostContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(category, { title, content, views: 0, comments: 0 });
    navigate(`/${category.toLowerCase()}`);
    console.log("작성된 글:", { title, content, category });
    alert("작성 완료 (콘솔 확인)");
  };

  return (
    <div className="write-post">
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
            <option value="MLB">MLB</option>
            <option value="KBO">KBO</option>
            <option value="NEWS">NEWS</option>
            <option value="OTHERS">자유게시판</option>
          </select>
        </label>
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
}
