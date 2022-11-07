import React from 'react'
import { Button } from 'semantic-ui-react'

const ScriptController = ({previousLine, nextLine, start, stop, pause, save, review}) => (
  <Button.Group>
    <Button labelPosition='left' icon='left chevron' content='Back' onClick={previousLine}/>
    <Button icon='play' content='Play' onClick={start}/>
    {/* <Button icon='pause' content='Pause' onClick={pause}/> */}
    {/* <Button icon='stop' content='Stop' onClick={stop}/> */}
    {/* <Button icon='save' content='Save' onClick={save}/> */}
    <Button labelPosition='right' icon='right chevron' content='Review' onClick={review}/>
  </Button.Group>
)

export default ScriptController