import React from "react";

export default function MainNews() {
  const newsList = [
    {
      title: "류현진 완봉승!",
      image: "https://source.unsplash.com/80x80/?baseball,pitcher",
    },
    {
      title: "오타니 시즌 10호 홈런",
      image: "https://source.unsplash.com/80x80/?baseball,home-run",
    },
    {
      title: "김하성 맹타… 3안타 활약",
      image: "https://source.unsplash.com/80x80/?baseball,batter",
    },
  ];

  return (
    <section className="main-news">
      <div className="featured-news">
        <img
          src="https://source.unsplash.com/300x180/?baseball,stadium"
          alt="대표 뉴스"
        />
        <h2>류현진 완봉승!</h2>
      </div>
      <div className="thumbnail-news">
        {newsList.map((news, idx) => (
          <div className="thumbnail-item" key={idx}>
            <img src={news.image} alt={news.title} />
            <span>{news.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
