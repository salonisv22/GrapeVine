import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Stack } from "@mui/material";
import { TextField, Box, IconButton, Link, Button } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { useLoginMutation } from "../services/authenticationApi";
import { addAlertMessage } from "../redux/alertMessage";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [login, loginData] = useLoginMutation();

  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(loginData);
    if (loginData.isError) {
      dispatch(
        addAlertMessage({
          severity: "error",
          message:
            loginData.error.data.detail || "Username or Password is incorrect",
        })
      );
    } else if (loginData.isSuccess) {
      localStorage.setItem("grapevine", loginData.data.access);
      navigate("/home");
    }
  }, [dispatch, navigate, loginData]);

  return (
    <Box>
      <h1 style={{ textAlign: "center" }}>GrapeVine</h1>
      <Stack direction={"row"} style={{ padding: "2rem" }}>
        <Stack justifyContent={"space-around"} sx={{ width: "350px" }}>
          <img
            style={{ alignSelf: "center" }}
            alt=""
            width={300}
            src="/assets/login.svg"
          />
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
        <Box sx={{ width: "22vw", height: "65vh", padding: "0px 35px 0 35px" }}>
          <h2>Welcome Back</h2>
          <Stack spacing={2}>
            <TextField
              required
              onChange={(e) => {
                if (e.target.value === "") setIsUsernameValid(false);
                else setIsUsernameValid(true);
                setUsername(e.target.value);
              }}
              size="small"
              value={username}
              variant="outlined"
              label="Username"
              placeholder="Username"
              error={!isUsernameValid}
              helperText={
                isUsernameValid ? undefined : "This is a required field"
              }
            />
            <TextField
              required
              onChange={(e) => {
                if (e.target.value === "") setIsPasswordValid(false);
                else setIsPasswordValid(true);
                setPassword(e.target.value);
              }}
              size="small"
              variant="outlined"
              label="Password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              error={!isPasswordValid}
              helperText={
                isPasswordValid ? undefined : "This is a required field"
              }
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
                onClick={() => {
                  const validUsername =
                    username !== "" && username !== undefined;
                  const validPassword =
                    password !== "" && username !== undefined;
                  setIsUsernameValid(validUsername);
                  setIsPasswordValid(validPassword);

                  if (validPassword && validUsername)
                    login({ email: username, password: password });
                }}
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
