import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TextField, Box, IconButton, Link, Button } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { useCreateUserMutation } from "../services/usersService";
import { addAlertMessage } from "../redux/alertMessage";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const passwordsMatch =
    password === undefined ||
    password === "" ||
    confirmPassword === undefined ||
    confirmPassword === "" ||
    password === confirmPassword;

  useEffect(() => {
    if (createUserData.isError) {
      const { username, email, password } = createUserData.error.data;
      const message = username || email || password;
      if (createUserData.error.data)
        dispatch(
          addAlertMessage({
            severity: "error",
            message: message,
          })
        );
    } else if (createUserData.isSuccess) {
      navigate("/login");
      dispatch(
        addAlertMessage({
          severity: "info",
          message: "User created Successfully",
        })
      );
    }
  }, [createUserData, dispatch, navigate]);

  return (
    <Box>
      <h1 style={{ textAlign: "center" }}>GrapeVine</h1>
      <Stack direction={"row"} style={{ padding: "2rem" }}>
        <Stack justifyContent={"space-around"} sx={{ width: "350px" }}>
          <img
            style={{ alignSelf: "center" }}
            alt=""
            width={300}
            src="/assets/register.svg"
          />
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
        <Box sx={{ width: "22vw", height: "65vh", padding: "0px 35px 0 35px" }}>
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
              onBlur={() =>
                setIsPasswordValid(password && password.length >= 6)
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
                  let message = undefined;
                  if (!isUsernameValid) {
                    message = "Username is not valid";
                  } else if (!isEmailValid) {
                    message = "Email is not valid";
                  } else if (!isPasswordValid || password === undefined) {
                    message = "Password is not valid";
                  } else if (confirmPassword === undefined || !passwordsMatch) {
                    message = "Passwords don't match";
                  }
                  if (message !== undefined) {
                    dispatch(
                      addAlertMessage({
                        severity: "error",
                        message: message,
                      })
                    );
                  } else {
                    createUser({
                      username: username,
                      email: email,
                      password: password,
                    });
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
