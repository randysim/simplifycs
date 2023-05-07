import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ConfirmationDialog from "../ui/ConfirmationDialog";

// delete in activity editor
export default function AdminActivityCard({ title, id, onEdit, onDelete }) {
  let [open, setOpen] = useState(false);

  return (
    <Box
      sx={{ width: "100%", height: "auto", padding: "20px", display: "flex" }}
      bgcolor="#7d5c91"
    >
      <Box sx={{ width: "100%", height: "40px", display: "flex" }}>
        <Box
          sx={{
            width: "25%",
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
            width: "25%",
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
            width: "25%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              onEdit(id);
            }}
          >
            Edit
          </Button>
        </Box>
        <Box
          sx={{
            width: "25%",
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
