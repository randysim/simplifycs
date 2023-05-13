import { Box } from "@mui/material";

export default function UnitLesson({ router, data }) {
  let { courseid, unitid } = router.query;
  return (
    <Box
      sx={{
        width: "80%",
        minWidth: "400px",
        padding: "20px",
        border: "4px solid white",
        marginTop: "50px",
        cursor: "pointer",
      }}
      onClick={() => {
        router.push(`/courses/${courseid}/${unitid}/${data.id}`);
      }}
    >
      {/* unit lesson component later */}
      {data.title}
    </Box>
  );
}
