import React from 'react'
import { useState, useEffect } from 'react';
import SaveProgressButton from './SaveProgressButton';

function UtteranceDisplayer({user_id, script_id, line, current_line, currentRecordState}) {

  // console.log("current record state in utterance displayer: ", currentRecordState)

  const [currentState, setCurrentState] = useState({line_to_display: ""})

  useEffect(() => {
    
    function visibility_timeout() {

      console.log("visibility_timeout")
      if (document.getElementById("utterence_line_display") !== null) {
        document.getElementById('utterence_line_display').style.visibility = 'hidden';
        setTimeout(function() {
          document.getElementById('utterence_line_display').style.visibility = 'visible';
        }, 1000);
      }
    }

    visibility_timeout();

  }, [current_line])
  
  return (
    <div className='float-container'>
      <div className='float-left-child'>
        <div>Current utterance:</div>
        <br></br>
        <div>{SaveProgressButton({user_id: user_id, script_id: script_id, current_line: current_line})}</div>

      </div>
      <div className='float-right-child'>
        {/* <a className='utterance_display_bold'> */}
          {/* {currentRecordState !== null && {line}} */}
          {line}
        {/* </a> */}
      </div>

    </div>
    // <div className='utterance_display_whole'>
    //   Current utterance: {currentRecordState !== null && <a id='utterence_line_display' className='utterance_display_bold'>{line}</a>}
    //   {SaveProgressButton({user_id: user_id, script_id: script_id, current_line: current_line})}
    // </div>
  )
}

export default UtteranceDisplayer