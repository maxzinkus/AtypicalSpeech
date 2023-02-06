import React from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';

function SaveProgressButton({user_id, script_id, current_line}) {

    async function saveProgress() {

        const update_task_progress_result = await axios.post('http://localhost:3000/user/update_task_progress', {user_id: user_id, script_id: script_id, current_line: current_line});
        console.log("update_task_progress_result: ", update_task_progress_result)
        
    }

  return (
    <Button onClick={saveProgress(user_id, script_id, current_line)}>
        Save Progress
    </Button>
  )
}

export default SaveProgressButton