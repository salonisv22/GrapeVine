import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TextField, Box, IconButton, Link, Button } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { useCreateUserMutation } from "../services/usersService";
import { addAlertMessage } from "../redux/alertMessage";

const Register = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [createUser, createUserData] = useCreateUserMutation();

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passwordsMatch =
    password === undefined ||
    password === "" ||
    confirmPassword === undefined ||
    confirmPassword === "" ||
    password === confirmPassword;

  useEffect(() => {
    if (createUserData.isSuccess) {
      navigate("/login");
    }
  }, [createUserData, navigate]);

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
              onChange={(e) => {
                if (!isUsernameValid)
                  setIsUsernameValid(
                    String(e.target.value)
                      .toLowerCase()
                      .match(/^[a-zA-Z0-9_]{3,}[a-zA-Z0-9_]*$/)
                  );
                setUsername(e.target.value);
              }}
              size="small"
              value={username}
              variant="outlined"
              label="Username"
              placeholder="Username"
              error={!isUsernameValid}
              helperText={
                isUsernameValid ? undefined : (
                  <>
                    Username should contain only alphanumerics or
                    <br /> underscore and have atleast 3 characters
                  </>
                )
              }
              onBlur={() => {
                setIsUsernameValid(
                  String(username)
                    .toLowerCase()
                    .match(/^[a-zA-Z0-9_]{3,}[a-zA-Z0-9_]*$/)
                );
              }}
            />
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
                if (!isEmailValid)
                  setIsEmailValid(
                    String(e.target.value)
                      .toLowerCase()
                      .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      )
                  );
              }}
              size="small"
              value={email}
              variant="outlined"
              label="Email Address"
              placeholder="Email Address"
              error={!isEmailValid}
              helperText={isEmailValid ? undefined : "Enter a valid email"}
              onBlur={() => {
                setIsEmailValid(
                  String(email)
                    .toLowerCase()
                    .match(
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )
                );
              }}
            />
            <TextField
              onChange={(e) => {
                if (!isPasswordValid)
                  setIsPasswordValid(e.target.value.length >= 6);
                setPassword(e.target.value);
              }}
              size="small"
              variant="outlined"
              label="Password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              error={!isPasswordValid}
              helperText={<>Password should have atleast 6 characters</>}
              onBlur={() => setIsPasswordValid(password.length >= 6)}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
              size="small"
              variant="outlined"
              label="Confirm Password"
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              error={!passwordsMatch}
              helperText={passwordsMatch ? undefined : "Passwords don't match"}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Box style={{ textAlign: "right" }} display="inline-block">
              <Button
                onClick={() => {
                  if (passwordsMatch) {
                    createUser({
                      username: username,
                      email: email,
                      password: password,
                    });
                  } else {
                    dispatch(
                      addAlertMessage({
                        isVisible: true,
                        severity: "warning",
                        message: "Passwords don't match!",
                      })
                    );
                  }
                }}
                variant="contained"
              >
                Register
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Register;
