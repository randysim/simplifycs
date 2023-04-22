import { Box, Button, Typography } from "@mui/material"

export default function AdminCourseCard({ id, title, onEdit }) {
    return (
        <Box sx={{ width: "90%", height: "80px", background: "black", marginTop: "10px", borderRadius: "10px", display: "flex", justifyContent: "space-around"}}>
            <Box sx={{ height: "100%", display: "flex", alignItems: "center"}}>
                <Typography>Title: {title}</Typography>
            </Box>
            <Box sx={{ height: "100%", display: "flex", alignItems: "center"}}>
                <Typography>id: {id}</Typography>
            </Box>
            <Box sx={{ height: "100%", display: "flex", alignItems: "center"}}>
                <Button onClick={onEdit}>
                    Edit
                </Button>
            </Box>
        </Box>
    )
}