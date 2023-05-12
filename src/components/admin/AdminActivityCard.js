import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ConfirmationDialog from "../ui/ConfirmationDialog";
import { useRouter } from "next/router";

// delete in activity editor
export default function AdminActivityCard({ data, onEdit, onDelete, onUp, onDown }) {
  let title = data.title;
  let id = data.id;
  let type = data.model;

  const router = useRouter();
  
  let [open, setOpen] = useState(false);

  return (
    <Box
      sx={{ width: "100%", height: "auto", padding: "20px", display: "flex" }}
      bgcolor="#7d5c91"
    >
      <Box sx={{ width: "100%", height: "40px", display: "flex" }}>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>{title}</Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>id: {id}</Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              if (type == "Article") {
                router.push(`/admin/articles/editor/${id}`)
              } else {
                onEdit(id);
              }
            }}
          >
            Edit
          </Button>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              onDelete(id);
            }}
          >
            Delete
          </Button>
        </Box>
        <Box
          sx={{
            width: "20%",
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button onClick={() => onUp(id)}>
            Up
          </Button>
          <Button onClick={() => onDown(id)}>
            Down
          </Button>
        </Box>
      </Box>

      <ConfirmationDialog
        title="Delete Activity?"
        description="It is probably not recoverable!"
        open={open}
        onConfirm={() => {
          onDelete();
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Box>
  );
}
