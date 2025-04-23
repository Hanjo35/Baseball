// src/context/PostContext.js
import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState({
    MLB: [],
    KBO: [],
    NEWS: [],
    OTHERS: [],
  });

  const addPost = (category, post) => {
    setPosts((prev) => ({
      ...prev,
      [category]: [...prev[category], post],
    }));
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
}
