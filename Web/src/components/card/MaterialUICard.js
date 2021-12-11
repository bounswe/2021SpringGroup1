import * as React from 'react';
import { styled } from '@mui/material/styles';
import MaterialCard from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import myDate from 'utils/methods'
import { ImageList, ImageListItem } from '@mui/material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PostCard({ posts }) {
    const [expanded, setExpanded] = React.useState(false);
    const [isAnyImage, setIsAnyImage] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <MaterialCard sx={{ maxWidth: 900, margin: 'auto', backgroundColor: 'Lavender', marginBlockEnd: '20px' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {posts["poster_name"].substring(0, 1).toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={posts["community"]}
                // title={myDate(posts["created_date"])}
                subheader={posts["poster_name"]}
            />
            <CardContent>
                <Typography variant="body2" color="text.first">
                    {posts["title"]}
                </Typography>
            </CardContent>
            {/* {(() => {
                for (let i = 0; i < posts["data_fields"].length; i++) {
                    if (posts["data_fields"][i]["type"] === "image") {
                        setIsAnyImage(true);
                    }
                }
            })()} */}
            {/*
            {posts["data_fields"].map((field) => (
                <div>
                    {field["type"] === "text" &&
                        <Typography paragraph>
                            {field["content"][Object.keys(field["content"])[0]]}
                        </Typography>}
                    {field["type"] === "image" &&
                        <CardMedia>

                        </CardMedia>}
                </div>

            ))} */}
            {/* <CardMedia >
                <ImageList
                    sx={{ width: 800, height: 150 }}
                    variant="quilted"
                    cols={3}
                    rowHeight={150}
                >
                    {posts["data_fields"].map((field) => (field["type"] === "image" &&
                        <ImageListItem cols={field.cols || 1} rows={field.rows || 1}>
                            <img
                                src={field["content"][Object.keys(field["content"])[0]]}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </CardMedia> */}
            <div class="latest-photos">
                <div class="row"><div class="col-md-4">
                    <figure> <img class="img-fluid" src="https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" alt="" />
                        {/* </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" alt="" />
                        </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://i4.hurimg.com/i/hurriyet/75/1110x740/5b8e6d967152d827603dd434.jpg" alt="" />
                        </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" />
                        </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="" />
                        </figure></div><div class="col-md-4"> <figure> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" />
                        </figure></div><div class="col-md-4"> <figure class="mb-0"> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                        </figure></div><div class="col-md-4"> <figure class="mb-0"> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="" />
                        </figure></div><div class="col-md-4"> <figure class="mb-0"> <img class="img-fluid" src="https://bootdey.com/img/Content/avatar/avatar9.png" alt="" /> */}
                    </figure></div></div></div>


            {posts["data_fields"].map((field) => (
                <div>
                    {field["type"] === "text" &&
                        <Typography paragraph>
                            {field["content"][Object.keys(field["content"])[0]]}
                        </Typography>}

                </div>

            ))}

            {/* {(() => {
                setIsAnyImage(false);
            })()} */}

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                {/* <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore> */}
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </MaterialCard>
    );
}
