import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// import { colourOptions } from '../data';

function UserAccordionComponent() {

    const [currentState, setCurrentState] = useState({users: null, accordionItems: null, available_scripts: null});

    const [show, setShow] = useState(false);
    const [selectedScripts, setSelectedScripts] = useState([]);

    const assign_task_url = "http://localhost:3000/user/assign_task"
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAssignTask = async (accessCode, script_id) => {

        console.log("handleAssignScriptsSpecificUser accessCode: ", accessCode)

        fetch(assign_task_url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'user_id': accessCode,
                'script_id': script_id
            })
        })
        .then(() => {
            handleClose()
        })
    }

    const handleAssignMultipleTasks = (user_id) => {
        console.log("handleAssignMultipleTasks: ", selectedScripts)
        const res = Promise.all(
            selectedScripts.map(async script_id => await handleAssignTask(user_id, script_id.value))
        )
    }

    const animatedComponents = makeAnimated();

    const renderAssignScriptsSpecificUserButton = (user_data) => {
        return (
            <>
              <Button variant="primary" onClick={handleShow}>
                  Assign scripts
              </Button>
        
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Assign Scripts</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Select scripts
                    <Select
                        onChange={(selectedOption) => {
                            console.log(selectedOption);
                            setSelectedScripts(selectedOption);
                        }}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={[]}
                        isMulti
                        options={currentState.available_scripts}
                    />
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleAssignMultipleTasks(user_data.id)}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          );
    }
  

    const renderAccordionItem = (eventKey, header, user_data) => {
        return (
            <Accordion.Item eventKey={eventKey}>
                <Accordion.Header>{header}</Accordion.Header>
                <Accordion.Body>{formatUserDetailsSection(user_data)}</Accordion.Body>
            </Accordion.Item>
        )
    }

    const formatUserDetailsSection = (user_data) => {

        return (
            <div>
                <div>Created on {user_data.createdAt.substring(0, 10)}, Last active on {user_data.updatedAt.substring(0, 10)}</div>
                <div>{formatAssignedTasksSection(user_data.assignedTasks.tasks, user_data.taskProgress)}</div>
                <div>{formatCompletedTasksSection(user_data.completedTasks.tasks)}</div>
                {renderAssignScriptsSpecificUserButton(user_data)}
            </div>
        )
    }

    const formatCompletedTasksSection = (tasks) => {
        if (tasks.length === 0) {
            return <div>No scripts completed yet</div>
        }

        return (
            <>
                {tasks.length} script(s) completed
                <ul>
                    {tasks.map((task, index) =>
                        <li key={index}>
                        {task}
                        </li>
                    )}
                </ul>
            </>
            )
    }

    const formatAssignedTasksSection = (tasks, progress) => {
        if (tasks.length === 0) {
            return <div>No scripts assigned</div>
        }

        return (
            <div>
                {tasks.length} script(s) assigned
                <ul>
                    {tasks.map((task, index) => {
                        if (!progress.hasOwnProperty(task)) {
                            return (<li key={index}>
                                {task} - Not in progress
                            </li>)
                        } else {
                            return (<li key={index}>
                            {task} - In progress
                            </li>)
                        }
                    }
                    )}
                </ul>
            </div>)
    }

    useEffect(() => {
        async function fetchData() {

            // fetch all users to display all users on admin page
            const users = await axios.get('http://localhost:3000/user/get_all_users');

            setCurrentState({...currentState, users: users})

            var accordionItems = users.data.map((user_data) => {
                return renderAccordionItem(user_data.id.toString() , user_data.id.toString(), user_data)
            })

            // fetch all users to display all users on admin page
            const result = await axios.get('http://localhost:3000/script/get_all_script_ids');

            const all_script_ids = result.data.map((script) => {
                return {value: script.id, label: script.id};
            })

            setCurrentState({users: users, accordionItems: accordionItems, available_scripts: all_script_ids})
        }

        fetchData();

    }, [show])

  return (
    <Accordion>
        {currentState.accordionItems}
    </Accordion>
  );
}

export default UserAccordionComponent;