import { useRouter } from "next/router";

import axios from "axios";
import { useState, useEffect } from "react";
import useUser from "@/lib/useUser";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Link,
} from "@mui/material";

const getCourseData = async (id) => {
  if (id) {
    let data = await axios.get(`http://localhost:3000/api/courses/${id}`);
    let body = data.data;

    if (body.success) return body;
  }
};

export default function Course() {
  const router = useRouter();
  const { courseid } = router.query;

  const { signedIn, userInfo } = useUser();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    getCourseData(courseid)
      .then((crs) => {
        setCourseData(crs?.course);
      })
      .catch((e) => {
        router.push("/dashboard");
      });
  }, [router]);

  const renderCourseData = () => {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        minWidth="600px"
      >
        <Grid item sx={{ width: "80%" }}>
          <Grid container sx={{ width: "100%", padding: 2 }} bgcolor="#333">
            <Box width="100%">
              <Typography sx={{ fontSize: 30 }}>
                {courseData.title}
              </Typography>
              <Typography sx={{ fontSize: 14 }}>
                {courseData.description}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={0} width="60%">
              {Object.entries(courseData.units).map(([id, u]) => (
                <Grid
                  item
                  xs={12}
                  sx={{
                    bgcolor: "gray",
                    width: "100%",
                    minWidth: "500px",
                    minHeight: "200px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    marginTop: "15px",
                  }}
                  key={id}
                >
                  <Box
                    width="100%"
                    height="20%"
                    display="flex"
                    justifyContent="center"
                  >
                    <Link
                      href={`${courseid}/${id}`}
                      sx={{ fontSize: 20 }}
                      color="primary.contrastText"
                    >
                      Unit: {u.name}
                    </Link>
                  </Box>
                  <Grid container width="100%" height="80%">
                    {u.lessons.map((l, i) => {
                      
                      return (
                        <Box
                          key={i}
                          width="25%"
                          height="25%"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          sx={{ textDecoration: "underline" }}
                        >
                          <Link
                            href={`${courseid}/${id}/${l.id}`}
                            color="primary.contrastText"
                          >
                            {l.title}
                          </Link>
                        </Box>
                      );
                    })}
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid item minWidth="450px" minHeight="450px" width="40%">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
              >
                <Card
                  sx={{
                    cursor: "pointer",

                    width: "90%",
                    height: "400px",
                    background: "white",
                    color: "black",
                    padding: "10px",
                  }}
                >
                  <Typography sx={{ fontSize: 20 }}>Course Progress</Typography>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box paddingTop="50px">
      {courseData ? renderCourseData() : <p>{courseid}</p>}
    </Box>
  );
}
