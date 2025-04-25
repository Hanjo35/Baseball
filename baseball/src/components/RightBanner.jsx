import React from "react";
import AD from "../assets/AD.png";

export default function RightBanner() {
  return (
    <aside className="right-banner">
      <img
        src={AD}
        style={{ height: "60px", objectFit: "contain" }}
        alt="사이드 광고"
      />
    </aside>
  );
}
