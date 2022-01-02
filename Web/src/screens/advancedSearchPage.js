//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Col, Container, Form, FormGroup, FormLabel, Row, Button, FormControl, Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCommunityData, listPostTemplates } from 'store/actions/communityAction';
import { isEmpty } from 'utils/methods';
import { createPost } from 'store/actions/communityAction';
import SideCard from 'components/card/SideCard';
import MapGoogle from 'components/googleMaps';


function AdvancedSearchPage(props) {
    const history = useHistory();
    let listOfPath = props?.location?.pathname?.split('/');
    let id = listOfPath[listOfPath?.length - 1];
    const [templateName, setTemplateName] = useState("");
    const [dataFields, setDataFields] = useState([]);
    const { communityData, postTemplates } = useSelector(state => state.community)
    const [selectedPostTemplate, setSelectedPostTemplate] = useState('');

    // const [postTemplateNames, setPostTemplateNames] = useState([]);
    console.log('communityData: ', communityData?.Community);
    console.log('postTemplates: ', postTemplates);
    // console.log('postTemplateNames: ', postTemplateNames);
    // postTemplates?.Post_templates?.map(e => console.log('e?.Post_templates: ' , e?.name))
    useEffect(() => {
        dispatch(getCommunityData(id));
        dispatch(listPostTemplates(id));
    }, [])

    // useEffect(()=>{
    //     if(!postTemplates) return;
    //     let names = [];
    //     postTemplates?.Post_templates?.map(e => names.push(e?.name))
    //     setPostTemplateNames(names)
    // },[postTemplates])

    const [title, setTitle] = useState('');

    const [isCreated, setIsCreated] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleCommunityData = () => {
        dispatch(getCommunityData(id));
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (false) {
            dispatch({
                type: '',
            })
            // history.push('/landingPage')
        }
    }, [])
    const [location, setLocation] = useState({});
    const [address, setAddress] = useState("");
    


    const returnAlert = (variant, message) => {
        if (isCreated) {
            return (
                <Alert variant={variant} >
                    <Alert.Heading>{isSuccessful ? "Success!" : "Error!"}</Alert.Heading>
                    <p>{message}</p>
                </Alert>
            );
        }
    }

    function getLocationData(loc, add) {
        // console.log("location: ", location);
        // console.log("address: ", address);
        setLocation(loc);
        setAddress(add);
    }

        // handle input change
        const handleInputChange = (e, index) => {
            const { name, value } = e.target;
            const list = [...dataFields];
            list[index][name] = value;
            setDataFields(list);
            console.log('dataFields: ' , dataFields);
        };

        // handle input change
        const handleTypeInputChange = (e, index) => {
            const { value } = e.target;
            const list = [...dataFields];
            list[index]['name'] = value;
            setDataFields(list);
            console.log('dataFields: ' , dataFields);
        };
        
        // handle click event of the Remove button
        const handleRemoveClick = (name) => {
            console.log('handleRemoveClick: name: ' , name);
            const list = dataFields?.filter(field => field?.name !== name);
            setDataFields(list);
            console.log('newList: ' , list);
        };
    
        // handle click event of the Add button
        const handleAddClick = () => {
            setDataFields([...dataFields, { name: "", value: "" }]);
        };


    // const [selectionFields, setSelectionFields] = useState([]);

    // const handleAddClick = () => {
    //     setSelectionFields([...selectionFields, { type: "", name: "" }]);
    // };
    
    return (
        <>
            <div>
                <SideBar />
            </div>

                   

                    




            <Container fluid={true} style={{ width: '55rem', margin: '0px auto', backgroundColor: "Lavender" }}>
                <Form>
                <FormGroup className="mb-3">
                        <FormLabel style={{ color: "black", fontSize: 30, font: "bold" }}>
                            Create Post
                        </FormLabel>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="templateNum">
                        <Form.Control as="select" aria-label="Default select example" onChange={(e) => { setSelectedPostTemplate(postTemplates["Post_templates"]?.filter(template => template?.id === parseInt(e.target.value))[0])}}>
                            <option value="init">Please Select a Template</option>
                            {postTemplates["Post_templates"]?.map((field) => {console.log('field;' , field); return (
                                <option value={field?.id}>{field.name}</option>
                            )})}
                        </Form.Control>
                    </FormGroup>
                    

                    {dataFields?.map((field, i) => {
                        return (
                            <div key={i}>
                                <Row>
                                    <Col>
                                        <Form.Control style={{ margin: "10px" }} as="select" value={field.name} name="type" aria-label="Default select example" onChange={e => handleTypeInputChange(e, i)}>
                                            <option value="0">Select Field Type</option>
                                            {selectedPostTemplate?.data_field_templates?.map((field, i) => {
                                                for(var i = 0; i < dataFields?.length; i++) {
                                                    if(dataFields[i]?.name?.includes(field?.name))
                                                        return <option value={field?.name} disabled>{field?.name}</option>;
                                                }
                                                return <option value={field?.name}>{field?.name}</option>
                                            })}
                                        
                                        </Form.Control>
                                    </Col>
                                    <Col style={{ margin: "10px" }}>
                                        <FormControl placeholder="Enter Field Name" value={field.value} type="text" name="value" onChange={e => handleInputChange(e, i)} >
                                        </FormControl>
                                    </Col>
                                    <Col style={{ margin: "10px" }}>
                                        {dataFields.length !== 0 && <Button variant="danger" onClick={() => handleRemoveClick(dataFields[i]?.name)}>Remove</Button>}
                                    </Col>
                                </Row>
                            </div>
                        );
                    })}
                    <FormGroup>
                        {selectedPostTemplate?.data_field_templates?.length > dataFields?.length &&
                        <Button style={{ margin: "20px" }} variant="warning" onClick={() => handleAddClick()}>
                            Add Field
                        </Button> }
                        <br />
                        <Button style={{ margin: "20px" }} variant="primary" type="submit" onClick={e => console.log('filter')}>
                            Filter
                        </Button>
                    </FormGroup>

                    {isCreated && returnAlert(isSuccessful ? "success" : "danger", alertMessage)}

                </Form>
            </Container>

            <SideCard props={props} communityData={communityData} handleCommunityData={handleCommunityData} />
        </>
    );
}

export default AdvancedSearchPage;