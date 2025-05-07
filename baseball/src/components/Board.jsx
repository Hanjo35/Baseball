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

export default function Board({ title }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [dynamicPosts, setDynamicPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("category", title.toUpperCase())
        .order("created_at", { ascending: false });

      console.log("Board title prop:", title);
      console.log("Filtering category (toUpperCase):", title.toUpperCase());
      console.log("Fetched posts:", data);

      if (error) {
        console.error("게시글 불러오기 실패:", error.message);
      } else {
        setDynamicPosts(data);
      }
    };

    fetchPosts();
  }, [title]);

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
                  [{post.comments}] / 조회수 {post.views}
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
