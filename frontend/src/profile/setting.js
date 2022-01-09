import React, { useState } from "react";
import {
  Avatar,
  Stack,
  Typography,
  IconButton,
  styled,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAlertMessage } from "../redux/alertMessage";
import { Divider } from "@material-ui/core";
import LoadingButton from "@mui/lab/LoadingButton";
import { PhotoCameraOutlined, Send } from "@material-ui/icons";
import { useUpdateUserMutation } from "../services/usersApi";

const Input = styled("input")({
  display: "none",
});


const Setting = ({id}) => {
  const [updateUser, updateUserData] = useUpdateUserMutation(id);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [theme, setTheme] = useState();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
   const [emailHelperText, setEmailHelperText] = useState();
  const [usernameHelperText, setUsernameHelperText] = useState();
  

  const dispatch = useDispatch();


  useEffect(() => {
    if (updateUserData.isError) {
      const { username, email} = updateUserData.error.data;
      const message = username || email ;
      if (updateUserData.error.data)
        dispatch(
          addAlertMessage({
            severity: "error",
            message: message,
          })
        );
    } else if (updateUserData.isSuccess) {
      dispatch(
        addAlertMessage({
          severity: "info",
          message: "Updated Successfully",
        })
      );
    }
  }, [updateUserData, dispatch]);

  return (
    <>
      <Typography my={1} variant="h4">
        Edit your profile
      </Typography>
      <Divider />
      <Stack spacing={1}>
        <Typography variant="h6">Username</Typography>
        <TextField
          required
          id="username"
          variant="filled"
          onChange={(e) => {
            setUsername(e.target.value);
            if (!isUsernameValid) {
              const validUsername = String(e.target.value)
                .toLowerCase()
                .match(/^[a-zA-Z0-9_]{3,}[a-zA-Z0-9_]*$/);
              setIsUsernameValid(validUsername);
              setUsernameHelperText(
                "Username should contain only alphanumerics or undescore and have atleast 3 characters"
              );
            }
          }}
          value={username}
          error={!isUsernameValid}
          helperText={isUsernameValid ? undefined : usernameHelperText}
          onBlur={() => {
            const validUsername = String(username)
              .toLowerCase()
              .match(/^[a-zA-Z0-9_]{3,}[a-zA-Z0-9_]*$/);
            setIsUsernameValid(validUsername);
            if (!validUsername)
              setUsernameHelperText(
                <>
                  Username should contain only alphanumerics or undescore <br />{" "}
                  and have atleast 3 characters
                </>
              );
          }}
        />
        <Typography variant="h6">Email</Typography>
        <TextField
          required
          id="email"
          variant="filled"
          onChange={(e) => {
            setEmail(e.target.value);
            if (!isEmailValid) {
              const validEmail = String(e.target.value)
                .toLowerCase()
                .match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
              setIsEmailValid(validEmail);
              if (!validEmail) setEmailHelperText("Enter a valid email");
            }
          }}
          value={email}
          placeholder="Email Address"
          error={!isEmailValid}
          helperText={isEmailValid ? undefined : emailHelperText}
          onBlur={() => {
            const validEmail = String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );

            setIsEmailValid(validEmail);
            if (!validEmail) setEmailHelperText("Enter a valid email");
          }}
        />
        <Typography variant="h6">Theme</Typography>

        <RadioGroup row aria-label="theme" name="row-radio-buttons-group">
          <FormControlLabel value="Dark" control={<Radio />} label="Dark" />
          <FormControlLabel value="Light" control={<Radio />} label="Light" />
        </RadioGroup>
        <Typography variant="h6">About me</Typography>
        <TextField id="about_me" multiline rows={3} variant="filled" />
        <Typography variant="h6">Upload Profile Picture</Typography>
        <Avatar
          sx={{ backgroundColor: "#3f51b5", width: 50, height: 50 }}
          alt="Cindy Baker"
        >
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton
              sx={{ backgroundColor: "white" }}
              aria-label="upload picture"
              component="span"
            >
              <PhotoCameraOutlined />
            </IconButton>
          </label>
        </Avatar>
        <LoadingButton
          // onClick={handleClick}
          endIcon={<Send />}
          //   loading={loading}
          loadingPosition="end"
          variant="contained"
          sx={{ backgroundColor: "#3f51b5" }}
          onClick={() => {
            let message = undefined;
            let allRequiredSet = true;
            if (username === undefined || username === "") {
              setIsUsernameValid(false);
              setUsernameHelperText("This field is required");
              allRequiredSet = false;
            }
            if (email === undefined || email === "") {
              setIsEmailValid(false);
              setEmailHelperText("This field is required");
              allRequiredSet = false;
            }
            

            if (!isUsernameValid) {
              message = "Username is not valid";
            } else if (!isEmailValid) {
              message = "Email is not valid";
            }

            if (message !== undefined) {
              dispatch(
                addAlertMessage({
                  severity: "error",
                  message: message,
                })
              );
            } else if (allRequiredSet) {
              updateUser({ id,
                newInfo:{
                username: username,
                email: email,
              }});
            }
          }}
        >
          Send
        </LoadingButton>
      </Stack>
    </>
  );
};
export default Setting;
