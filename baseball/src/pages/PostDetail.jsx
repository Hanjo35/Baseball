import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext";

export default function PostDetail() {
  const { id } = useParams();
  const { posts, addComment } = useContext(PostContext);
  const [commentInput, setCommentInput] = useState("");

  // 카테고리 및 인덱스 추출
  const categories = Object.keys(posts);
  let foundPost = null;
  let categoryKey = null;
  let postIndex = null;

  for (let cat of categories) {
    const index = posts[cat].findIndex((_, idx) => idx + 1 === Number(id));
    if (index !== -1) {
      foundPost = posts[cat][index];
      categoryKey = cat;
      postIndex = index;
      break;
    }
  }

  if (!foundPost) return <div>게시글을 찾을 수 없습니다.</div>;

  const handleAddComment = () => {
    if (commentInput.trim() === "") return;
    addComment(categoryKey, postIndex, commentInput);
    setCommentInput("");
  };

  return (
    <div className="post-detail">
      <h2>{foundPost.title}</h2>
      <p>{foundPost.content}</p>
      <p>조회수: {foundPost.views}</p>

      <hr />
      <h3>댓글</h3>
      <ul>
        {foundPost.comments.map((cmt, idx) => (
          <li key={idx}>🗨️ {cmt}</li>
        ))}
      </ul>

      <textarea
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        placeholder="댓글을 입력하세요"
        rows={3}
        style={{ width: "100%", marginTop: "10px" }}
      />
      <button onClick={handleAddComment} style={{ marginTop: "8px" }}>
        댓글 작성
      </button>
    </div>
  );
}
