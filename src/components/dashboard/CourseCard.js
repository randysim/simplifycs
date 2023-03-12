import { Card, Typography, Divider, Grid } from "@mui/material";

function CourseCard({ id, title, description }) {
    return (
        <Grid item>
            <Card 
                sx={{ cursor: "pointer", maxWidth: 600, minWidth: 400, minHeight: 200, maxHeight: 300, padding: "10px" }}
            >
                <Typography
                    variant={"h5"}
                    sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
                >
                    {title}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <>
                    {description}
                </>
            </Card>
        </Grid>
    )
}

export default CourseCard;