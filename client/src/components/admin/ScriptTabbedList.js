import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom'

import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';

import { Button, Table, Modal } from 'react-bootstrap';

function ScriptTabbedList() {

    const get_all_script_ids_URL = "http://localhost:3000/script/get_all_scripts";
    const delete_script_URL = "http://localhost:3000/script/delete_script";

    const [currentState, setCurrentState] = useState({all_scripts: null, tabbedlist: null});
    const [overlayScript, setOverlayScript] = useState({overlay_script: null, overlay_data: {utterances: [], details: []}, line_number: null});
    const [show, setShow] = useState(false);

    const get_script_URL = "http://localhost:3000/script/findScriptID";

    const handleClose = () => {
        setOverlayScript({...overlayScript, overlay_script: null})
        setShow(false)
    };

    const handleShow = async (script_id, line_number) => {
        console.log("handleShow")

        await axios.post(
            get_script_URL,
            {
                "script_id": script_id
            }
        )
        .then((response) => {
            console.log("fetch script data: ", response.data.utterances)
            setOverlayScript({...overlayScript, overlay_script: script_id, overlay_data: response.data.utterances, line_number: line_number})
        })
        .then(() => {
            setShow(true)
        })

    };

    const zip = (...arr) => {
        const zipped = [];
        arr.forEach((element, ind) => {
           element.forEach((el, index) => {
              if(!zipped[index]){
                 zipped[index] = [];
              };
              if(!zipped[index][ind]){
                 zipped[index][ind] = [];
              }
              zipped[index][ind] = el || '';
           })
        });
        return zipped;
     };

    const navigate = useNavigate();

    const handleClickAssignScript = (script_id) => {
        navigate('/assign-script-multiple-users', {
            state: {
                script_id : script_id
            }
        })
    }

    useEffect(() => {

        const renderEditLineModal = () => {
            return (
                <>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit line; script #{overlayScript.overlay_script} line #{overlayScript.line_number}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="text">
                          <Form.Label>text</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={overlayScript.line_number === null ? "" : overlayScript.overlay_data.utterances[overlayScript.line_number] }
                            // onChange={handleAccessCodeChange}
                            autoFocus
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="field1">
                          <Form.Label>field1</Form.Label>
                          <Form.Control
                            type="field1"
                            // placeholder={details["field1"]}
                            // onChange={handleAccessCodeChange}
                            autoFocus
                          />
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="accessCode">
                          <Form.Label>Access Code</Form.Label>
                          <Form.Control
                            type="accessCode"
                            placeholder="3Kgnq!P"
                            // onChange={handleAccessCodeChange}
                            autoFocus
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="accessCode">
                          <Form.Label>Access Code</Form.Label>
                          <Form.Control
                            type="accessCode"
                            placeholder="3Kgnq!P"
                            // onChange={handleAccessCodeChange}
                            autoFocus
                          />
                        </Form.Group> */}
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary">
                        Confirm
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              );
        }

        const handleClickDeleteScript = async (script_id) => {
            if (window.confirm('Are you sure you wish to delete this script?')) {
                fetch(delete_script_URL, {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                        'script_id': script_id
                    })
                })
                .then(() => {
    
    
                    // var new_scripts = currentState.all_scripts;
                    // var script_idx = 0;
                    // for (var i = 0; i < new_scripts.size(); i++) {
                    //     if (new_scripts[i]["id"] === script_id) {
                    //         script_idx = i;
                    //     }
                    // }
                    // delete new_scripts[script_idx];
                    // setCurrentState({...currentState, all_scripts: new_scripts})
                })
            }
        }

        function renderScriptModalButton(script_id) {
            return (
                <Button onClick={() => {handleClickAssignScript(script_id)}}>
                    Assign this script to users
                </Button>
            )
        }

        function renderEditScriptButton(script_id) {
            return (
                <Button onClick={() => {handleClickAssignScript(script_id)}}>
                    Edit this script
                </Button>
            )
        }

        function renderDeleteScriptButton(script_id) {
            return (
                <Button variant="outline-danger" onClick={() => {handleClickDeleteScript(script_id)}}>
                    Delete
                </Button>
            )
        }

        function handleClickScriptLine(script_id, line_number, text, details) {
            console.log("handleClickScriptLine")

            // handleShow()

            // navigate('/edit_script_line', {
            //     state: {
            //         script_id : script_id,
            //         line_number: line_number,
            //         text: text,
            //         details: details
            //     }
            // })
        }

        function renderScriptDetailsTable(script) {
            var action_type_script = script.utterances.details[1].hasOwnProperty("action")
            if (action_type_script) {
                return (
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                        <th>Line #</th>
                        <th>Utterance</th>
                        <th>Action</th>
                        <th>Object</th>
                        <th>Location</th>
                        </tr>
                    </thead>

                    <tbody>
                        {zip(script.utterances.utterances, script.utterances.details).map((utterance, index) => {
                            if (index === 0) {
                                return;
                            }

                            var text = utterance[0];
                            var details = utterance[1];

                            return (
                                // <tr onClick={() => handleClickScriptLine(text, details)}>

                                (<tr onClick={() => handleShow(script.id, index)}>
                                    <td>{index}</td>
                                    <td>{text}</td>
                                    <td>{details.action}</td>
                                    <td>{details.object}</td>
                                    <td>{details.location}</td>
                                </tr>)
                            )
                        })}
                        
                    </tbody>
                    </Table>
                );
            }

            else {
                return (
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                        <th>Line #</th>
                        <th>Utterance</th>
                        <th>field1</th>
                        <th>field2</th>
                        <th>field3</th>
                        <th>field4</th>
                        <th>field5</th>
                        <th>field6</th>
                        <th>field7</th>
                        </tr>
                    </thead>

                    <tbody>
                        {zip(script.utterances.utterances, script.utterances.details).map((utterance, index) => {
                            if (index === 0) {
                                return;
                            }

                            var text = utterance[0];
                            var details = utterance[1];

                            // {renderEditLineModal(script.id, index, text, details)}

                            return (
                                <tr onClick={() => handleShow(script.id, index)}>
                                {/* <tr onClick={() => handleClickScriptLine(text, details)}> */}
                                    <td>{index}</td>
                                    <td>{text}</td>
                                    <td>{details.field1}</td>
                                    <td>{details.field2}</td>
                                    <td>{details.field3}</td>
                                    <td>{details.field4}</td>
                                    <td>{details.field5}</td>
                                    <td>{details.field6}</td>
                                    <td>{details.field7}</td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                    </Table>
                );
            }
        }

        function renderScriptsTabbedList(all_scripts) {

            console.log("all_scripts: ", all_scripts)
            return (
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                  <Row>

                    <Col sm={2}>
                      <ListGroup>
                        {all_scripts.map((script) => {
                            var href = "#" + script.id
                            return (
                                <ListGroup.Item action href={href}>
                                    {script.id}
                                </ListGroup.Item>
                            )
                        })}
                        </ListGroup>
                    </Col>

                    <Col sm={8}>
                      <Tab.Content>
                        {all_scripts.map((script) => {
                            var href = "#" + script.id
                            return (
                                <Tab.Pane eventKey={href}>
                                    <div className='large_font_blue_left'>
                                        Script #{script.id}
                                    </div>

                                    <div className='padding_bottom_20'>
                                        {renderScriptModalButton(script.id)} {renderDeleteScriptButton(script.id)}
                                    </div>

                                    {renderScriptDetailsTable(script)}

                                {renderEditLineModal(script.id)}

                                </Tab.Pane>
                            )
                        })}
                      </Tab.Content>
                    </Col>

                  </Row>
                </Tab.Container>
              );
        }

        async function fetchData() {
            // fetch all users to display all users on admin page
            const fetched_scripts = (await axios.get(get_all_script_ids_URL));

            const all_scripts = fetched_scripts.data.map((script) => {
                return script;
            })

            const renderedTabbedList = renderScriptsTabbedList(all_scripts);

            setCurrentState({...currentState, all_scripts: all_scripts, tabbedlist: renderedTabbedList});
        }

        fetchData();
    }, [show])

    return (
        <div>
            {currentState.tabbedlist}
        </div>
    )
        
}

export default ScriptTabbedList