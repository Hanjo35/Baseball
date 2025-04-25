// src/context/PostContext.jsx
import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState({
    MLB: [],
    NPB: [],
    KBO: [],
    NEWS: [],
    OTHERS: [],
  });

  const addPost = (category, post) => {
    const newPost = { ...post, comments: [] };
    setPosts((prev) => ({
      ...prev,
      [category]: [...prev[category], newPost],
    }));
  };

  const addComment = (category, index, comment) => {
    setPosts((prev) => {
      const updated = [...prev[category]];
      updated[index].comments.push(comment);
      return {
        ...prev,
        [category]: updated,
      };
    });
  };

  return (
    <PostContext.Provider value={{ posts, addPost, addComment }}>
      {children}
    </PostContext.Provider>
  );
}
