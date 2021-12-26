import { useState } from "react";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TextField, Box, IconButton, Link, Button } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <Box>
      <h1 style={{ textAlign: "center" }}>GrapeVine</h1>
      <Stack direction={"row"} style={{ padding: "2rem" }}>
        <Stack>
          <img alt="" width={300} src="/assets/login.svg" />
          <Box display="inline-block" style={{ paddingTop: "1rem" }}>
            <Link
              component="button"
              onClick={() => navigate("/login")}
              underline="none"
            >
              Already Have an account, login instead.
            </Link>
          </Box>
        </Stack>
        <Box sx={{ padding: "0px 35px 35px 35px" }}>
          <h2>Create a new account</h2>
          <Stack spacing={2}>
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              size="small"
              value={username}
              variant="outlined"
              label="Username"
              placeholder="Username"
            />
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              size="small"
              value={username}
              variant="outlined"
              label="Email Address"
              placeholder="Email Address"
            />
            <TextField
              onChange={(e) => setPassword(e.target.password)}
              size="small"
              variant="outlined"
              label="Password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              onChange={(e) => setPassword(e.target.password)}
              size="small"
              variant="outlined"
              label="Confirm Password"
              placeholder="Confirm Password"
              type={showPassword ? "text" : "password"}
              value={password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            {/* <Box display="inline-block">
              <Link component="button" href="#" underline="none">
                forgot password?
              </Link>
            </Box> */}
            <Box style={{ textAlign: "right" }} display="inline-block">
              <Button variant="contained">Register</Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Register;
