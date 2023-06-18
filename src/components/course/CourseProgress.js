import { Box, Card, Typography, Divider } from "@mui/material";

export default function CourseProgress({ router }) {
  let { courseid } = router.query;

  return (
    <Box
      sx={{
        width: "90%",
        height: "400px",
        background: "white",
        color: "black",
        borderRadius: "5px",
        bgcolor: "secondary.main",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "15%",
        }}
      >
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: "550",
            color: "secondary.contrastText",
          }}
        >
          Course Progress
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "85%",
        }}
      ></Box>
    </Box>
  );
}
