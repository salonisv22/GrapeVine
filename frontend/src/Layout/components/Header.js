import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  styled,
  alpha,
  Button,
  IconButton,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Search as SearchIcon, AccountCircle } from "@material-ui/icons/";
// import { Icon } from "@mui/icons-material";

import { Stack } from "@mui/material";

const headersData = [
  {
    label: "Questions",
    href: "/question",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "My Account",
    href: "/profile",
  },
  {
    label: "Log In",
    href: "/auth/login",
  },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: 50,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const navigate = useNavigate();
  const displayDesktop = () => {
    return (
      <Toolbar>
        <Typography
          variant="h6"
          component="h1"
          style={{
            fontFamily: "Work Sans, sans-serif",
            fontWeight: 600,
            color: "#FFFEFE",
            textAlign: "left",
          }}
        >
          GrapeVine
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Stack direction="row" alignItems={"center"} flexGrow={2}>
          <Stack direction="row">
            {headersData.map(({ label, href }) => {
              return (
                <Button
                  {...{
                    key: label,
                    color: "inherit",
                    to: href,
                    component: Link,
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </Stack>
          <Stack sx={{ ml: "auto" }}>
            {localStorage.getItem("grapevine") ? (
              <IconButton onClick={() => navigate("/profile")} color="inherit">
                <AccountCircle />
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                {...{
                  key: "login",
                  color: "inherit",
                  to: "/auth/login",
                  component: Link,
                }}
              >
                login
              </Button>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar position="relative">{displayDesktop()}</AppBar>
    </header>
  );
}
