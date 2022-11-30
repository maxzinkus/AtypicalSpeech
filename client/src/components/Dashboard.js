import React from 'react'
import {Link} from 'react-router-dom'
import {ListItemButton, ListItemText} from '@mui/material'
// import listReactFiles from 'list-react-files'

function Dashboard() {

    // const utterance_ids = [1]

    return (
        // <div>Dashboard</div>
        <>
        <div>Dashboard</div>
        <Link to="/module1">
            <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Script #1" />
            </ListItemButton>
        </Link>
        </>
    )
}

export default Dashboard