import { Box } from "@mui/material";

export default function LessonSidebar({ courseid, unitid, lessonid, activities, currentActivityIndex, router }) {
    return (
        <Box sx={{ 
            width: "600px", 
            height: "100%", 
            display: "flex", 
            flexWrap: "wrap", 
            display: "flex", 
            flexWrap: "wrap",
            margin: "20px",
        }}>
            <Box
                sx={{ 
                    width: "100%", 
                    height: "75px", 
                    borderWidth: "4px",
                    borderColor: "black",
                    cursor: "pointer" 
                }}
                onClick={() => router.push(`/courses/${courseid}/${unitid}`)}
            >
                Back
            </Box>
            {activities.map((activity, i) => {
                return (
                    <Box 
                    sx={{ 
                        width: "100%", 
                        height: "75px", 
                        borderWidth: i == currentActivityIndex ? "4px" : "0px", 
                        borderColor: i == currentActivityIndex ? "blue" : "none",
                        cursor: "pointer" 
                    }}
                    onClick={() => {
                        router.push(`/courses/${courseid}/${unitid}/${lessonid}/${activity.id}`);
                    }}
                    >
                        {activity.title}
                    </Box>
                )
            })}
        </Box>
    )
}