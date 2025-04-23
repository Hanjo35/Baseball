import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PostContext } from "../context/PostContext";

export default function Board({ title }) {
  const navigate = useNavigate();
  const { posts } = useContext(PostContext);
  const dynamicPosts = posts[title];

  const handleWrite = () => {
    navigate("/write");
  };

  return (
    <section className="board">
      <h3 className="board-title">{title}</h3>
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
      <button className="write-button" onClick={handleWrite}>
        ✍️ 글쓰기
      </button>
    </section>
  );
}
