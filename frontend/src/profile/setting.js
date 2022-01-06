import React from "react";
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
import { Divider } from "@material-ui/core";
import LoadingButton from "@mui/lab/LoadingButton";
import { PhotoCameraOutlined, Send } from "@material-ui/icons";

const Input = styled("input")({
  display: "none",
});
const Setting = () => {
  return (
    <>
      <Typography my={1} variant="h4">
        Edit your profile
      </Typography>
      <Divider />
      <Stack spacing={1}>
        <Typography variant="h6">Username</Typography>
        <TextField id="username" variant="filled" />
        <Typography variant="h6">Email</Typography>
        <TextField id="email" variant="filled" />
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
        >
          Send
        </LoadingButton>
      </Stack>
    </>
  );
};
export default Setting;
