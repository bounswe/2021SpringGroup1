import * as React from 'react';
import { useState } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import myDate from 'utils/methods'
import { Carousel, Image, Row, Col, Button } from 'react-bootstrap';
import { Grid, Paper } from "@material-ui/core";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Modal from 'react-bootstrap/Modal'
import { deletePost } from 'store/actions/communityAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {confirm} from "react-confirm-box";
 


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


export default function PostCard({ posts,canDelete,handleParentData }) {
    const history = useHistory();
    const dispatch=useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const [isAnyImage, setIsAnyImage] = React.useState(false)
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
        posts["data_fields"].map((field) => (field["type"] === "image" && !isAnyImage &&
            setIsAnyImage(true)
        ));
    

    // const comments = [{ username: "gktpgktp", text: "hoşgeldin deneme", date: new Date() }];

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(posts)


    const handleDeleteClick = async (postId) => {
        const result = await confirm("Are you sure?");
        if (result) {
            dispatch(deletePost({ post_id: postId }));
            handleParentData();
            return;
        }
        console.log("You click No!");

      };
    const handleEditClick = (postId,post) => {
        console.log("poster",postId);
        history.push("/editPost/"+postId, {post:post});
        
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
                    <div>
                    {canDelete && <IconButton onClick={() => {
                            handleEditClick(posts["id"],posts);
                        }} aria-label="settings">
                        <EditIcon />

                        

                    </IconButton>}
                    {canDelete && <IconButton onClick={() => {
                            handleDeleteClick(posts["id"]);
                        }} aria-label="settings">
                        <DeleteIcon />

                        

                    </IconButton>}
                    
                    </div>
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

                                        {field["type"] !== "location" ?
                                            (
                                                <Typography paragraph>
                                                    {field["content"][Object.keys(field["content"])[0]]}
                                                </Typography>
                                            )
                                            :
                                            Object.keys(field["content"]).length > 1

                                                ?
                                                <Row>
                                                    <Col>
                                                        <Typography paragraph>
                                                            {field["content"]["adrs"]}
                                                        </Typography>
                                                    </Col>
                                                    <Col>
                                                        <>
                                                            <Button style={{ marginBottom: "20px" }} onClick={handleShow} variant="primary">
                                                                Click to see the location on map.
                                                            </Button>

                                                            <Modal show={show} onHide={handleClose}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>Location</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <LoadScript googleMapsApiKey="AIzaSyA-6FuNEHHEB49Rz6NL4std-cGkzKgnau8">
                                                                        <GoogleMap
                                                                            id="map"
                                                                            mapContainerStyle={{ height: "400px" }}
                                                                            zoom={8}
                                                                            center={{
                                                                                lat: field["content"]["marker"].lat,
                                                                                lng: field["content"]["marker"].lng
                                                                            }}
                                                                            onLoad={onMapLoad}
                                                                        >
                                                                            <Marker
                                                                                position={{
                                                                                    lat: field["content"]["marker"].lat,
                                                                                    lng: field["content"]["marker"].lng
                                                                                }}
                                                                            />
                                                                        </GoogleMap>
                                                                    </LoadScript>
                                                                </Modal.Body>
                                                                <Modal.Footer>
                                                                    <Button variant="secondary" onClick={handleClose}>
                                                                        Close
                                                                    </Button>
                                                                </Modal.Footer>
                                                            </Modal>
                                                        </>
                                                    </Col>
                                                </Row>
                                                :
                                                <Typography paragraph>
                                                    {field["content"][Object.keys(field["content"])[0]]}
                                                </Typography>
                                        }
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
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {/* <CardContent>
                     <h1>Comments</h1>
                    <div>

                        {showAddComment()} 
                        {comments.map((item, index) => {
                            if (item) {
                                return (
                                    <Paper
                                        key={index}
                                    // style={{ padding: "40px 20px"}}
                                    >
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
                                        <Grid container wrap="nowrap" spacing={2}>
                                            <Grid item>
                                                <Avatar alt={item.username} src="" />
                                            </Grid>
                                            <Grid justifyContent="left" item xs zeroMinWidth>
                                                <h4 style={{ margin: 0, textAlign: "left" }}>
                                                    {item.username}
                                                </h4>
                                                <p style={{ textAlign: "left" }}>{item.text}</p>
                                                <p style={{ textAlign: "left", color: "gray" }}>
                                                    {new Date(item.date).toLocaleString('tr-TR')}
                                                </p>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                );
                            }
                        })}
                    </div>
                </CardContent> */}
            </Collapse>
        </MaterialCard >
    );
}
