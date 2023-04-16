import React from 'react';

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom'

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

function AssignScriptMultipleUsersModal() {

    const get_all_users_url = 'http://localhost:3000/user/get_all_users';
    const location = useLocation();
    const [currentState, setCurrentState] = useState({all_users: null})
    const script_id = location.state.script_id;

    console.log("Script id: ", script_id)

    useEffect(() => {
        async function fetchData() {
  
            // fetch all users to display all users on admin page
            const fetched_users = await axios.get(get_all_users_url);
  
            const all_users = fetched_users.data.map((user) => {
                return {value: user.id, label: user.id};
            })

            setCurrentState({...currentState, all_users: all_users})
        }
  
        fetchData();
  
    }, [])

  return (
    <div>AssignScriptMultipleUsersModal</div>
  )
}

export default AssignScriptMultipleUsersModal