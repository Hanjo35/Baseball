import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { addPost } from "../api/post";

export default function WritePost() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  const category = location.state?.category?.toUpperCase() || "MLB";
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit 호출됨");

    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const newPost = {
      title,
      content,
      writer: user?.nickname || "익명",
      category,
    };

    console.log("addPost 요청:", newPost);
    const result = await addPost(newPost);
    console.log("addPost 결과:", result);

    if (result) {
      alert("게시글이 등록되었습니다!");
      navigate(`/${category.toLowerCase()}`);
    } else {
      alert("게시글 등록 실패!");
    }
  };

  return (
    <div className="write-post-page">
      <h2>글쓰기 - {category}</h2>
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
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
}
