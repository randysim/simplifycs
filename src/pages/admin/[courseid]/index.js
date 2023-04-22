import { Box, TextField, Typography, Button, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import useUser from "@/lib/useUser";
import { useState, useEffect } from "react";
import axios from "axios";

const getCourseData = async (id) => {
    if (id) {
      let data = await axios.get(`http://localhost:3000/api/courses/${id}`);
      let body = data.data;
  
      if (body.success) return body;
    }
  };

export default function AdminCourse() {
    const router = useRouter();
    const { courseid } = router.query;
    const { signedIn, userInfo } = useUser();
    const [courseData, setCourseData] = useState(null);
    const [open, setOpen] = useState(false);
    const [savable, setSavable] = useState(false);
    
    useEffect(() => {
        if (Object.keys(userInfo).length && !userInfo.admin) {
          router.push("/");
        }
    }, [userInfo]);

    useEffect(() => {
        getCourseData(courseid)
          .then((crs) => {
            setCourseData(crs);
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
    const Save = () => {
        setOpen(true);
    }

    const renderCourseData = () => {
        return (
            <Box>
                <Box>
                    <Typography>{courseData.course.title}</Typography>
                </Box>
                <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap"}}>
                    <TextField id="outlined-basic" label="Name" variant="outlined" onChange={e => setSavable(true) } />
                    <TextField id="outlined-basic" label="Description" variant="outlined" multiline rows={5} onChange={e => setSavable(true) } />
                </Box>
                <Box>

                </Box>
                {savable && <Button onClick={Save}>Save</Button>}
            </Box>
        )
    }

    return (
        <Box>
            {courseData ? renderCourseData() : <p>{courseid}</p>}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => { setOpen(false) }}
                message="Changes Saved"
            />
        </Box>
    );
}