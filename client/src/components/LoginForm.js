import React, { useState } from 'react'
import axios from 'axios'

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
                <label>
                    Access Code:
                    <input
                        type='text'
                        value={loginDetails.accessCode}
                        onChange={handleAccessCodeChange}>
                    </input>
                </label>
            </div>
            <button type="submit">
                Submit
            </button>
        </form>
    )
}

export default LoginForm