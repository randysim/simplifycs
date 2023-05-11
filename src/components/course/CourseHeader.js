import { Box, Typography } from "@mui/material";

export default function CourseHeader({ title, description, bgcolor }) {
  return (
    <Box width="100%" bgcolor={bgcolor}>
      <Typography sx={{ fontSize: 30 }}>{title}</Typography>
      <Typography sx={{ fontSize: 14 }}>{description}</Typography>
    </Box>
  );
}
