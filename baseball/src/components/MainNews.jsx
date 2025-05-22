import React from "react";
import baseball1 from "../assets/baseball1.png";

export default function MainNews() {
  return (
    <section
      className="main-news"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div className="featured-news">
        <img
          src={baseball1}
          alt="대표 뉴스"
          className="featured-news-img"
          style={{ width: "30%", height: "auto", borderRadius: "8px" }}
        />
        <h2 className="featured-title" style={{ marginTop: "12px" }}>
          대표 뉴스 제목
        </h2>
      </div>
      <div className="sub-news" style={{ display: "flex", gap: "20px" }}>
        <div className="mlb-news" style={{ flex: 1 }}>
          <h3 style={{ marginBottom: "10px" }}>MLB 대표 뉴스</h3>
          <div
            className="thumbnail-item"
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              className="thumbnail-img"
              src={baseball1}
              alt="뉴스 이미지"
              style={{
                width: "80px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <span className="thumbnail-title">MLB 뉴스 제목</span>
          </div>
          <div
            className="thumbnail-item"
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              className="thumbnail-img"
              src={baseball1}
              alt="뉴스 이미지"
              style={{
                width: "80px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <span className="thumbnail-title">MLB 뉴스 제목</span>
          </div>
          <div
            className="thumbnail-item"
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              className="thumbnail-img"
              src={baseball1}
              alt="뉴스 이미지"
              style={{
                width: "80px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <span className="thumbnail-title">MLB 뉴스 제목</span>
          </div>
          <div
            className="thumbnail-item"
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              className="thumbnail-img"
              src={baseball1}
              alt="뉴스 이미지"
              style={{
                width: "80px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <span className="thumbnail-title">MLB 뉴스 제목</span>
          </div>
          <div
            className="thumbnail-item"
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              className="thumbnail-img"
              src={baseball1}
              alt="뉴스 이미지"
              style={{
                width: "80px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <span className="thumbnail-title">MLB 뉴스 제목</span>
          </div>
        </div>
        <div className="kbo-news" style={{ flex: 1 }}>
          <h3 style={{ marginBottom: "10px" }}>KBO 대표 뉴스</h3>
          <div
            className="thumbnail-item"
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              className="thumbnail-img"
              src={baseball1}
              alt="뉴스 이미지"
              style={{
                width: "80px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <span className="thumbnail-title">KBO 뉴스 제목</span>
          </div>
          <div
            className="thumbnail-item"
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              className="thumbnail-img"
              src={baseball1}
              alt="뉴스 이미지"
              style={{
                width: "80px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <span className="thumbnail-title">KBO 뉴스 제목</span>
          </div>
          <div
            className="thumbnail-item"
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              className="thumbnail-img"
              src={baseball1}
              alt="뉴스 이미지"
              style={{
                width: "80px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <span className="thumbnail-title">KBO 뉴스 제목</span>
          </div>
          <div
            className="thumbnail-item"
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              className="thumbnail-img"
              src={baseball1}
              alt="뉴스 이미지"
              style={{
                width: "80px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <span className="thumbnail-title">KBO 뉴스 제목</span>
          </div>
          <div
            className="thumbnail-item"
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              className="thumbnail-img"
              src={baseball1}
              alt="뉴스 이미지"
              style={{
                width: "80px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <span className="thumbnail-title">KBO 뉴스 제목</span>
          </div>
        </div>
      </div>
    </section>
  );
}
