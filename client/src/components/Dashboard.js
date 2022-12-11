import React from 'react'
import {Link} from 'react-router-dom'
import {ListItemButton, ListItemText} from '@mui/material'
import { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardCard from './DashboardCard';

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

    var cards = [];
    for (var i = 1; i < currentState.scriptCount + 1; i++) {
        cards.push(DashboardCard(i))
    }

    return (
        <>
        <div>Dashboard {currentState.scriptCount}</div>
        {cards}
        </>
    )
}

export default Dashboard