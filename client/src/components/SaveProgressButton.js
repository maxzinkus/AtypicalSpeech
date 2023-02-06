import React from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';

function SaveProgressButton({user_id, script_id, current_line}) {

    async function saveProgress(user_id, script_id, line) {

        console.log("save progress: ", line)

        const update_task_progress_result = await axios.post('http://localhost:3000/user/update_task_progress', {user_id: user_id, script_id: script_id, current_line: (line >= 0) ? line : 0});
        console.log("update_task_progress_result: ", update_task_progress_result)

    }

  return (
    <Button className='button_right_align' onClick={saveProgress(user_id, script_id, current_line - 1)}>
        Save Progress
    </Button>
  )
}

export default SaveProgressButton