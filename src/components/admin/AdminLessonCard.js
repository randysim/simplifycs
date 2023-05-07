import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Snackbar,
} from "@mui/material";
import ConfirmationDialog from "../ui/ConfirmationDialog";
import AdminActivityCard from "./AdminActivityCard";
import axios from "axios";

/* editing activity will redirect to activity editor */
/* onEdit(activityId) */
export default function AdminLessonCard({
  title,
  id,
  activities,
  onEdit,
  onDelete,
  onTitleChange,
  onActivityDelete,
  onActivityAdd,
}) {
  let [open, setOpen] = useState(false);
  let [query, setQuery] = useState("");
  let [message, setMessage] = useState("");

  return (
    <Box
      sx={{
        width: "80%",
        height: "auto",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
      bgcolor="black"
    >
      <Box sx={{ width: "100%", height: "40px", display: "flex" }}>
        <Box
          sx={{
            width: "34%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ width: "80%" }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => {
              onTitleChange(e);
            }}
          />
        </Box>
        <Box
          sx={{
            width: "33%",
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
            width: "33%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ width: "100%", height: "auto", padding: "50px" }}
      >
        {activities.map((activity) => {
          return (
            <AdminActivityCard
              key={activity.id}
              title={activity.title}
              id={activity.id}
              onEdit={onEdit}
              onDelete={onActivityDelete}
            />
          );
        })}
      </Grid>
      {id &&
        <Box sx={{ width: "100%", height: "40px", display: "flex" }}>
          <Box
            sx={{
              width: "50%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "80%" }}
              id="outlined-basic"
              label="ActivityID"
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Box>
          <Button
            variant="outlined"
            sx={{ width: "100%", marginTop: "20px" }}
            onClick={() => {
              if (activities.find((a) => a.id == query)) {
                setMessage("Activity in lesson already");
                setQuery("");
                return;
              }

              axios
                .post("/api/activity/getactivity", { id: parseInt(query) })
                .then((res) => {
                  if (res.data.success) {
                    // activity exists
                    onActivityAdd(res.data.data);
                  } else {
                    setMessage(res.data.message);
                  }

                  setQuery("");
                });
            }}
          >
            Add Activity
          </Button>
        </Box>
      }
      <ConfirmationDialog
        title="Delete Lesson?"
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
      <Snackbar
        open={message.length > 0}
        autoHideDuration={6000}
        onClose={() => {
          setMessage("");
        }}
        message={message}
      />
    </Box>
  );
}
