// src/api/comment.js
import { supabase } from "../supabase";

// 댓글 불러오기 (post_id 기준)
export const fetchComments = async (postId) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("댓글 불러오기 실패:", error.message);
    return [];
  }
  return data;
};

// 댓글 추가하기
export const addComment = async ({
  postId,
  content,
  writer,
  parentId = null,
}) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          post_id: postId,
          content,
          writer,
          parent_id: parentId,
        },
      ])
      .select();

    if (error) {
      console.error("댓글 작성 실패:", error.message);
      return null;
    }

    return data[0]; // return the inserted comment object
  } catch (err) {
    console.error("댓글 insert 중 예외 발생:", err);
    return null;
  }
};

// 신고된 댓글 불러오기
export const getReportedComments = async () => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("reported", true);

  if (error) {
    console.error("신고된 댓글 불러오기 실패:", error.message);
    return [];
  }

  return data;
};

// 댓글 삭제
export const deleteCommentById = async (commentId) => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    console.error("댓글 삭제 실패:", error.message);
    alert("댓글 삭제 중 오류 발생!");
  }
};
