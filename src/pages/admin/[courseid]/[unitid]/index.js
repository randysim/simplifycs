import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  TextField,
  Snackbar,
  Grid,
  Button,
} from "@mui/material";

import useUser from "@/lib/useUser";
import AdminLessonCard from "@/components/admin/AdminLessonCard";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";

/* 
UNIT EDITOR
edit name:
edit description:
create Lesson:
-> edit name
-> add Existing activity
delete Lesson:
*/
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

export default function AdminUnit() {
  const router = useRouter();
  const { courseid, unitid } = router.query;
  const { signedIn, userInfo } = useUser();
  const [unitData, setUnitData] = useState(null);

  const [message, setMessage] = useState("");
  const [savable, setSavable] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(userInfo).length && !userInfo.admin) {
      router.push("/");
    }
  }, [userInfo]);

  useEffect(() => {
    if (!courseid) return;

    getCourseData(courseid)
      .then((crs) => {
        setUnitData(crs.course.units.find((u) => u.id == unitid));
      })
      .catch((e) => {
        console.log(e);
        router.push("/admin");
      });
  }, [courseid]);

  const Save = async () => {
    axios
      .post("/api/admin/editunit", { id: unitid, data: unitData })
      .then((res) => {
        if (res.data.success) {
          getCourseData(courseid).then((crs) => {
            setUnitData(crs.course.units.find((u) => u.id == unitid));
          });
          setSavable(false);
        }
        setMessage(res.data.message);
      })
      .catch((e) => setMessage(e.message));
  };

  const renderUnitEditor = () => {
    return (
      <Box>
        <Button
          variant="outlined"
          onClick={() => router.push(`/admin/${courseid}`)}
        >
          Back
        </Button>
        <Box>
          <Typography>{unitData.title}</Typography>
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
              value={unitData.title}
              onChange={(e) => {
                setUnitData({ ...unitData, title: e.target.value });
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
              value={unitData.description}
              multiline
              rows={5}
              onChange={(e) => {
                setUnitData({ ...unitData, description: e.target.value });
                setSavable(true);
              }}
            />
          </Box>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{
              width: "100%",
              height: "auto",
              padding: "50px",
              marginTop: "40px",
              borderRadius: "10px",
            }}
            bgcolor="#AF98B9"
          >
            {unitData.lessons.map((lesson, i) => {
              return (
                <AdminLessonCard
                  key={lesson.id}
                  title={lesson.title}
                  id={lesson.id}
                  activities={lesson.activities}
                  onEdit={(activityId) => {
                    router.push(`/admin/activity/${activityId}`);
                  }}
                  onDelete={() => {
                    setUnitData({
                      ...unitData,
                      lessons: unitData.lessons.filter(
                        (l) => l.id != lesson.id
                      ),
                    });
                    setSavable(true);
                  }}
                  onTitleChange={(e) => {
                    setUnitData({
                      ...unitData,
                      lessons: [
                        ...unitData.lessons.filter((l) => l.id != lesson.id),
                        { ...lesson, title: e.target.value },
                      ],
                    });
                    setSavable(true);
                  }}
                  onActivityDelete={(id) => {
                    setUnitData({
                      ...unitData,
                      lessons: [
                        ...unitData.lessons.filter((l) => l.id != lesson.id),
                        {
                          ...lesson,
                          activities: lesson.activities.filter(
                            (a) => a.id != id
                          ),
                        },
                      ],
                    });
                    setSavable(true);
                  }}
                  onActivityAdd={(activity) => {
                    setUnitData({
                      ...unitData,
                      lessons: [
                        ...unitData.lessons.filter((l) => l.id != lesson.id),
                        {
                          ...lesson,
                          activities: [...lesson.activities, activity],
                        },
                      ],
                    });
                    setSavable(true);
                  }}
                  onActivityUp={(activityId) => {
                    let ind = lesson.activities.findIndex(
                      (activity) => activity.id == activityId
                    );
                    if (ind == -1) {
                      setMessage("Error: Activity ID -1");
                      return;
                    }
                    if (ind <= 0) return;

                    let before = lesson.activities.slice(0, ind - 1);
                    let after = lesson.activities.slice(ind + 1);

                    setUnitData({
                      ...unitData,
                      lessons: [
                        ...unitData.lessons.filter((l) => l.id != lesson.id),
                        {
                          ...lesson,
                          activities: [
                            ...before,
                            lesson.activities[ind],
                            lesson.activities[ind - 1],
                            ...after,
                          ].filter((a) => a),
                        },
                      ],
                    });

                    setSavable(true);
                  }}
                  onActivityDown={(activityId) => {
                    let ind = lesson.activities.findIndex(
                      (activity) => activity.id == activityId
                    );

                    if (ind == -1) {
                      setMessage("Error: Activity ID -1");
                      return;
                    }
                    if (ind >= lesson.activities.length - 1) return;

                    let before = lesson.activities.slice(0, ind);

                    let after = lesson.activities.slice(ind + 2);

                    setUnitData({
                      ...unitData,
                      lessons: [
                        ...unitData.lessons.filter((l) => l.id != lesson.id),
                        {
                          ...lesson,
                          activities: [
                            ...before,
                            lesson.activities[ind + 1],
                            lesson.activities[ind],
                            ...after,
                          ].filter((a) => a),
                        },
                      ],
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
              Add Lesson
            </Button>
          </Grid>
        </Box>
        {savable && <Button onClick={Save}>Save</Button>}
        <ConfirmationDialog
          title="Add Lesson?"
          description="You can delete it after. (If you want)"
          open={open}
          onConfirm={() => {
            setUnitData({
              ...unitData,
              lessons: [
                ...unitData.lessons,
                { title: `PendingLesson-${genAuthToken()}`, activities: [] },
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
      {unitData && renderUnitEditor()}
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
