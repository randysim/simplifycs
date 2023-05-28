import { Typography, Box } from "@mui/material";

export default function UnitLesson({ router, data }) {
  let { courseid, unitid } = router.query;

  return (
    <Box
      sx={{
        width: "80%",
        minWidth: "400px",
        padding: "20px",
        border: "4px solid white",
        marginTop: "50px"
      }}
      /* 
      onClick={() => {
        router.push(`/courses/${courseid}/${unitid}/${data.id}`);
      }}
      */
    >
      {/* unit lesson component later */}
      <Typography>{data.title}</Typography>
      <Box sx={{ width: "100%"}}>
        {data.activities.map(activity => {
          
          return (
            <Box
              sx={{
                cursor: "pointer",
                background: "red",
                marginTop: "10px",
                padding: "10px",
                display: "flex",
                justifyContent: "center"
              }} 
              key={activity.id}
              onClick={() => { router.push(`/courses/${courseid}/${unitid}/${data.id}/${activity.id}`) }}
            >
              {activity.title} - {activity.model}
            </Box>
          )
        })}
      </Box>
    </Box>
  );
}
