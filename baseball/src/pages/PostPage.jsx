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

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm("이 댓글을 삭제하시겠습니까?");
    if (!confirmed) return;

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);
    if (error) {
      console.error("댓글 삭제 실패:", error.message);
    } else {
      setComments((prevComments) =>
        prevComments.filter((cmt) => cmt.id !== commentId)
      );
    }
  };

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

  const handleLikeClick = async () => {
    const { data, error } = await supabase
      .from("posts")
      .update({ likes: (post.likes || 0) + 1 })
      .eq("id", post.id)
      .select();

    if (error) {
      console.error("좋아요 실패:", error.message);
    } else {
      setPost(data[0]);
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
        // Increment the view count after successfully loading the post
        await supabase
          .from("posts")
          .update({ views: (data.views || 0) + 1 })
          .eq("id", id);
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
      <div
        className="post-like-bar"
        style={{ textAlign: "center", marginTop: "24px" }}
      >
        <button onClick={handleLikeClick}>❤️ 좋아요 {post.likes || 0}</button>
      </div>
      <div className="comment-section">
        <h3>댓글 ({comments.length})</h3>
        <ul>
          {comments.map((cmt) => (
            <li key={cmt.id}>
              <strong>{cmt.writer}</strong>: {cmt.content}
              <br />
              <small>{new Date(cmt.created_at).toLocaleString()}</small>
              <span style={{ marginLeft: "8px", color: "#999" }}>
                ❤️ {cmt.likes || 0}
              </span>
              <button
                onClick={async () => {
                  const { data: existingLike } = await supabase
                    .from("comment_likes")
                    .select("*")
                    .eq("comment_id", cmt.id)
                    .eq("user", user.nickname)
                    .maybeSingle();

                  if (existingLike) {
                    alert("이미 좋아요를 눌렀습니다.");
                    return;
                  }

                  const { error: insertError } = await supabase
                    .from("comment_likes")
                    .insert([{ comment_id: cmt.id, user: user.nickname }]);

                  if (insertError) {
                    console.error(
                      "좋아요 기록 저장 실패:",
                      insertError.message
                    );
                    return;
                  }

                  const { data, error } = await supabase
                    .from("comments")
                    .update({ likes: (cmt.likes || 0) + 1 })
                    .eq("id", cmt.id)
                    .select();

                  console.log("좋아요 증가 전 likes 값:", cmt.likes);
                  console.log("Supabase update 응답:", data);
                  console.log("Supabase update 에러:", error);

                  if (!error && data && data.length > 0) {
                    setComments((prev) =>
                      prev.map((item) =>
                        item.id === cmt.id
                          ? { ...item, likes: data[0].likes }
                          : item
                      )
                    );
                  }
                }}
                className="delete-button small-faded"
                style={{ marginLeft: "6px", fontSize: "12px", color: "#222" }}
              >
                좋아요
              </button>
              {user?.nickname === cmt.writer && (
                <button
                  onClick={() => handleDeleteComment(cmt.id)}
                  className="delete-button small-faded"
                  style={{ marginLeft: "8px", fontSize: "12px" }}
                >
                  삭제
                </button>
              )}
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
