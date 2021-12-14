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
import { Carousel, Image, Row, Col } from 'react-bootstrap';

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
    const [isAnyImage, setIsAnyImage] = React.useState(false)
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    {
        posts["data_fields"].map((field) => (field["type"] === "image" && !isAnyImage &&
            setIsAnyImage(true)
        ))
    }
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
                title={posts["community_name"]}
                // title={myDate(posts["created_date"])}
                subheader={posts["poster_name"]}
            />
            <CardContent>
                <Row>
                    <Col sm={2}>
                        <Typography variant="body2" color="text.first">
                            Post Title:
                        </Typography>
                    </Col>
                    <Col>
                        <Typography variant="body2" color="text.first">
                            {posts["title"]}
                        </Typography>
                    </Col>
                </Row>

            </CardContent>

            {isAnyImage &&
                <CardMedia>
                    <Carousel prevLabel="" nextLabel="" slide={false} interval={5000000}>
                        {
                            posts["data_fields"].map((field) => (field["type"] === "image" &&
                                <Carousel.Item >
                                    <Image style={{ height: "480px" }}
                                        className="d-block w-100"
                                        src={field["content"][Object.keys(field["content"])[0]]}
                                    />
                                </Carousel.Item>
                            ))
                        }
                    </Carousel>
                </CardMedia>
            }

            <CardContent>
                {
                    posts["data_fields"].map((field) => (
                        <div>
                            {field["type"] !== "image" &&
                                <Row>
                                    <Col sm={2}>
                                        {field["name"] + ":"}
                                    </Col>
                                    <Col>
                                        <Typography paragraph>
                                            {field["content"][Object.keys(field["content"])[0]]}
                                        </Typography>
                                    </Col>
                                </Row>
                            }
                        </div>
                    ))
                }
            </CardContent>
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
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
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
            </Collapse> */}
        </MaterialCard>
    );
}
