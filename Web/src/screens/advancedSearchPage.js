//React Library
import React, { useState, useEffect, } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { urls } from 'DATABASE';
import 'assets/css/home.css';
import SideBar from 'components/navbar/SideBar';
import { Col, Container, Form, FormGroup, FormLabel, Row, Button, FormControl, Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { filterPostsRedux, getCommunityData, listPostTemplates } from 'store/actions/communityAction';
import { isEmpty } from 'utils/methods';
import { createPost } from 'store/actions/communityAction';
import SideCard from 'components/card/SideCard';
import MapGoogle from 'components/googleMaps';
import PostCard from 'components/card/MaterialUICard';


function AdvancedSearchPage(props) {
    const history = useHistory();
    let listOfPath = props?.location?.pathname?.split('/');
    let id = listOfPath[listOfPath?.length - 1];
    const [dataFields, setDataFields] = useState([]);
    const { filterData, communityData, postTemplates } = useSelector(state => state.community)
    const [selectedPostTemplate, setSelectedPostTemplate] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);
    useEffect(() => {
        dispatch(listPostTemplates(id));
    }, [])

    const handleCommunityData = () => {
        dispatch(getCommunityData(id));
    }

    const dispatch = useDispatch();

    function getLocationData(loc, add, index) {
        let locationTmp = {lat: loc?.lat, lng: loc.lng};
        const list = [...dataFields];
        list[index]['value'] = locationTmp;
        if(dataFields[index]['value']?.lat !== locationTmp?.lat && dataFields[index]['value']?.lng !== locationTmp?.lng)
            setDataFields(list);
    }

        // handle input change
        const handleInputChange = (e, index) => {
            const { name, value } = e.target;
            const list = [...dataFields];
            list[index][name] = value;
            setDataFields(list);
        };

        // handle input change
        const handleTypeInputChange = (e, index) => {
            const { name, value } = e.target;
            const list = [...dataFields];
            let type = selectedPostTemplate?.data_field_templates?.filter(field => field?.name === value)[0]?.type;
            if(name === 'name') list[index]['type'] = type;
            list[index][name] = value;
            setDataFields(list);
        };

        // handle input change
        const handleTypeConditionChange = (e, index) => {
            const { value } = e.target;
            const list = [...dataFields];
            list[index]['name'] = value;
            setDataFields(list);
        };
        
        // handle click event of the Remove button
        const handleRemoveClick = (name) => {
            const list = dataFields?.filter(field => field?.name !== name);
            setDataFields(list);
        };
    
        // handle click event of the Add button
        const handleAddClick = () => {
            setDataFields([...dataFields, { name: "", value: "", type: "", condition: "", range: "", number2: ""}]);
        };

        const filterPosts = async (e) => {

            e.preventDefault();
            let communityId = id;
            let params = {post_template_id: selectedPostTemplate?.id}
            dataFields?.map(field => {
                if(field?.type === 'location') {
                    params[field?.name + '_' + field?.condition] = `${field?.value?.lat},${field?.value?.lng},${field?.condition === 'eq' ? 0 : field?.range}`; 
                } else if(field?.type === 'number') {
                    params[field?.name + '_' + field?.condition] = field?.condition === 'between' ?  `${field?.value},${field?.number2}` : field?.value; 
                } else if(field?.type === 'date') {
                    params[field?.name + '_' + field?.condition] = field?.value; 
                } else if(field?.type === 'text') {
                    params[field?.name + '_' + field?.condition] = field?.value; 
                }
            })
            console.log('params: ' , params);
            console.log('communityId: ' , communityId);

            dispatch(
                filterPostsRedux(communityId, params)
            )
            setIsFiltered(true);
            // history.push('/community/' + id)
        }

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
                            Advanced Search
                        </FormLabel>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="templateNum">
                        <Form.Control as="select" aria-label="Default select example" onChange={(e) => { setSelectedPostTemplate(postTemplates["Post_templates"]?.filter(template => template?.id === parseInt(e.target.value))[0])}}>
                            <option value="init">Please Select a Template</option>
                            {postTemplates["Post_templates"]?.map((field) => { return (
                                <option value={field?.id}>{field.name}</option>
                            )})}
                        </Form.Control>
                    </FormGroup>
                    

                    {dataFields?.map((field, i) => {
                        return (
                            <div key={i}>
                                <Row>
                                    <Col>
                                        <Form.Control style={{ margin: "10px" }} as="select" value={field.name} name="name" aria-label="Default select example" onChange={e => handleTypeInputChange(e, i)}>
                                            <option value="0">Select Field Type</option>
                                            {selectedPostTemplate?.data_field_templates?.map((field, i) => {
                                                for(var i = 0; i < dataFields?.length; i++) {
                                                    if(dataFields[i]?.name?.includes(field?.name) || field[i]?.type?.includes('image') || field[i]?.type?.includes('video'))
                                                        return <option value={field?.name} disabled>{field?.name}</option>;
                                                }
                                             
                                                if(field?.type?.includes('image') || field?.type?.includes('video'))
                                                    return <option value={field?.name} disabled>{field?.name}</option>;
                                                return <option value={field?.name}>{field?.name}</option>
                                            })}
                                        
                                        </Form.Control>
                                    </Col>
                                    <Col style={{ margin: "10px" }}>
                                        <>
                                            {field?.type === 'number' && 
                                                <>
                                                <Form.Control  as="select" value={field.condition} name="condition" aria-label="Default select example" onChange={e => handleTypeInputChange(e, i)}>
                                                    <option value="0">Select Field Condition</option>
                                                    <option value={'gt'} >gt</option>
                                                    <option value={'eq'} >eq</option>
                                                    <option value={'lt'} >lt</option>
                                                    <option value={'between'} >between</option>
                                                </Form.Control>

                                                </>
                                            
                                            }

                                            {field?.type === 'date' && 
                                                <>
                                                <Form.Control as="select" value={field.condition} name="condition" aria-label="Default select example" onChange={e => handleTypeInputChange(e, i)}>
                                                    <option value="0">Select Field Condition</option>
                                                    <option value={'before'} >before</option>
                                                    <option value={'equal'} >equal</option>
                                                    <option value={'after'} >after</option>
                                                </Form.Control>
                                                </>
                                            
                                            }

                                            {field?.type === 'location' && 
                                                <>
                                                <Form.Control as="select" value={field.condition} name="condition" aria-label="Default select example" onChange={e => handleTypeInputChange(e, i)}>
                                                    <option value="0">Select Field Condition</option>
                                                    <option value={'near'} >near</option>
                                                    <option value={'eq'} >eq</option>
                                                    <option value={'lt'} >lt</option>
                                                    <option value={'lg'} >lg</option>
                                                </Form.Control>
                                                </>
                                            
                                            }

                                            {field?.type === 'text' && 
                                                <>
                                                <Form.Control as="select" value={field.condition} name="condition" aria-label="Default select example" onChange={e => handleTypeInputChange(e, i)}>
                                                    <option value="0">Select Field Condition</option>
                                                    <option value={'endsWith'} >Ends With</option>
                                                    <option value={'startsWith'} >Starts With</option>
                                                    <option value={'contains'} >Contains</option>
                                                    <option value={'equal'} >Equal</option>
                                                </Form.Control>
                                                </>
                                            }
                                            
                                        </>
                                    </Col>
                                    <Col style={{ margin: "10px" }}>
                                        {field?.type === 'number' &&
                                        <>
                                            <FormControl placeholder="Condition" value={field.value} type="number" name="value" onChange={e => handleTypeInputChange(e, i)} >
                                            </FormControl>
                                            {field?.condition === 'between' &&
                                                <FormControl placeholder="Condition" value={field.number2} type="number" name="number2" onChange={e => handleTypeInputChange(e, i)} >
                                                </FormControl>
                                            }
                                        </>
                                        }
                                        {field?.type === 'text' && 
                                                <FormControl placeholder="Write Something" value={field.value} type="text" name="value" onChange={e => handleTypeInputChange(e, i)} >
                                                </FormControl>
                                            }
                                        {field?.type === 'date' && 
                                            <FormControl placeholder="Date" value={field.value} type="date" name="value" onChange={e => handleTypeInputChange(e, i)} >
                                            </FormControl>
                                        }
                                        {field?.type === "location" &&
                                            <>
                                                <FormControl placeholder="Range" value={field.range} disabled={field.condition === 'eq'} type="number" name="range" onChange={e => handleTypeInputChange(e, i)} ></FormControl>
                                                <MapGoogle getLocationData={(loc, add) => getLocationData(loc, add, i)} name="value"/>
                                            </>
                                        }
                                        
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
                        <Button style={{ margin: "20px" }} variant="primary" onClick={e => filterPosts(e)}>
                            Filter
                        </Button>
                    </FormGroup>

                </Form>
            </Container>
                <div style={{marginTop: '40px'}}>
                    {
                        filterData?.Success && isFiltered ? 
                    (
                    filterData["Posts"].map((posts) => (
                    <PostCard posts={posts} />
                    ))
                    ) : null
                    }
                </div>

            {isEmpty(filterData?.Posts) && isFiltered && 
                <div style={{marginTop: '40px', maxWidth: '800px', margin: 'auto', justifyContent: 'center', alignItems: 'center', minWidth: '500px'}}>
                <Alert variant={'danger'}>
                <Alert.Heading>{"Not Found!"}</Alert.Heading>
                <p>{"No results Found !"}</p>
                </Alert>
                </div>
            }

            <SideCard props={props} communityData={communityData} handleCommunityData={handleCommunityData} />
        </>
    );
}

export default AdvancedSearchPage;