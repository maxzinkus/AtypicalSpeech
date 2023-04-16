import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Button, Table } from 'react-bootstrap';

function ScriptTabbedList() {

    const get_all_script_ids_URL = "http://localhost:3000/script/get_all_scripts";

    const [currentState, setCurrentState] = useState({all_scripts: null, tabbedlist: null});

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

    useEffect(() => {

        function renderScriptModalButton() {
            return (
                <div className='padding_bottom_20'>
                    <Button>
                        Script Modal
                    </Button>
                </div>
            )
        }

        function renderScriptDetailsTable(script) {
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
                                    {renderScriptModalButton()}
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