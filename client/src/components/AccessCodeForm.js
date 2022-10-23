import React, { useState } from 'react'
import axios from 'axios'

// const api = axios.create({
//     baseURL: `http://localhost:3001/`
// })

function AccessCodeForm({Login, error}) {

    const [accessCode, setAccessCode] = useState({accessCode: ""});

    const handleAccessCodeChange = (event) => {
        setAccessCode({
            accessCode: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        Login(accessCode);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Access Code:
                    <input
                        type='text'
                        value={accessCode.accessCode}
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

export default AccessCodeForm