import { Grid, Box, Link, Typography } from "@mui/material";

export default function CourseUnit({ router, id, data }) {
  let { courseid } = router.query;

  return (
    <Grid
      item
      xs={12}
      sx={{
        bgcolor: "gray",
        width: "100%",
        minWidth: "500px",
        minHeight: "200px",
        cursor: "pointer",
        borderRadius: "5px",
        marginTop: "15px",
      }}
      key={id}
    >
      <Box width="100%" height="20%" display="flex" justifyContent="center">
        <Link
          href={`${courseid}/${data.id}`}
          sx={{ fontSize: 20 }}
          color="primary.contrastText"
        >
          Unit: {data.title}
        </Link>
      </Box>
      <Grid container width="100%" height="80%">
        {data.lessons.map((l, i) => {
          return (
            <Box
              key={i}
              width="25%"
              height="25%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ textDecoration: "underline" }}
            >
              <Typography>
                {l.title}
              </Typography>
            </Box>
          );
        })}
      </Grid>
    </Grid>
  );
}
