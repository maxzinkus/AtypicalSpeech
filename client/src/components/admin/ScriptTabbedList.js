import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

function ScriptTabbedList() {

    const get_all_script_ids_URL = "http://localhost:3000/script/get_all_script_ids";

    const [currentState, setCurrentState] = useState({all_scripts: null, tabbedlist: null});

    useEffect(() => {

        function renderScriptsTabbedList(all_scripts) {

            console.log("all_scripts: ", all_scripts)
            return (
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                  <Row>

                    <Col sm={2}>
                      <ListGroup>
                        {all_scripts.map((script) => {
                            var href = "#" + script
                            return (
                                <ListGroup.Item action href={href}>
                                    {script}
                                </ListGroup.Item>
                            )
                        })}
                        </ListGroup>
                    </Col>

                    <Col sm={8}>
                      <Tab.Content>
                        {all_scripts.map((script) => {
                            var href = "#" + script
                            return (
                                <Tab.Pane eventKey={href}>
                                    {script}
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
                return script.id;
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