// src/pages/AdminPage.jsx

import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { getReportedPosts, deletePostById } from "../api/post";
import { getReportedComments, deleteCommentById } from "../api/comment";

function AdminPage() {
  const [reportedPosts, setReportedPosts] = useState([]);
  const [reportedComments, setReportedComments] = useState([]);

  const handleBanUser = async (userId) => {
    const confirmBan = window.confirm("이 사용자를 정지하시겠습니까?");
    if (!confirmBan) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_banned: true })
        .eq("id", userId);

      if (error) throw error;

      alert("사용자가 정지되었습니다.");
    } catch (err) {
      console.error("정지 중 오류 발생:", err.message);
      alert("정지 실패: " + err.message);
    }
  };
  useEffect(() => {
    async function fetchData() {
      const posts = await getReportedPosts();
      const comments = await getReportedComments();
      setReportedPosts(posts);
      setReportedComments(comments);
    }
    fetchData();
  }, []);

  const handleDeletePost = async (postId) => {
    await deletePostById(postId);
    setReportedPosts(reportedPosts.filter((p) => p.id !== postId));
  };

  const handleDeleteComment = async (commentId) => {
    await deleteCommentById(commentId);
    setReportedComments(reportedComments.filter((c) => c.id !== commentId));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📌 신고된 게시물</h2>
      {reportedPosts.length === 0 ? (
        <p>신고된 게시물이 없습니다.</p>
      ) : (
        <ul>
          {reportedPosts.map((post) => (
            <li key={post.id}>
              <p>{post.title}</p>
              <p>작성자: {post.nickname}</p>
              <p>ID: {post.id}</p>
              <button onClick={() => handleDeletePost(post.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}

      <h2>🗯️ 신고된 댓글</h2>
      {reportedComments.length === 0 ? (
        <p>신고된 댓글이 없습니다.</p>
      ) : (
        <ul>
          {reportedComments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <p>작성자: {comment.user_id}</p>
              <button onClick={() => handleDeleteComment(comment.id)}>
                삭제
              </button>
              <button onClick={() => handleBanUser(comment.user_id)}>
                정지
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminPage;
