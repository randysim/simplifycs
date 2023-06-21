import { Box, Typography } from "@mui/material";

export default function CourseHeader({ title, description }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "150px",
        bgcolor: "primary.main",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ fontSize: 60, fontWeight: "550" }}>{title}</Typography>
      <Typography sx={{ fontSize: 18 }}>{description}</Typography>
    </Box>
  );
}
