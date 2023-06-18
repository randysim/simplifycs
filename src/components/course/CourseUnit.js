import { Grid, Box, Link, Typography, Divider } from "@mui/material";

export default function CourseUnit({ router, id, data, index }) {
  let { courseid } = router.query;

  return (
    <Grid
      item
      xs={12}
      sx={{
        bgcolor: "secondary.main",
        width: "100%",
        minWidth: "450px",
        height: "300px",
        borderRadius: "5px",
        marginTop: "15px",
      }}
      key={id}
    >
      <Box
        width="100%"
        height="20%"
        display="flex"
        alignItems="center"
        paddingLeft="20px"
        sx={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
      >
        <Link
          href={`${courseid}/${data.id}`}
          sx={{
            fontSize: 25,
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
          color="primary.contrastText"
          fontWeight="550"
        >
          Unit {++index}: {data.title}
        </Link>
      </Box>
      <Divider variant="middle" sx={{ bgcolor: "primary.main" }} />
      <Grid
        container
        width="100%"
        height="80%"
        sx={{ flexDirection: "column", flexWrap: "wrap" }}
      >
        {data.lessons.map((l, i) => {
          return (
            <Box
              key={i}
              width="50%"
              height="25%"
              display="flex"
              alignItems="center"
              paddingLeft="40px"
            >
              <Link
                href={`${courseid}${
                  l.activities.length
                    ? `/${data.id}/${l.id}/${l.activities[0].id}`
                    : ""
                }`}
                sx={{
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
                color="primary.contrastText"
                fontSize="20px"
              >
                {l.title}
              </Link>
            </Box>
          );
        })}
      </Grid>
    </Grid>
  );
}
