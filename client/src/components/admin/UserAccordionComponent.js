import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Link, useNavigate } from 'react-router-dom'

function UserAccordionComponent() {

    const [currentState, setCurrentState] = useState({users: null, accordionItems: null});

    const assign_task_url = "http://localhost:3000/user/assign_task"

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
    }

    const renderAccordionItem = (eventKey, header, user_data) => {
        return (
            <Accordion.Item eventKey={eventKey}>
                <Accordion.Header>{header}</Accordion.Header>
                <Accordion.Body>{formatUserDetailsSection(user_data)}</Accordion.Body>
            </Accordion.Item>
        )
    }

    const navigate = useNavigate();

    const handleClick = (user_data) => {

        console.log("handleClick user_data.id: ", user_data.id);

        navigate('/assign-script-specific', {
            state: {
                accessCode: user_data.id
            }
        })
    }

    const renderAssignScriptsSpecificUserModalButton = (user_data) => {
        return (
            <Button variant="primary" onClick={() => handleClick(user_data)}>
                Open modal
            </Button>
        )
    }

    const formatUserDetailsSection = (user_data) => {

        return (
            <div>
                <div>Created on {user_data.createdAt.substring(0, 10)}, Last active on {user_data.updatedAt.substring(0, 10)}</div>
                <div>{formatAssignedTasksSection(user_data.assignedTasks.tasks, user_data.taskProgress)}</div>
                <div>{formatCompletedTasksSection(user_data.completedTasks.tasks)}</div>
                {renderAssignScriptsSpecificUserModalButton(user_data)}
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

            setCurrentState({users: users, accordionItems: accordionItems})
        }

        fetchData();

    }, [])

  return (
    <Accordion>
        {currentState.accordionItems}
    </Accordion>
  );
}

export default UserAccordionComponent;