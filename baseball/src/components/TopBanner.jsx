import React from "react";
import AD from "../assets/AD.png";

export default function TopBanner() {
  return (
    <div className="top-banner">
      <img
        src={AD}
        style={{ height: "60px", objectFit: "contain" }}
        alt="광고 배너"
      />
    </div>
  );
}
