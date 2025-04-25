import { supabase } from "../supabase";

export const addPost = async ({ title, content, writer }) => {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content, writer }]);

  if (error) {
    console.error("게시글 저장 실패:", error.message);
    alert("게시글 저장 중 오류 발생!");
    return null;
  }

  return data;
};
