import { useState } from "react";
import { Divider, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import Time from "../../utilities/time"

const Comments = ({ id, comments, onCommentSubmit }) => {
  const [comment, setComment] = useState();

  return (
    <>
      <Stack spacing={0.5}>
        {comments ? (
          comments.map((item) => {
            return (
              <>
                <Typography variant="caption">
                  {item.comment} -<b>{item.username}</b>{" "}
                  <Time date={item.commented_at} />
                </Typography>
                <Divider variant="middle" />
              </>
            );
          })
        ) : (
          <></>
        )}
      </Stack>
      <form onSubmit={(e) => {
        e.preventDefault();
        onCommentSubmit(id, comment)
        setComment("");
      }}>
        <TextField
          label="Add a comment"
          id="standard-size-small"
          size="small"
          variant="outlined"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }
           }
        />
      </form>
    </>
  );
};

export default Comments;
