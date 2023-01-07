import React, { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm';
import RecordingModal from '../components/RecordingModal';
import "../../src/App.css"

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
    <div className="general_background">
      <div className="center">
        <p>AtypicalSpeech</p>
      </div>
      <div className='right'>
        {renderLoginForm()}
      </div>
      <img src="./jhu_som_logo_transparent_white.png" alt="Johns Hopkins School of Medicine"></img>
    </div>
  )
}

export default Home