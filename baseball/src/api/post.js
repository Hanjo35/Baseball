import { supabase } from "../supabase";

export const addPost = async ({ title, content, writer, category }) => {
  console.log("Supabase insert 요청 데이터:", {
    title,
    content,
    writer,
    category,
  });
  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content, writer, category }])
    .select();
  console.log("Supabase 응답 데이터:", data);

  if (error) {
    console.error("게시글 저장 실패:", error.message);
    alert("게시글 저장 중 오류 발생!");
    return null;
  }

  return data;
};
