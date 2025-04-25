import React from "react";
import baseball1 from "../assets/baseball1.png";

export default function MainNews() {
  const newsList = [
    {
      title: "류현진 완봉승!",
      image: baseball1,
    },
    {
      title: "오타니 시즌 10호 홈런",
      image: baseball1,
    },
    {
      title: "김하성 맹타… 3안타 활약",
      image: baseball1,
    },
  ];

  return (
    <section className="main-news">
      <div className="featured-news">
        <img
          src={baseball1}
          alt="대표 뉴스"
          className="featured-news-img"
          style={{ maxWidth: "400px", width: "100%" }}
        />
        <h2 className="featured-title">류현진 완봉승!</h2>
      </div>
      <div className="thumbnail-news">
        {newsList.map((news, idx) => (
          <div className="thumbnail-item" key={idx}>
            <img className="thumbnail-img" src={news.image} alt={news.title} />
            <span className="thumbnail-title">{news.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
