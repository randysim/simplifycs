import useUser from "@/lib/useUser";

import CourseCard from "@/components/dashboard/CourseCard";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";

import axios from "axios";

const fetchCourses = async () => {
  let d = await axios.get("api/getcourses");

  if (d.data.success)
    return d.data.courses;
}

export default function Dashboard() {
  const { signedIn, userInfo } = useUser();
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetchCourses()
      .then(crs => {
          setCourses(crs);
      });
  }, []);

  console.log(courses);

  return (
    <div>
      Hello {JSON.stringify({ signedIn, userInfo })}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ width: "100%", height: "auto", padding: "50px" }}
        bgcolor="#AF98B9"
      >
        {courses.map(c => <CourseCard id={c.id} title={c.name} description={c.description} key={c.id} />)}
      </Grid>
    </div>
  );
}
