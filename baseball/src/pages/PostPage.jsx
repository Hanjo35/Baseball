// src/pages/PostPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { fetchComments, addComment } from "../api/comment";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("게시글 불러오기 실패:", error.message);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchAndSetComments = async () => {
      if (post?.id) {
        const result = await fetchComments(post.id);
        setComments(result);
      }
    };
    fetchAndSetComments();
  }, [post]);

  const handleAddComment = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!commentInput.trim()) return;

    const result = await addComment({
      postId: post.id,
      content: commentInput,
      writer: user.nickname,
    });

    if (result) {
      const updatedComments = await fetchComments(post.id);
      setComments(updatedComments);
      setCommentInput("");
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="post-page">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="post-meta">
        <span>작성자: {post.writer}</span>
        <span> | 작성일: {new Date(post.created_at).toLocaleString()}</span>
      </div>
      <div className="comment-section">
        <h3>댓글</h3>
        <ul>
          {comments.map((cmt) => (
            <li key={cmt.id}>
              <strong>{cmt.writer}</strong>: {cmt.content}
              <br />
              <small>{new Date(cmt.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
        <textarea
          placeholder="댓글을 입력하세요"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button onClick={handleAddComment}>댓글 작성</button>
      </div>
    </div>
  );
}
