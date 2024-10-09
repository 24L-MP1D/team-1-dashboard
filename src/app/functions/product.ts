"use client";

import { headers } from "next/headers";
import { backcode } from "./login";
import { FormValues } from "../product/addNew/page";

export const getProductList = async (query: any) => {
  console.log(query);
  try {
    const res = await fetch(`${backcode}/product/list`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query)
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const createProduct = async (data: FormValues) => {
  const token = localStorage.getItem("authToken") || "";
  console.log();
  try {
    const res = await fetch(`${backcode}/product/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", authtoken: token },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
  }
  return false;
};
