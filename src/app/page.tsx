"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/app/utils/discorduser";
import { setCookie, getCookie } from "@/app/utils/cookies";

function handleDiscordAccessToken() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("access_token");
  if (token) {
    setCookie(
      "access_token",
      token,
      params.get("expires_in") ? parseInt(params.get("expires_in")!) : 0
    );
    setCookie(
      "refresh_token",
      params.get("refresh_token")!,
      params.get("expires_in") ? parseInt(params.get("expires_in")!) : 0
    );
    window.location.search = "";
  }
}

async function getLogin() {
  const token = getCookie("access_token");
  if (!token) return null;

  try {
    const userdata = await getUser(token);
    console.log(userdata);
    return userdata;
  } catch (error) {
    console.error("Error obteniendo el usuario:", error);
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    handleDiscordAccessToken();
    getLogin().then((data) => {
      setUser(data);
    });
  }, []);

  return (
    <main className="">
      <Hero />
      <h2 className="text-center">Admin User: {user?.username}</h2>
      {/* Nota para el papu: Hacer que este texto aparezca unicamente cuando el admin esta logeado <3
       asi evitamos que los usuarios lo vean. NYAA~*/}
    </main>
  );
}
