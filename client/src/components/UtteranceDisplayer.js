import React from 'react'
import SaveProgressButton from './SaveProgressButton';

function UtteranceDisplayer({user_id, script_id, line, current_line, currentRecordState}) {
  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
  };
  

  return (
    <div style={mystyle}>
      Current utterance: {currentRecordState !== null && <a className='utterance_display_bold'>{line}</a>}
      {SaveProgressButton({user_id: user_id, script_id: script_id, current_line: current_line})}
      </div>
  )
}

export default UtteranceDisplayer