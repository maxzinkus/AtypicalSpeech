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

function AssignScriptsSpecificUserModal() {

    const location = useLocation();
    console.log("location: ", location)
    const accessCode = location.state.accessCode;

    const [currentState, setCurrentState] = useState({available_scripts: null})
    const [selectedScripts, setSelectedScripts] = useState([]);

    useEffect(() => {
      async function fetchData() {

          // fetch all users to display all users on admin page
          const result = await axios.get('http://localhost:3000/script/get_all_script_ids');

          const all_script_ids = result.data.map((script) => {
              return {value: script.id, label: script.id};
          })

          setCurrentState({...currentState, available_scripts: all_script_ids})
      }

      fetchData();

  }, [])

  const assign_task_url = "http://localhost:3000/user/assign_task"

  const handleAssignTask = async (script_id) => {

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

  const handleAssignMultipleTasks = () => {
      console.log("handleAssignMultipleTasks: ", selectedScripts)
      const res = Promise.all(
          selectedScripts.map(async script_id => await handleAssignTask(script_id.value))
      ).then(() => {
        handleClose()
      })
  }

  const navigate = useNavigate();

  const handleClose = (event) => {

    navigate('/admin', {
      state: {}
    })
  }


  const animatedComponents = makeAnimated();
  
    return (
      <>
        <Modal show={true}>
          <Modal.Header closeButton onClick={handleClose}>
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
                  <Button variant="primary" onClick={handleAssignMultipleTasks}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
    );
}

export default AssignScriptsSpecificUserModal