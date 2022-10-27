import React from 'react'
import { Button } from 'semantic-ui-react'

const ScriptController = ({previousLine, nextLine}) => (
  <Button.Group>
    <Button labelPosition='left' icon='left chevron' content='Back' onClick={previousLine}/>
    <Button icon='stop' content='Play' />
    <Button icon='stop' content='Pause' />
    <Button icon='stop' content='Stop' />
    <Button labelPosition='right' icon='right chevron' content='Forward' onClick={nextLine}/>
  </Button.Group>
)

export default ScriptController