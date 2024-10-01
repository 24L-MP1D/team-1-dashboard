import { backcode } from "./login";

export const uplaodImage = async (files: []) => {
  let urls = [];
  const token = localStorage.getItem("authToken") || "";
  try {
    for (let num in files) {
      const formData = new FormData();
      formData.append("image", files[num]);

      const res = await fetch(`${backcode}/image/upload`, {
        method: "POST",
        headers: {
          authToken: token,
        },
        body: formData,
      });
      const data = await res.json();
      urls.push(data.secure_url);
    }
  } catch (e) {
    console.error(e);
    return urls;
  }
  return urls;
};
