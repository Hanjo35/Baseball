import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { supabase } from "../supabase";

const titleMap = {
  MLB: "MLB",
  NPB: "NPB",
  KBO: "KBO",
  NEWS: "뉴스",
  OTHERS: "자유게시판",
};

export default function Board({ title, searchTerm }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [dynamicPosts, setDynamicPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabase
        .from("posts")
        .select("*")
        .eq("category", title.toUpperCase())
        .order("created_at", { ascending: false });

      if (searchTerm && searchTerm.trim() !== "") {
        query = query.ilike("title", `%${searchTerm}%`);
      }

      const { data, error } = await query;

      console.log("Board title prop:", title);
      console.log("Filtering category (toUpperCase):", title.toUpperCase());
      console.log("Fetched posts:", data);

      if (error) {
        console.error("게시글 불러오기 실패:", error.message);
      } else {
        const postsWithComments = await Promise.all(
          data.map(async (post) => {
            const { count, error: countError } = await supabase
              .from("comments")
              .select("*", { count: "exact", head: true })
              .eq("post_id", post.id);

            if (countError) {
              console.error("댓글 수 계산 실패:", countError.message);
            }

            return {
              ...post,
              commentCount: count || 0,
            };
          })
        );

        setDynamicPosts(postsWithComments);
      }
    };

    fetchPosts();
  }, [title, searchTerm]);

  const handleWrite = () => {
    if (!user) {
      alert("글을 작성하려면 로그인해야 합니다.");
      return;
    }
    navigate("/write", { state: { category: title } });
  };

  return (
    <section className="board">
      <h3 className="board-title">{titleMap[title] || title}</h3>
      <div className="board-body">
        {dynamicPosts.length === 0 ? (
          <p className="empty-message">아직 게시글이 없습니다.</p>
        ) : (
          <ul className="board-posts">
            {dynamicPosts.map((post, index) => (
              <li key={index} className="board-post">
                <Link to={`/post/${post.id}`} className="post-title">
                  {post.title}
                </Link>
                <span className="post-meta">
                  댓글&nbsp;{post.commentCount} / 조회수 {post.views || 0}
                </span>
                <span
                  className="post-likes"
                  style={{ float: "right", color: "#999" }}
                >
                  ♥ {post.likes || 0}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="write-button-wrapper">
          <button className="write-button" onClick={handleWrite}>
            ✍️ 글쓰기
          </button>
        </div>
      </div>
    </section>
  );
}
