import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import ReactDOM from 'react-dom';

function AssignScriptsSpecificUserButton({accessCode}) {
    // const [currentState, setCurrentState] = useState({accessCode: null});
    const [show, setShow] = useState(false);

    const assign_task_url = "http://localhost:3000/user/assign_task"
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const handleAccessCodeChange = (event) => {
    //     setCurrentState({
    //         accessCode: event.target.value
    //     })
    // }

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
        .then(() => {
            handleClose()
        })
    }

    const handleAssignMultipleTasks = async (script_ids) => {
        script_ids.map((script_id) => {
            handleAssignTask(script_id)
        })
    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
            Create user
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="accessCode">
                <Form.Label>Access Code</Form.Label>
                {/* <Form.Control
                  type="accessCode"
                  placeholder="3Kgnq!P"
                  onChange={handleAssignMultipleTasks}
                  autoFocus
                /> */}
              </Form.Group>
              {/* <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" 
            // onClick={handleAssignTask}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default AssignScriptsSpecificUserButton