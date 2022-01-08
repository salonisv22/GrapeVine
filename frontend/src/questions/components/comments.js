import { useState } from "react";
import { Divider, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";

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
                  {new Date(item.commented_at).toLocaleString([], {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <Divider variant="middle" />
              </>
            );
          })
        ) : (
          <></>
        )}
      </Stack>
      <form onSubmit={() => onCommentSubmit(id, comment)}>
        <TextField
          label="Add a comment"
          id="standard-size-small"
          size="small"
          variant="standard"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </form>
    </>
  );
};

export default Comments;
