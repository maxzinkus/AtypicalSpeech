import React from 'react'
import { Button } from 'semantic-ui-react'

const ScriptController = ({previousLine, nextLine, start, stop, pause, save, restart, review, nextContent, reviewState, recordingState, currentLine}) => (
  <div className="center">
    {/* <Button content='Back' onClick={previousLine}/> */}
    {/* <Button labelPosition='left' icon='left chevron' content='Back' onClick={previousLine}/> */}
    {!reviewState && recordingState !== 'start' && <Button icon='play' content='Start Recording' onClick={start}/>}
    {reviewState && renderReviewStateButtons(restart, nextLine)}
    {!reviewState && currentLine !== 0 && <Button content={"Stop"} onClick={review}></Button>}
  </div>
)

const renderReviewStateButtons = (restart, nextLine) => {
  return (
    <div>
      {renderRerecordButton(restart)} {renderNextButton(nextLine)}
    </div>
  )
}

const renderRerecordButton = (restart) => {
  return (
    <Button variant="primary" onClick={restart}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
        <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"></path>
        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"></path>
      </svg>
      Re-record
    </Button>
  )
}

const renderNextButton = (nextLine) => {
  return (
    <Button variant="success" content={"Move Onto Next Line"} onClick={nextLine}/>
  )
}

export default ScriptController