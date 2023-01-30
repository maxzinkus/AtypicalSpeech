import React from 'react'

function UtteranceDisplayer({line}) {
  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
  };
  

  return (
    <div style={mystyle}>Current utterance: <a className='utterance_display_bold'>{line}</a></div>
  )
}

export default UtteranceDisplayer