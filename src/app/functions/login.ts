"use client";

export const backcode = "http://localhost:5001";

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${backcode}/admin/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const token = await res.json();

    localStorage.setItem("authToken", token);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
