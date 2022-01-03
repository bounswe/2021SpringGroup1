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

const Comment = ({ comment, replies, addComment, parentId = null, currentUserId, setActiveComment, activeComment }) => {

    const createdAt = new Date(comment.createdAt).toLocaleString('tr-TR');
    const replyId = parentId ? parentId : comment.id;
    const canReply = Boolean(currentUserId);
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
                            {comment.username.substring(0, 1).toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={comment.username}
                    subheader={new Date(createdAt).toLocaleString('tr-TR').substring(0, 16)}
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
                            handleSubmit={(text) => addComment(text, replyId)}
                        />
                    )}
                    {/* <MUIButton variant="outlined" size="small" onClick={() =>
                        <CommentForm
                            handleSubmit={(text) => addComment(text, replyId)}
                        />
                    }>
                        Reply
                    </MUIButton> */}
                </CardActions>
            </Paper>
            {
                replies.length > 0 && (
                    <div style={{ marginLeft: "40px" }}>
                        {replies.map((reply) => (
                            <Comment
                                comment={reply}
                                key={reply.id}
                                addComment={addComment}
                                parentId={comment.id}
                                replies={[]}
                                currentUserId={currentUserId}
                            />
                        ))}
                    </div>
                )
            }
        </>


    );
};

export default Comment;

