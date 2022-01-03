import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

import { TextField, Box, IconButton, Link, Button } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useLoginMutation } from "../services/loginService";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [login, loginData] = useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (loginData.data && loginData.data.access) {
      alert("Yay");
    }
  }, [loginData]);

  return (
    <Box>
      <h1 style={{ textAlign: "center" }}>GrapeVine</h1>
      <Stack direction={"row"} style={{ padding: "2rem" }}>
        <Stack>
          <img alt="" width={300} src="/assets/login.svg" />
          <Box display="inline-block" style={{ paddingTop: "1rem" }}>
            <Link
              component="button"
              onClick={() => navigate("/register")}
              underline="none"
            >
              Don't have an account, create one.
            </Link>
          </Box>
        </Stack>
        <Box sx={{ padding: "0px 35px 35px 35px" }}>
          <h2>Welcome Back</h2>
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
            <Box display="inline-block">
              <Link component="button" href="#" underline="none">
                forgot password?
              </Link>
            </Box>
            <Box style={{ textAlign: "right" }} display="inline-block">
              <Button
                onClick={() => login({ email: username, password: password })}
                variant="contained"
              >
                Login
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
export default Login;
