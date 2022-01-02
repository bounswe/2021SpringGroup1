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
import myDate from 'utils/methods'
import { Carousel, Image, Row, Col, Button } from 'react-bootstrap';
import { Grid, Paper } from "@material-ui/core";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Modal from 'react-bootstrap/Modal'
import ReactPlayer from 'react-player'
import { FormControlLabel, Checkbox } from '@mui/material';

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

const deneme = [
    {
        "name": "yenivideo",
        "type": "text",
        "content": {
            "value": "deneme Video"
        },
        "reference_name": "Text%20Field"
    },
    {
        "name": "urlvideo",
        "type": "video",
        "content": {
            "value": "https://www.twitch.tv/videos/1247081176"
        },
        "reference_name": "Video%20Field"
    },
    {
        "name": "çıkıştarihi",
        "type": "date",
        "content": {
            "value": "2022-01-02"
        },
        "reference_name": "Date%20Field"
    }
];

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

    const comments = [{ username: "gktpgktp", text: "hoşgeldin deneme", date: new Date() }];

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deneme_select = [
        {
            "name": "Name",
            "type": "text",
            "content": {
                "value": "Muhammed"
            }
        },
        {
            "name": "Age",
            "type": "number",
            "content": {
                "value": 23
            }
        },
        {
            "name": "Gender",
            "type": "selection",
            "content": {
                "value": {
                    "Male": true,
                    "Female": false
                }
            }
        }
    ];

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
                        //deneme_select.map((field) => (
                        <div>
                            {(field["type"] === "text" || field["type"] === "number")
                                &&
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
                            {field["type"] === "date"
                                &&
                                <Row>
                                    <Col sm={2}>
                                        {field["name"] + ":"}
                                    </Col>
                                    <Col>
                                        <Typography paragraph>
                                            {new Date(field["content"][Object.keys(field["content"])[0]]).toLocaleString('tr-TR').substring(0,10)}
                                        </Typography>
                                    </Col>
                                </Row>
                            }
                            {field["type"] === "selection"
                                &&
                                <Row>
                                    <Col sm={2}>
                                        {field["name"] + ":"}
                                    </Col>
                                    <>
                                        {Object.keys(field["content"]["value"]).map((key, index) => (
                                            <Col>
                                                <Typography paragraph>
                                                    {field["content"]["value"][key] === true &&
                                                        <FormControlLabel disabled control={<Checkbox defaultChecked />} label={key} />
                                                        // :
                                                        // <FormControlLabel disabled control={<Checkbox />} label={key} />
                                                    }
                                                </Typography>
                                            </Col>
                                        ))}
                                    </>
                                </Row>
                            }
                            {field["type"] === "video"
                                &&
                                <Row>
                                    <Col sm={2}>
                                        {field["name"] + ":"}
                                    </Col>
                                    <Col>
                                        <ReactPlayer
                                            controls
                                            url={field["content"][Object.keys(field["content"])[0]]}
                                        />
                                    </Col>
                                </Row>
                            }
                            {field["type"] === "location"
                                &&
                                (Object.keys(field["content"]).length > 1
                                    ?
                                    <Row>
                                        <Col sm={2}>
                                            {field["name"] + ":"}
                                        </Col>
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
                                )}
                        </div>
                    ))
                }
            </CardContent >
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
                                    style={{ backgroundColor: 'Lavender',}}
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
