import { Box } from "@mui/material";

export default function LessonSidebar({ courseid, unitid, lessonid, activities, currentActivityIndex, router }) {
    return (
        <Box sx={{ 
            width: "400px", 
            height: "100%", 
            display: "flex", 
            flexWrap: "wrap", 
            display: "flex", 
            flexWrap: "wrap",
            margin: "20px",
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "20px",
            bgcolor: "secondary.main"
        }}>
            <Box
                sx={{ 
                    width: "100%", 
                    height: "75px", 
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
                        borderLeftWidth: "4px", 
                        borderColor: i == currentActivityIndex ? "#74b9ff" : "transparent",
                        cursor: "pointer",
                        padding: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center" 
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