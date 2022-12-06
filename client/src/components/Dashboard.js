import React from 'react'
import {Link} from 'react-router-dom'
import {ListItemButton, ListItemText} from '@mui/material'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {

    const [currentState, setCurrentState] = useState({scriptCount: 0})

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        async function fetchScriptCount() {
            const scriptCount = await axios.get('http://localhost:3000/script/getScriptNum');
            setCurrentState({scriptCount: scriptCount.data});
        }
        fetchScriptCount();
    }, []);

    return (
        <>
        <div>Dashboard {currentState.scriptCount}</div>
        <Link to="/module1">
            <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Script #1" />
            </ListItemButton>
        </Link>
        </>
    )
}

export default Dashboard