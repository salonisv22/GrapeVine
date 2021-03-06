import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Card, Grid } from "@material-ui/core";

const Authentication = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("grapevine")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", background: "#222333" }}
    >
      <Grid item>
        <Box display="inline-block">
          <Card variant="outlined">
            <Box sx={{ width: "100%" }}>
              <Outlet />
            </Box>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Authentication;
