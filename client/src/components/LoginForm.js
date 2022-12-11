import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// const api = axios.create({
//     baseURL: `http://localhost:3001/`
// })

function LoginForm({Login, error}) {

    const [loginDetails, setLoginDetails] = useState({accessCode: ""});

    const handleAccessCodeChange = (event) => {
        setLoginDetails({
            accessCode: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        Login(loginDetails);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h1 class="text-center">
                    Access Code:
                    <input
                        type='text'
                        value={loginDetails.accessCode}
                        onChange={handleAccessCodeChange}>
                    </input>
                </h1>
            </div>
            
            <Link to="/dashboard">
                <div class="col-md-4 col-md-offset-4 text-center">
                    <Button type="submit" class="btn btn-primary">
                        Submit
                    </Button>
                </div>
            </Link>
        </form>
    )
}

export default LoginForm