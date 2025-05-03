import React from "react";
import MainNews from "../components/MainNews";
import Board from "../components/Board";

export default function Home() {
  return (
    <div className="home-page">
      <MainNews />
      <div className="board-section">
        <Board title="MLB" />
        <Board title="NPB" />
        <Board title="KBO" />
        <Board title="NEWS" />
        <Board title="OTHERS" />
      </div>
    </div>
  );
}
