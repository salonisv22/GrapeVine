import { Grid, Box, Divider } from "@material-ui/core";
import { Stack } from "@mui/material";

const NotFound = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        position: "absolute",
        height: "100%",
      }}
    >
      <Grid item>
        <Box display="inline-block">
          <Stack spacing={6}>
            <img width={400} src="/assets/404.svg" alt="" />
            <Stack
              direction="row"
              spacing={4}
              alignItems={"center"}
              justifyContent={"center"}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <h2>
                <b>404</b>
              </h2>
              <p>This page could not be found.</p>
            </Stack>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};
export default NotFound;
