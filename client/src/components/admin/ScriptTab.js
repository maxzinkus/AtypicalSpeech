import React from 'react'
import AddScriptButton from './AddScriptButton'
import ScriptTabbedList from './ScriptTabbedList'

function ScriptTab() {
  return (
    <div>
        {AddScriptButton()}
        {ScriptTabbedList()}
    </div>
  )
}

export default ScriptTab