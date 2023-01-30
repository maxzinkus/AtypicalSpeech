import React from 'react'
import { Button } from 'semantic-ui-react'

const ScriptController = ({previousLine, nextLine, start, stop, pause, save, review, nextContent, reviewState}) => (
  <div className="center">
    <Button content='Back' onClick={previousLine}/>
    {/* <Button labelPosition='left' icon='left chevron' content='Back' onClick={previousLine}/> */}
    {!reviewState && <Button icon='play' content='Start Recording' onClick={start}/>}
    {reviewState && <Button icon='play' content='Review Recording' onClick={start}/>}
    {!reviewState && <Button content={"Stop"} onClick={review}/>}
    {/* {!reviewState && <Button labelPosition='right' icon='right chevron' content={"review"} onClick={review}/>} */}
    {reviewState && <Button content={"Move Onto Next Line"} onClick={nextLine}/>}
    {/* {reviewState && <Button labelPosition='right' icon='right chevron' content={"next line"} onClick={nextLine}/>} */}
  </div>
)

export default ScriptController