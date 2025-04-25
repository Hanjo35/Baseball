import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PostContext } from "../context/PostContext";

const titleMap = {
  MLB: "MLB",
  NPB: "NPB",
  KBO: "KBO",
  NEWS: "뉴스",
  OTHERS: "자유게시판",
};

export default function Board({ title }) {
  const navigate = useNavigate();
  const { posts } = useContext(PostContext);
  const dynamicPosts = posts[title];
  if (!dynamicPosts) return <div>게시판을 찾을 수 없습니다.</div>;

  const handleWrite = () => {
    navigate("/write");
  };

  return (
    <section className="board">
      <h3 className="board-title">{titleMap[title] || title}</h3>
      <div className="board-body">
        <ul className="board-posts">
          {dynamicPosts.map((post, index) => (
            <li key={index} className="board-post">
              <Link to={`/post/${index + 1}`} className="post-title">
                {post.title}
              </Link>
              <span className="post-meta">
                [{post.comments}] / 조회수 {post.views}
              </span>
            </li>
          ))}
        </ul>
        <div className="write-button-wrapper">
          <button className="write-button" onClick={handleWrite}>
            ✍️ 글쓰기
          </button>
        </div>
      </div>
    </section>
  );
}
