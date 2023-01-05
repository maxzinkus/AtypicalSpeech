import React from 'react'
import { Button } from 'semantic-ui-react'

const ScriptController = ({previousLine, nextLine, start, stop, pause, save, review, nextContent, reviewState}) => (
  <Button.Group>
    <Button icon='left chevron' content='Back' onClick={previousLine}/>
    {/* <Button labelPosition='left' icon='left chevron' content='Back' onClick={previousLine}/> */}
    <Button icon='play' content='Play' onClick={start}/>
    {!reviewState && <Button icon='right chevron' content={"review"} onClick={review}/>}
    {/* {!reviewState && <Button labelPosition='right' icon='right chevron' content={"review"} onClick={review}/>} */}
    {reviewState && <Button icon='right chevron' content={"next line"} onClick={nextLine}/>}
    {/* {reviewState && <Button labelPosition='right' icon='right chevron' content={"next line"} onClick={nextLine}/>} */}
  </Button.Group>
)

export default ScriptController