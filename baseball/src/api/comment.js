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
