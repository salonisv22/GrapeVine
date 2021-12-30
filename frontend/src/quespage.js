import { questions } from "./ques";
import { Stack, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container, Divider } from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpSharpIcon from "@material-ui/icons/ArrowDropUpSharp";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import { fontFamily, textAlign } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    fontFamily:"cursive",
    padding: theme.spacing(0.25, 0.5),
  backgroundColor:"#6C63FF",
  textAlign: "center",
  color:"white",
}));

const Questions = () => {
  return (
    <>
      <div className="question_section">
        {questions.map((question) => {
          const {
            tags,
            title,
            description,
            upvote_count,
            downvote_count,
            askedat,
            lastactive,
            viewed_count,
          } = question;
          return (
            <>
              <Container fixed>
                <h1>{title}</h1>
                <plaintext sx={{color:"text.secondary", fontFamily:"Roboto"}}>Asked at:{askedat}   Last Active:{lastactive}  Viewed:{viewed_count} times</plaintext>
                <Divider />
                <Grid container spacing={2}>
                  <Grid item xs="auto">
                    <List>
                      <ListItem disablePadding>
                        <IconButton edge="end">
                          <ArrowDropUpSharpIcon fontSize="large" />
                        </IconButton>
                      </ListItem>
                      <ListItem>
                        <ListItemText edge="end" fontSize="large" primary={upvote_count - downvote_count} />
                      </ListItem>
                      <ListItem disablePadding>
                        <IconButton edge="end" aria-label="delete">
                          <ArrowDropDownSharpIcon fontSize="large" />
                        </IconButton>
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs>
                    <h4>{description}</h4>
                    <Stack direction="row" spacing={1}>
                      {tags.map((tag) => {
                        return (
                          <>
                            <Item elevation={0} variant="outlined">
                              {tag}
                            </Item>
                          </>
                        );
                      })}
                    </Stack>
                  </Grid>
                </Grid>
              </Container>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Questions;
