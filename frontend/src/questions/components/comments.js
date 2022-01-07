import {Divider} from "@mui/material"
import { typography } from "@mui/system";
import { Stack } from "@mui/material";


const Comments = ({ comments }) => {
    return (
      <>
        <Stack direction="row" spacing={0.5}>
                <Divider variant="middle" />
                {
            comments.map((comment) => {
                      <>
                        <typography variant="caption">{comment}</typography>
                        <Divider variant="middle" />
                      </>;
                        
                    })
                }
                
        </Stack>
      </>
    );
    
};

export default Comments;