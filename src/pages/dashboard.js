import useUser from "@/lib/useUser";

import CourseCard from "@/components/dashboard/CourseCard";
import { Grid, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import axios from "axios";

const fetchCourses = async () => {
  let d = await axios.get("api/getcourses");

  if (d.data.success) return d.data.courses;
};

export default function Dashboard() {
  const router = useRouter();
  const { signedIn, userInfo } = useUser();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then((crs) => {
      setCourses(crs);
      console.log(crs);
    });
  }, []);

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "200px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "500px",
            height: "80%",
            paddingLeft: "20px",
            backgroundColor: "#AF98B9",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ height: "50%", display: "flex" }}>
            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: "600",
                alignSelf: "flex-end",
              }}
            >
              {userInfo.firstName} {userInfo.lastName}
            </Typography>
          </Box>
          <Box sx={{ height: "50%", display: "flex" }}>
            <Typography sx={{ fontSize: "15px", alignSelf: "flex-start" }}>
              @{userInfo.username}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ width: "100%", height: "auto", padding: "50px" }}
        bgcolor="#AF98B9"
      >
        {courses.map((c) => (
          <CourseCard
            id={c.id}
            title={c.title}
            description={c.description}
            key={c.id}
          />
        ))}
      </Grid>
    </div>
  );
}