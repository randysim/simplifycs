import { Typography, Box, Divider } from "@mui/material";

export default function UnitLesson({ router, data }) {
  let { courseid, unitid } = router.query;
  return (
    <Box
      sx={{
        width: "90%",
        minWidth: "450px",
        padding: "20px",
        border: "1px solid gray",
        marginTop: "50px",
        borderRadius: "5px",
        bgcolor: "secondary.main",
        minHeight: "250px",
        height: "auto"
      }}
      /* 
      onClick={() => {
        router.push(`/courses/${courseid}/${unitid}/${data.id}`);
      }}
      */
    >
      {/* unit lesson component later */}
      <Box sx={{ width: "100%", height: "50px" }}>
        <Typography sx={{ fontSize: "30px", fontWeight: "550"}}>{data.title}</Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ width: "100%", height: "80%"}}>
        {data.activities.map(activity => {
          
          return (
            <Box
              sx={{
                cursor: "pointer",
                marginTop: "15px",
                display: "flex",
                textDecoration: "none",
                '&:hover': { textDecoration: 'underline' }
              }} 
              key={activity.id}
              onClick={() => { router.push(`/courses/${courseid}/${unitid}/${data.id}/${activity.id}`) }}
            >
              {activity.title}{/* - {activity.model}*/}
            </Box>
          )
        })}
      </Box>
    </Box>
  );
}
