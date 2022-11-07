import React from 'react'
import AudioPlayer from './AudioPlayer';

function ReviewPage(audioData) {
  return (
    <><div>ReviewPage</div><AudioPlayer source={audioData}></AudioPlayer></>
  )
}

export default ReviewPage