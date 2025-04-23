import React from "react";

export default function Board({ title, posts }) {
  return (
    <section className="board">
      <h3 className="board-title">{title}</h3>
      <ul className="board-posts">
        {posts.map((post, index) => (
          <li key={index} className="board-post">
            <span className="post-title">{post.title}</span>
            <span className="post-meta">
              [{post.comments}] / 조회수 {post.views}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
