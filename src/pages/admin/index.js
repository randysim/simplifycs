import { useRouter } from "next/router";
import useUser from "@/lib/useUser";

import { useEffect, useState } from "react";
import { Box, Typography, Grid, Snackbar, Button } from "@mui/material";

import axios from "axios";

import AdminCourseCard from "@/components/admin/AdminCourseCard";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";

const fetchCourses = async () => {
  let d = await axios.get("api/getcourses");

  if (d.data.success) return d.data.courses;
};

export default function Admin() {
  const router = useRouter();
  const { signedIn, userInfo } = useUser();

  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [addDialogueOpen, setAddDialogue] = useState(false);

  useEffect(() => {
    fetchCourses().then((crs) => {
      setCourses(crs);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(userInfo).length && !userInfo.admin) {
      router.push("/");
    }
  }, [userInfo]);

  /* 
    COURSE EDIT PAGE (create units)
    - UNIT EDIT PAGE (create lessons, activities within lessons, delete activities (only from lesson, never delete from db), create tests (bigger quizzes))
        - ACTIVITY CREATION PAGE
            - type of activity (ARTICLE, VIDEO, QUIZ)
            - allow reusing of activities between courses/units
            ARTICLE: markdown editor
            VIDEO: paste url
            QUIZ: quiz editor
    */

  const addCourse = async () => {
    axios
      .post("api/admin/createcourse")
      .then((res) => {
        if (res.data.success) {
          setCourses([...courses, res.data.data]);
          setMessage(`Course #${res.data.data.id} Added!`);
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((e) => {
        setMessage(e.message);
      });
  };

  return (
    <Box>
      <Box sx={{ height: "100px" }}>
        <Typography>MANAGE COURSES</Typography>
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ width: "100%", height: "auto", padding: "50px" }}
        bgcolor="#AF98B9"
      >
        {courses.map((c) => {
          return (
            <AdminCourseCard
              id={c.id}
              title={c.title}
              key={c.id}
              onEdit={() => {
                router.push(`/admin/${c.id}`);
              }}
              onDelete={() => {
                axios
                  .post("api/admin/deletecourse", { id: c.id })
                  .then((res) => {
                    if (res.data.success) {
                      setCourses(courses.filter((cor) => cor.id != c.id));
                    }
                    setMessage(res.data.message);
                  })
                  .catch((e) => {
                    setMessage(e.message);
                  });
              }}
            />
          );
        })}
        <Button
          variant="outlined"
          sx={{ width: "80%", marginTop: "20px" }}
          onClick={() => {
            setAddDialogue(true);
          }}
        >
          Add Course
        </Button>
      </Grid>
      <Snackbar
        open={message.length > 0}
        autoHideDuration={6000}
        onClose={() => {
          setMessage("");
        }}
        message={message}
      />
      <ConfirmationDialog
        title="Add Course?"
        description="You can delete it later."
        open={addDialogueOpen}
        onConfirm={() => {
          addCourse().then(() => {
            setAddDialogue(false);
          });
        }}
        onClose={() => {
          setAddDialogue(false);
        }}
      />
    </Box>
  );
}
