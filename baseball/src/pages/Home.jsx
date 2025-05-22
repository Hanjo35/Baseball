import React from "react";
import MainNews from "../components/MainNews";
import Board from "../components/Board";
import RightBanner from "../components/RightBanner";

export default function Home() {
  return (
    <div className="main-content">
      <div className="left-section">
        <MainNews />
        <div className="board-section">
          <Board title="MLB" />
          <Board title="NPB" />
          <Board title="KBO" />
          <Board title="NEWS" />
          <Board title="OTHERS" />
        </div>
      </div>
      <RightBanner />
    </div>
  );
}
