import React, { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm';

function Home({Login, error}) {

  return (
    <>
      <div>AtypicalSpeech</div>
      <LoginForm Login={Login} error={error}></LoginForm>
    </>
  )
}

export default Home