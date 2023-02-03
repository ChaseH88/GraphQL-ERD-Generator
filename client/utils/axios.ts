import axios from "axios";

export const postSchema = async (schema: string) => {
  const instance = axios.create({
    baseURL: "http://localhost:3001",
    responseType: "blob",
  });
  const res = await instance.post("/post-schema", { schema });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "schema.png");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
