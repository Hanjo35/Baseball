import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Board from "../components/Board";

export default function BoardPage() {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="board-page">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <Board title={category.toUpperCase()} searchTerm={searchTerm} />
    </div>
  );
}
