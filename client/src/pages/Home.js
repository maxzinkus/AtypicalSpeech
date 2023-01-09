import React, { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm';
import RecordingModal from '../components/RecordingModal';
import "../../src/App.css"
import Logo from "./../images/logo1.png"

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
      <br></br>
      <div className="center">
        <img className="logo" src={Logo} alt="logo1"></img>
      </div>
      <div className='right'>
        {renderLoginForm()}
      </div>
    </div>
  )
}

export default Home