import { Box, Button, Typography, Snackbar } from "@mui/material"
import ConfirmationDialog from "../ui/ConfirmationDialog"
import { useState } from "react"
import axios from "axios";



export default function AdminCourseCard({ id, title, onEdit, onDelete }) {
    const [deleteDialogueOpen, setDeleteDialogue] = useState(false);
    const [message, setMessage] = useState("");

    return (
        <Box sx={{ width: "90%", height: "80px", background: "black", marginTop: "10px", borderRadius: "10px", display: "flex", justifyContent: "space-around"}}>
            <Box sx={{ height: "100%", display: "flex", alignItems: "center", width: "25%", justifyContent: "center"}}>
                <Typography>Title: {title}</Typography>
            </Box>
            <Box sx={{ height: "100%", display: "flex", alignItems: "center", width: "25%", justifyContent: "center"}}>
                <Typography>id: {id}</Typography>
            </Box>
            <Box sx={{ height: "100%", display: "flex", alignItems: "center", width: "25%", justifyContent: "center"}}>
                <Button onClick={onEdit}>
                    Edit
                </Button>
            </Box>
            <Box sx={{ height: "100%", display: "flex", alignItems: "center", width: "25%", justifyContent: "center"}}>
                <Button onClick={() => { setDeleteDialogue(true)}}>
                    Delete
                </Button>
            </Box>
            <ConfirmationDialog 
                title="Are you sure you want to delete this?"
                description="We will not be able to recover it once deleted"
                open={deleteDialogueOpen}
                onConfirm={() => {
                    onDelete();
                    setDeleteDialogue(false);
                }}
                onClose={() => {
                    setDeleteDialogue(false);
                }}
            />
        </Box>
    )
}