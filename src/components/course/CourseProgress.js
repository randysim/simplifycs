import { Box, Card, Typography } from "@mui/material";

export default function CourseProgress({ router }) {
  let { courseid } = router.query;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Card
        sx={{
          cursor: "pointer",
          width: "90%",
          height: "400px",
          background: "white",
          color: "black",
          padding: "10px",
        }}
      >
        <Typography sx={{ fontSize: 20 }}>Course Progress</Typography>
      </Card>
    </Box>
  );
}
