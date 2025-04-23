// src/pages/PostDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();

  // 임시 데이터 (나중엔 DB/API에서 불러올 수 있음)
  const mockPosts = {
    1: {
      title: "이정후 연타석 홈런 작렬!",
      content: "진짜 대단했어요!",
      views: 2340,
    },
    2: { title: "오타니 홈런!", content: "무려 130m 날림!", views: 5321 },
  };

  const post = mockPosts[id];

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>조회수: {post.views}</p>
    </div>
  );
}
