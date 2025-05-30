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
  const [replyTo, setReplyTo] = useState(null);

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
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const { data: existingLike, error: checkError } = await supabase
        .from("posts_likes")
        .select("*")
        .eq("post_id", post.id)
        .eq("nickname", user.nickname)
        .maybeSingle();

      if (checkError) {
        console.error("좋아요 확인 중 오류:", checkError.message);
        return;
      }

      if (existingLike) {
        alert("이미 좋아요를 눌렀습니다.");
        return;
      }

      const { error: insertError } = await supabase
        .from("posts_likes")
        .insert([{ post_id: post.id, nickname: user.nickname }]);

      if (insertError) {
        console.error("좋아요 기록 저장 실패:", insertError.message);
        alert("좋아요 기록 저장 실패");
        return;
      }

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
    } catch (err) {
      console.error("예외 발생:", err);
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
          <button
            onClick={() => {
              const confirmed = window.confirm("정말 신고하시겠습니까?");
              if (confirmed) alert("신고가 접수되었습니다.");
            }}
            className="delete-button small-faded"
            style={{ marginLeft: "8px", fontSize: "12px", color: "red" }}
          >
            신고
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
        <button onClick={handleLikeClick}>👍 좋아요 {post.likes || 0}</button>
      </div>
      <div className="comment-section">
        <h3>댓글 ({comments.length})</h3>
        <ul>
          {comments
            .filter((cmt) => !cmt.parent_id)
            .map((cmt) => (
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
                      .from("comments_likes")
                      .select("*")
                      .eq("comment_id", cmt.id)
                      .eq("nickname", user.nickname)
                      .maybeSingle();

                    if (existingLike) {
                      alert("이미 좋아요를 눌렀습니다.");
                      return;
                    }

                    const { error: insertError } = await supabase
                      .from("comments_likes")
                      .insert([
                        { comment_id: cmt.id, nickname: user.nickname },
                      ]);

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
                <button
                  onClick={() => {
                    const confirmed = window.confirm("정말 신고하시겠습니까?");
                    if (confirmed) alert("신고가 접수되었습니다.");
                  }}
                  className="delete-button small-faded"
                  style={{ marginLeft: "8px", fontSize: "12px", color: "red" }}
                >
                  신고
                </button>
                <button
                  onClick={() => setReplyTo(cmt)}
                  className="small-faded"
                  style={{ marginLeft: "10px", fontSize: "12px" }}
                >
                  답글 달기
                </button>
                <ul style={{ marginLeft: "20px" }}>
                  {comments
                    .filter((child) => child.parent_id === cmt.id)
                    .map((child) => (
                      <li key={child.id} className="reply-item">
                        <div style={{ fontWeight: "bold", color: "#333" }}>
                          ↳ {child.writer}님이 <em>{cmt.writer}</em> 님에게 남긴
                          대댓글
                        </div>
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: "normal",
                            marginTop: "6px",
                          }}
                        >
                          {child.content}
                        </div>
                        <br />
                        <small>
                          {new Date(child.created_at).toLocaleString()}
                        </small>
                        <span style={{ marginLeft: "8px", color: "#999" }}>
                          ❤️ {child.likes || 0}
                        </span>
                        <button
                          onClick={async () => {
                            const { data: existingLike } = await supabase
                              .from("comments_likes")
                              .select("*")
                              .eq("comment_id", child.id)
                              .eq("nickname", user.nickname)
                              .maybeSingle();

                            if (existingLike) {
                              alert("이미 좋아요를 눌렀습니다.");
                              return;
                            }

                            const { error: insertError } = await supabase
                              .from("comments_likes")
                              .insert([
                                {
                                  comment_id: child.id,
                                  nickname: user.nickname,
                                },
                              ]);

                            if (insertError) {
                              console.error(
                                "좋아요 기록 저장 실패:",
                                insertError.message
                              );
                              return;
                            }

                            const { data, error } = await supabase
                              .from("comments")
                              .update({ likes: (child.likes || 0) + 1 })
                              .eq("id", child.id)
                              .select();

                            if (!error && data && data.length > 0) {
                              setComments((prev) =>
                                prev.map((item) =>
                                  item.id === child.id
                                    ? { ...item, likes: data[0].likes }
                                    : item
                                )
                              );
                            }
                          }}
                          className="delete-button small-faded"
                          style={{
                            marginLeft: "6px",
                            fontSize: "12px",
                            color: "#222",
                          }}
                        >
                          좋아요
                        </button>
                        {user?.nickname === child.writer && (
                          <button
                            onClick={() => handleDeleteComment(child.id)}
                            className="delete-button small-faded"
                            style={{ marginLeft: "8px", fontSize: "12px" }}
                          >
                            삭제
                          </button>
                        )}
                        <button
                          onClick={() => {
                            const confirmed =
                              window.confirm("정말 신고하시겠습니까?");
                            if (confirmed) alert("신고가 접수되었습니다.");
                          }}
                          className="delete-button small-faded"
                          style={{
                            marginLeft: "8px",
                            fontSize: "12px",
                            color: "red",
                          }}
                        >
                          신고
                        </button>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
        {replyTo && (
          <div>
            <p style={{ fontSize: "14px", marginBottom: "4px" }}>
              ↪ {replyTo.writer}에게 답글 작성 중
              <button
                onClick={() => setReplyTo(null)}
                style={{ marginLeft: "10px", fontSize: "12px", color: "gray" }}
              >
                취소
              </button>
            </p>
          </div>
        )}
        <textarea
          placeholder="댓글을 입력하세요"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button
          onClick={async () => {
            if (!user) {
              alert("로그인이 필요합니다.");
              return;
            }
            if (!commentInput.trim()) return;

            const result = await addComment({
              postId: post.id,
              content: commentInput,
              writer: user.nickname,
              parentId: replyTo?.id || null,
            });
            if (result) {
              const updatedComments = await fetchComments(post.id);
              setComments(updatedComments);
              setCommentInput("");
              setReplyTo(null);
            }
          }}
        >
          댓글 작성
        </button>
      </div>
    </div>
  );
}
