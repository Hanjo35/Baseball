// src/pages/EditPost.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { UserContext } from "../context/UserContext";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  useContext(UserContext); // no destructuring needed since user is unused
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        alert("게시글을 불러오지 못했습니다.");
        return;
      }
      setPost(data);
      setTitle(data.title);
      setContent(data.content);
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const { error, data } = await supabase
      .from("posts")
      .update({ title, content })
      .eq("id", id)
      .select();

    console.log("수정 요청 데이터:", { title, content });
    console.log("수정 결과 데이터:", data);
    console.log("수정 에러:", error);

    if (error) {
      alert("수정에 실패했습니다.");
    } else {
      alert("게시글이 수정되었습니다.");
      navigate(`/post/${id}`);
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="write-post-page">
      <h2>게시글 수정</h2>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}
