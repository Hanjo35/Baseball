// src/components/PopularPosts.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PopularPosts({ posts }) {
  return (
    <div className="popular-section" style={{ marginTop: "20px" }}>
      <h3 style={{ marginBottom: "10px" }}>🔥 실시간 인기글 🔥</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{
              marginBottom: "10px",
              paddingBottom: "6px",
              borderBottom: "1px solid #eee",
            }}
          >
            <Link
              to={`/post/${post.id}`}
              style={{
                fontWeight: "bold",
                textDecoration: "none",
                color: "#222",
              }}
            >
              {post.title}
            </Link>
            <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
              ❤️ {post.likes || 0} / 💬 {post.comments || 0} / 👁️{" "}
              {post.views || 0}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
