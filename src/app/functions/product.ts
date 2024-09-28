"use client";

import { backcode } from "./login";

export const getProductList = async () => {
  try {
    const res = await fetch(`http://localhost:5000/product/list`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
