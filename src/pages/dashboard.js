import useUser from "@/lib/useUser";

import CourseCard from "@/components/dashboard/CourseCard";
import { Grid } from "@mui/material";

export default function Dashboard() {
  const { signedIn, userInfo } = useUser();

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
        <CourseCard
          id={1}
          title={"Intro to Python"}
          description={"Beginner Python Course!"}
        />
        <CourseCard
          id={1}
          title={"Intro to Python"}
          description={"Beginner Python Course!"}
        />
        <CourseCard
          id={1}
          title={"Intro to Python"}
          description={"Beginner Python Course!"}
        />
        <CourseCard
          id={1}
          title={"Intro to Python"}
          description={"Beginner Python Course!"}
        />
        <CourseCard
          id={1}
          title={"Intro to Python"}
          description={"Beginner Python Course!"}
        />
        <CourseCard
          id={1}
          title={"Intro to Python"}
          description={"Beginner Python Course!"}
        />
      </Grid>
    </div>
  );
}
