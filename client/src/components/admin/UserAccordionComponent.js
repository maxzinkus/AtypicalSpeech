import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';

function UserAccordionComponent() {

    const [currentState, setCurrentState] = useState({users: null, accordionItems: null})

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
                <p>Created on {user_data.createdAt.substring(0, 10)}, Last active on {user_data.updatedAt.substring(0, 10)}</p>
                <p>{formatAssignedTasksSection(user_data.assignedTasks.tasks)}</p>
                <p>{formatCompletedTasksSection(user_data.completedTasks.tasks)}</p>
                
            </div>
        )
    }

    const formatCompletedTasksSection = (tasks) => {
        if (tasks.length === 0) {
            return <div>No scripts completed yet</div>
        }

        return (
            <div>
                {tasks.length} script completed
                <ul>
                    {tasks.map((task) =>
                        <li key={task}>
                        {task}
                        </li>
                    )}
                </ul>
            </div>)
    }

    const formatAssignedTasksSection = (tasks) => {
        if (tasks.length === 0) {
            return <div>No scripts assigned</div>
        }

        return (
            <div>
                {tasks.length} script assigned
                <ul>
                    {tasks.map((task) =>
                        <li key={task}>
                        {task}
                        </li>
                    )}
                </ul>
            </div>)
    }

    useEffect(() => {
        async function fetchUsers() {
            const users = await axios.get('http://localhost:3000/user/get_all_users');

            setCurrentState({...currentState, users: users})
            console.log("users: ", users)
            console.log("currentState.users: ", currentState.users)

            var accordionItems = [];
            for (var i = 0; i < users.data.length; i++) {
                console.log(users.data[i].id)
                accordionItems.push(renderAccordionItem(users.data[i].id.toString() , users.data[i].id.toString(), users.data[i]))
            }

            setCurrentState({users: users, accordionItems: accordionItems})
        }

        fetchUsers();
    }, [])

  return (
    <Accordion>
        {currentState.accordionItems}
    </Accordion>
  );
}

export default UserAccordionComponent;