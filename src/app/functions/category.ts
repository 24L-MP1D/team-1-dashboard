import { string } from "yup";
import { backcode } from "./login";

export const getCategories = async () => {
  const res = await fetch(`${backcode}/product/category/list`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  const data = await res.json();
  const updatedData = data.map((name: string) => ({
    value: name,
    label: name
  }));
  return updatedData;
};
