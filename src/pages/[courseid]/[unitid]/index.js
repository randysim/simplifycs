import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import axios from "axios";
import useUser from "@/lib/useUser";

import { Box, Typography } from "@mui/material";

const getCourseData = async (id) => {
  if (id) {
    let data = await axios.get(`http://localhost:3000/api/courses/${id}`);
    let body = data.data;

    if (body.success) return body;
  }
};

export default function Unit() {
  const router = useRouter();
  const { courseid, unitid } = router.query;

  const { signedIn, userInfo } = useUser();

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    console.log("COURSEID: " + courseid);
    getCourseData(courseid)
      .then((crs) => {
        setCourseData(crs);
      })
      .catch((e) => {
        router.push("/dashboard");
      });
  }, [router]);

  const renderUnitData = () => {
    let unit = courseData.units[unitid];
    return (
      <Box>
        <Box
          sx={{
            width: "100%",
            height: "175px",
            paddingLeft: "50px",
            display: "flex",
            alignItems: "center",
          }}
          bgcolor="primary.main"
        >
          <Typography sx={{ fontSize: "40px" }}>Unit: {unit.name}</Typography>
        </Box>
        <Box sx={{ width: "100%", height: "auto" }}>
          <Box>
            <Typography sx={{ fontSize: "20px", paddingLeft: "50px" }}>
              Lessons:
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {unit.lessons.map((l, i) => {
              return (
                <Box
                  sx={{
                    width: "80%",
                    minWidth: "400px",
                    padding: "20px",
                    border: "4px solid white",
                    marginTop: "50px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    router.push(`/${courseid}/${unitid}/${l.id}`);
                  }}
                >
                  {l.type} - {l.name}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  };

  return <Box>{courseData ? renderUnitData() : <p>{courseid}</p>}</Box>;
}
