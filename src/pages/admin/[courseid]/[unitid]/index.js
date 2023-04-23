import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

import { Box } from "@mui/material";

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

export default function AdminUnit() {
    const router = useRouter();
    const { courseid, unitid } = router.query;
    const { signedIn, userInfo } = useUser();
    const [courseData, setCourseData] = useState(null);
    
    useEffect(() => {
        if (Object.keys(userInfo).length && !userInfo.admin) {
          router.push("/");
        }
    }, [userInfo]);

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

    let renderUnitEditor = () => {
        let unit = courseData.units[unitid];

        return (
            
        )
    }

    return (
        <Box>
            {renderUnitEditor()}
        </Box>
    )
}