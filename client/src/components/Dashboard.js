import React from 'react'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardCard from './DashboardCard';
import { useLocation } from 'react-router-dom';
import url from 'url';

function Dashboard() {

    const [currentState, setCurrentState] = useState({scriptCount: 0, assignedTasks: [], cards: []})
    const [isFetched, setIsFetched] = useState(false);

    const location = useLocation();
    const accessCode = location.state.accessCode;

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        // async function fetchScriptCount() {
        //     const scriptCount = await axios.get('http://localhost:3000/script/getScriptNum');
        //     setCurrentState({...currentState, scriptCount: scriptCount.data});
        // }
        // fetchScriptCount();

        async function fetchAssignedTasks() {

            const assignedTasks = await axios.post('http://localhost:3000/user/get_assigned_tasks/', {user_id: accessCode});
            console.log(assignedTasks.data.tasks)

            setCurrentState({...currentState, assignedTasks: assignedTasks.data.tasks});
            setIsFetched(true);
        }

        fetchAssignedTasks();

    }, []);

    useEffect(() => {
        var cards = [];

        if (!isFetched) return;

        for (var i = 0; i < currentState.assignedTasks.length; i++) {
            cards.push(<DashboardCard script_id={currentState.assignedTasks[i]}/>)
        }

        setCurrentState({...currentState, cards: cards});

    }, [isFetched])

    if (!isFetched) return null;
    return (
        <>
        <div>Welcome, {accessCode} {currentState.assignedTasks.length}</div>
        {currentState.cards}
        </>
    )
}

export default Dashboard