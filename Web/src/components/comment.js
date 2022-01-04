import CommentForm from "./commentForm";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, Paper } from "@material-ui/core";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MUIButton from '@mui/material/Button';

const Comment = ({ comment, replies, addCommentBackend, replied_comment = null, setActiveComment, activeComment }) => {

    const created_date = new Date(comment.created_date).toLocaleString('tr-TR');
    const replyId = replied_comment ? replied_comment : comment.id;
    const canReply = true;
    const isReplying =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === "replying";
    return (
        <>
            <Paper
                key={comment.id}
                style={{ backgroundColor: 'Lavender', marginBlockEnd: "10px" }}
            >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={comment.commenter_name}
                    subheader={new Date(created_date).toLocaleString('tr-TR').substring(0, 16)}
                />
                <CardContent>
                    <Typography paragraph>
                        {comment.body}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    {canReply && (
                        <MUIButton variant="outlined" size="small" onClick={() =>
                            setActiveComment({ id: comment.id, type: "replying" })
                        }>
                            Reply
                        </MUIButton>
                    )}
                    {isReplying && (
                        <CommentForm
                            handleSubmit={(text) => addCommentBackend(text, replyId)}
                        />
                    )}
                </CardActions>
            </Paper>
            {
                replies.length > 0 && (
                    <div style={{ marginLeft: "40px" }}>
                        {replies.map((reply) => (
                            <Comment
                                comment={reply}
                                key={reply.id}
                                addCommentBackend={addCommentBackend}
                                replied_comment={comment.id}
                                replies={[]}
                            />
                        ))}
                    </div>
                )
            }
        </>


    );
};

export default Comment;
