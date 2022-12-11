import React from 'react'
import {Link} from 'react-router-dom'
import RecordingModal from './RecordingModal'
import { Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function DashboardCard({script_id}) {
  return (
    <div class="card text-center">
    <div class="card-header">
        Script {script_id}
    </div>
    <div class="card-body">
        <h3 class="card-title">Script {script_id}</h3>
        <p class="card-text">Script Text</p>
        {/* <Link to="/module1"> */}
        <Link to={{pathname:"/module1", state:{accessCode:"abc"}}}>
            <a class="btn btn-primary">Start</a>
        </Link>
        {/* <Link to={`/module/${script_id}`}>
            <a class="btn btn-primary">Start</a>
        </Link> */}
    </div>
    <div class="card-footer text-muted">
        {/* 2 days ago */}
    </div>
    </div>
  )
}

export default DashboardCard