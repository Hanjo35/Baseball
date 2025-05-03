import React from "react";
import { useParams } from "react-router-dom";
import Board from "../components/Board";

export default function BoardPage() {
  const { category } = useParams();

  return (
    <div className="board-page">
      <Board title={category.toUpperCase()} />
    </div>
  );
}
