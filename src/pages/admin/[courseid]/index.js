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
    const [message, setMessage] = useState("");
    const [savable, setSavable] = useState(false);
    
    useEffect(() => {
        if (Object.keys(userInfo).length && !userInfo.admin) {
          router.push("/");
        }
    }, [userInfo]);

    useEffect(() => {
        getCourseData(courseid)
          .then((crs) => {
            setCourseData(crs.course);
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
        axios.post("/api/admin/editcourse", { id: courseid, data: courseData })
            .then(res => {
                console.log(res);
                if (res.data.success) {

                }

                setMessage(res.data.message);
            })
            .catch(e => setMessage(e.message));
        
    }

    const renderCourseData = () => {
        return (
            <Box>
                <Box>
                    <Typography>{courseData.title}</Typography>
                </Box>
                <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap"}}>
                    <TextField id="outlined-basic" label="Title" variant="outlined" value={courseData.title} onChange={e => {
                        setCourseData({ ...courseData, title: e.target.value })
                        setSavable(true); 
                    }} />
                    <TextField id="outlined-basic" label="Description" variant="outlined" value={courseData.description} multiline rows={5} onChange={e => {
                        setCourseData({ ...courseData, description: e.target.value })
                        setSavable(true) 
                    }} />
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
                open={message.length > 0}
                autoHideDuration={6000}
                onClose={() => { setMessage("") }}
                message={message}
            />
        </Box>
    );
}