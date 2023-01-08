import React from 'react'
import { Button } from 'semantic-ui-react'

const ScriptController = ({previousLine, nextLine, start, stop, pause, save, review, nextContent, reviewState}) => (
  <div className="center">
    <Button content='Back' onClick={previousLine}/>
    {/* <Button labelPosition='left' icon='left chevron' content='Back' onClick={previousLine}/> */}
    <Button icon='play' content='Play' onClick={start}/>
    {!reviewState && <Button content={"Stop"} onClick={review}/>}
    {/* {!reviewState && <Button labelPosition='right' icon='right chevron' content={"review"} onClick={review}/>} */}
    {reviewState && <Button content={"next line"} onClick={nextLine}/>}
    {/* {reviewState && <Button labelPosition='right' icon='right chevron' content={"next line"} onClick={nextLine}/>} */}
  </div>
)

export default ScriptController