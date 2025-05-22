import React, { useEffect, useState } from "react";
import AD from "../assets/AD.png";
import PopularPosts from "./PopularPosts";
import { supabase } from "../supabase";

export default function RightBanner() {
  const [popularPosts, setPopularPosts] = useState([]);

  // Tabs for filtering
  const tabs = ["MLB", "KBO", "덕아웃톡"];
  const [selectedTab, setSelectedTab] = useState("MLB");

  useEffect(() => {
    const fetchPopularPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("likes", { ascending: false })
        .limit(5);
      if (!error) setPopularPosts(data);
    };

    fetchPopularPosts();
  }, []);

  return (
    <aside
      className="right-banner"
      style={{
        width: "250px",
        flexShrink: 0,
        paddingLeft: "16px",
        borderLeft: "1px solid #eee",
      }}
    >
      <img
        src={AD}
        style={{ height: "60px", objectFit: "contain" }}
        alt="사이드 광고"
      />
      <div style={{ marginTop: "12px" }}>
        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "10px",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              style={{
                padding: "2px 6px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: selectedTab === tab ? "#eee" : "#fff",
                cursor: "pointer",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <PopularPosts
          posts={
            selectedTab === "덕아웃톡"
              ? popularPosts.filter((post) => post.category === "OTHERS")
              : popularPosts.filter((post) => post.category === selectedTab)
          }
        />
      </div>
    </aside>
  );
}
