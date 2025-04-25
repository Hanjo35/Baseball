import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext";

export default function PostDetail() {
  const { id } = useParams();
  const { posts, addComment } = useContext(PostContext);
  const [commentInput, setCommentInput] = useState("");

  const categories = Object.keys(posts);
  let post = null;
  let categoryKey = null;
  let postIndex = null;

  for (let key of categories) {
    const index = posts[key].findIndex((_, idx) => idx + 1 === Number(id));
    if (index !== -1) {
      post = posts[key][index];
      categoryKey = key;
      postIndex = index;
      break;
    }
  }

  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    addComment(categoryKey, postIndex, commentInput);
    setCommentInput("");
  };

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>조회수: {post.views}</p>

      <hr />
      <h3>💬 댓글</h3>
      <ul>
        {post.comments.map((cmt, idx) => (
          <li key={idx}>🗨️ {cmt}</li>
        ))}
      </ul>

      <textarea
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        placeholder="댓글을 입력하세요"
        rows={3}
        style={{ width: "100%", marginTop: "12px" }}
      />
      <button onClick={handleAddComment} style={{ marginTop: "8px" }}>
        댓글 작성
      </button>
    </div>
  );
}
