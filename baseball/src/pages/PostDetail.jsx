import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import { UserContext } from "../context/UserContext";

export default function PostDetail() {
  const { category, index } = useParams();
  const { posts, addComment } = useContext(PostContext);
  const { user } = useContext(UserContext);

  const categoryKey = category.toUpperCase();
  const postIndex = parseInt(index) - 1;
  const post = posts[categoryKey][postIndex];

  const [commentInput, setCommentInput] = useState("");

  const handleAddComment = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!commentInput.trim()) return;
    const newComment = {
      content: commentInput,
      writer: user.nickname,
      createdAt: new Date().toISOString(),
    };
    addComment(categoryKey, postIndex, newComment);
    setCommentInput("");
  };

  if (!post) {
    return (
      <div className="post-detail">
        <p>게시글을 찾을 수 없습니다.</p>
      </div>
    );
  }
  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>
        <strong>작성자:</strong> {post.writer}
      </p>
      <div className="comment-section">
        <h3>댓글</h3>
        <ul>
          {post.comments.map((cmt, idx) => (
            <li key={idx}>
              <strong>{cmt.writer}</strong>: {cmt.content}
              <br />
              <small>{new Date(cmt.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <button onClick={handleAddComment}>댓글 작성</button>
      </div>
    </div>
  );
}
