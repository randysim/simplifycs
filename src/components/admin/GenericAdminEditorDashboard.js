import styles from "@/styles/ArticleEditor.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { Box, Button } from "@mui/material";

const fetcher = (...args) => axios.get(...args).then((res) => res.data);

export default function GenericAdminEditorDashboard({
  title,
  getItemsAPI,
  createNewItemAPI,
}) {
  const { data, mutate } = useSWR(getItemsAPI, fetcher);
  const router = useRouter();

  async function createNew() {
    await axios.post(createNewItemAPI);
    mutate();
  }

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", margin: "20px" }}>
        <Button variant="outlined" onClick={() => router.push("/admin")}>
          Back
        </Button>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          {title}
        </Box>
      </Box>

      {(data?.items || []).map((article, i) => (
        <div key={i}>
          <Box sx={{ width: "100%", marginBottom: "10px" }}>
            <Button
              onClick={() => {
                router.push(`/admin/articles/editor/${article.id}`);
                //router.push(`/admin/quizes/editor/${article.id}`);
              }}
            >
              {article.title}
            </Button>
          </Box>
        </div>
      ))}

      <Button onClick={createNew} variant="outlined">
        Add New
      </Button>
    </>
  );
}
