// src/pages/PostPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { fetchComments, addComment } from "../api/comment";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    const confirmed = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
    if (!confirmed) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.error("게시글 삭제 실패:", error.message);
      alert("삭제 중 오류가 발생했습니다.");
    } else {
      alert("게시글이 삭제되었습니다.");
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      console.log("게시글 ID:", id);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("게시글 불러오기 실패:", error.message);
        setPost(null);
      } else {
        console.log("불러온 게시글:", data);
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
    console.log("댓글 작성 시도됨");
    console.log("입력된 댓글:", commentInput);
    console.log("작성 대상 postId:", post?.id);

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
  if (!post) return <div>게시글을 찾을 수 없습니다. (id: {id})</div>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <div className="post-meta-bar">
        <span>작성자: {post.writer}</span>
        <span> | 작성일: {new Date(post.created_at).toLocaleString()}</span>
      </div>
      {user?.nickname === post.writer && (
        <div className="post-action-buttons">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="edit-button small-faded"
          >
            수정
          </button>
          <button
            onClick={handleDeletePost}
            className="delete-button small-faded"
          >
            삭제
          </button>
        </div>
      )}
      <div className="post-content">
        <p>{post.content}</p>
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
