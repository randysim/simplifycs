import {
  Box,
  TextField,
  Typography,
  Button,
  Snackbar,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

import AdminCourseCard from "@/components/admin/AdminCourseCard";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";

const getCourseData = async (id) => {
  if (id) {
    let data = await axios.get(`http://localhost:3000/api/courses/${id}`);
    let body = data.data;

    if (body.success) return body;
  }
};
function genAuthToken() {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let length = 12;

  let token = "";

  for (let i = 0; i < length; ++i) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }

  return token;
}

export default function AdminCourse() {
  const router = useRouter();
  const { courseid } = router.query;
  const [courseData, setCourseData] = useState(null);

  const [message, setMessage] = useState("");
  const [savable, setSavable] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCourseData(courseid)
      .then((crs) => {
        setCourseData(crs?.course);
      })
      .catch((e) => {
        console.log(e);
        router.push("/admin");
      });
  }, [router]);

  /* COURSE EDIT PAGE
        EDIT TITLE
        EDIT DESC
        CREATE UNITS
    */
  const Save = async () => {
    axios
      .post("/api/admin/editcourse", { id: courseid, data: courseData })
      .then((res) => {
        if (res.data.success) {
          getCourseData(courseid).then((crs) => {
            setCourseData(crs?.course);
          });
          setSavable(false);
        }
        setMessage(res.data.message);
      })
      .catch((e) => setMessage(e.message));
  };

  const renderCourseData = () => {
    return (
      <Box>
        <Button variant="outlined" onClick={() => router.push("/admin")}>
          Back
        </Button>
        <Box>
          <Typography>{courseData.title}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            height: "auto",
            padding: "50px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <TextField
              sx={{ width: "80%" }}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={courseData.title}
              onChange={(e) => {
                setCourseData({ ...courseData, title: e.target.value });
                setSavable(true);
              }}
            />
          </Box>
          <Box sx={{ width: "100%", marginTop: "20px" }}>
            <TextField
              sx={{ width: "80%" }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={courseData.description}
              multiline
              rows={5}
              onChange={(e) => {
                setCourseData({ ...courseData, description: e.target.value });
                setSavable(true);
              }}
            />
          </Box>
        </Box>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ width: "100%", height: "auto", padding: "50px" }}
          bgcolor="#AF98B9"
        >
          {courseData.units.map((unit) => {
            return (
              <AdminCourseCard
                key={unit.id}
                id={unit.id}
                title={unit.title}
                onEdit={() => {
                  router.push(`/admin/${courseid}/${unit.id}`);
                }}
                onDelete={() => {
                  setCourseData({
                    ...courseData,
                    units: courseData.units.filter((u) => u.id != unit.id),
                  });
                  setSavable(true);
                }}
              />
            );
          })}
          <Button
            variant="outlined"
            sx={{ width: "80%", marginTop: "20px" }}
            onClick={() => {
              setOpen(true);
            }}
          >
            Add Unit
          </Button>
        </Grid>
        {savable && <Button onClick={Save}>Save</Button>}
        <ConfirmationDialog
          title="Add Unit?"
          description="You can delete it after. (If you want)"
          open={open}
          onConfirm={() => {
            setCourseData({
              ...courseData,
              units: [
                ...courseData.units,
                {
                  title: `PendingUnit-${genAuthToken()}`,
                  description: "Pending",
                },
              ],
            });
            setOpen(false);
            setSavable(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
        />
      </Box>
    );
  };

  return (
    <Box>
      {courseData ? renderCourseData() : <p>{courseid}</p>}
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
