import { Typography, Box } from "@mui/material";

export default function UnitLesson({ router, data }) {
  let { courseid, unitid } = router.query;
<<<<<<< HEAD
  
=======

>>>>>>> 04ab994d38acea5a6535f259a6925cab2b948194
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
      /* 
      onClick={() => {
        router.push(`/courses/${courseid}/${unitid}/${data.id}`);
      }}
      */
    >
      {/* unit lesson component later */}
      <Typography>{data.title}</Typography>
      <Box>
        {data.activites.forEach((activity) => {
          return <Box>{activity}</Box>;
        })}
      </Box>
    </Box>
  );
}
