import { questions } from "./ques";
import {
  Container,
  Divider,
  Button,
  Fab,
  Radio,
  ButtonGroup,
} from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Stack, Grid, Paper,styled } from "@mui/material";
import AddIcon from "@material-ui/icons/Add";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  fontFamily: "cursive",
  padding: theme.spacing(0.25, 0.5),
  backgroundColor: "#6C63FF",
  textAlign: "center",
  color: "white",
}));

const AllQuestions = () => {
  return (
    <>
      <Container>
        <h2>All Questions</h2>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item >
            <ButtonGroup
              variant="outlined"
              aria-label="outlined primary button group"
              style={{ fontSize: 20 }}
            >
              <Button size="small" control={<Radio />}>
                Newest
              </Button>
              <Button size="small" control={<Radio />}>
                Most Answered
              </Button>
              <Button size="small" control={<Radio />}>
                Active
              </Button>
              <Button size="small" control={<Radio />}>
                Votes
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item style={{ marginBottom: "10px" }}>
            <Fab variant="extended" color="primary" aria-label="add">
              <AddIcon />
              Ask Question
            </Fab>
          </Grid>
        </Grid>
        <Divider />
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
                <Grid container spacing={2}>
                  <Grid item xs="auto">
                    <List>
                      <ListItem disablePadding justifyContent="center">
                        <ListItemText
                          edge="end"
                          primary={upvote_count + downvote_count}
                          secondary="votes"
                        />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemText
                          edge="end"
                          textAlign="center"
                          primary={upvote_count + downvote_count}
                          secondary="Answers"
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs>
                    <h3>{title}</h3>
                    <p>{description}</p>
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
                <Divider />
              </Container>
            </>
          );
        })}
      </Container>
    </>
  );
};

export default AllQuestions;
