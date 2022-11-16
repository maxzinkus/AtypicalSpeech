import React, { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm';
import RecordingModal from '../components/RecordingModal';

function Home() {

  const [user, setUser] = useState({accessCode: ""})
  const [error, setError] = useState("");

  const Login = details => {
    console.log("details: ", details.accessCode);

    setUser({
      accessCode: details.accessCode
    });

    console.log("user: ", user);
  }

  const renderLoginForm = () => {
    if (user.accessCode === "") {
      return <LoginForm Login={Login} error={error}></LoginForm>
    } else {
      return (<><div>Welcome, accessCode: {user.accessCode}</div></>)
    }
  }

  return (
    <>
      <div>AtypicalSpeech</div>
      {renderLoginForm()}
    </>
  )
}

export default Home