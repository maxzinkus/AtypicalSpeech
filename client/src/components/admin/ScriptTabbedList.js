import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom'

import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Button, Table, Modal } from 'react-bootstrap';

function ScriptTabbedList() {

    const get_all_script_ids_URL = "http://localhost:3000/script/get_all_scripts";
    const delete_script_URL = "http://localhost:3000/script/delete_script";

    const [currentState, setCurrentState] = useState({all_scripts: null, tabbedlist: null});

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                                <tr>
                                    <td>{index}</td>
                                    <td>{text}</td>
                                    <td>{details.action}</td>
                                    <td>{details.object}</td>
                                    <td>{details.location}</td>
                                </tr>
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

                            return (
                                <tr>
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
                                        {renderScriptModalButton(script.id)} {renderEditScriptButton(script.id)} {renderDeleteScriptButton(script.id)}
                                    </div>

                                    {renderScriptDetailsTable(script)}
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
    }, [])

    return (
        <div>
            {currentState.tabbedlist}
        </div>
    )
        
}

export default ScriptTabbedList