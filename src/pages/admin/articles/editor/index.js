import styles from "@/styles/ArticleEditor.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import adminOnly from "@/lib/adminOnly.js";

import { Box, Button } from "@mui/material";

const fetcher = (...args) => axios.get(...args).then((res) => res.data);

export const getServerSideProps = adminOnly();

export default function Editor() {
  const { data, mutate } = useSWR("/api/articles/editor/getArticles", fetcher);
  const router = useRouter();

  async function createNewArticle() {
    await axios.post("/api/articles/editor/create");
    mutate();
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", margin: "20px" }}>
      <Button variant="outlined" onClick={() => router.push("/admin")}>
        Back
      </Button>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        Articles
      </Box>
      {(data || []).map((article, i) => (
        <Box sx={{ width: "100%", marginBottom: "10px" }}>
          <Button
            onClick={() => {
              router.push(`/admin/articles/editor/${article.id}`);
            }}
            key={i}
          >
            {article.title}
          </Button>
        </Box>
      ))}

      <Button onClick={createNewArticle} variant="outlined">
        Add New Article
      </Button>
    </Box>
  );
}
