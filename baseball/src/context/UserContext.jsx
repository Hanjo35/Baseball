import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        console.log("🆔 현재 로그인된 user.id:", user.id);
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("nickname")
          .eq("id", user.id)
          .maybeSingle();
        console.log("📄 profiles에서 불러온 데이터:", profileData);

        if (profileData && !profileError) {
          console.log("✅ 불러온 nickname:", profileData.nickname);
          setUser({ ...user, nickname: profileData.nickname });
        } else {
          if (profileData === null) {
            console.warn(
              "⚠ profileData가 null입니다. 해당 ID로 profiles row가 존재하지 않음."
            );
          }
          if (profileError) {
            console.error("❌ profileError:", profileError);
          }
          setUser(user); // fallback
        }
      } else {
        setUser(null);
      }
    }

    fetchUserProfile();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUserProfile();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
}
