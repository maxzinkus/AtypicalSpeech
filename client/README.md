# Getting Started with the Client-Side of HermeSpeech

Routing can be found in [App.js](src/App.js)

```
<Route exact path="/" element={<Home/>}/>
 <Route exact path="/dashboard" element={<Dashboard />}/>
<Route path="/module" element={<RecordingModal/>}/>
<Route path="/assign-script-specific" element={<AssignScriptsSpecificUserModal/>}/>
<Route path="/unassign_script_specific_user" element={<UnassignScriptSpecificUserModal/>}/>
<Route path="/assign-script-multiple-users" element={<AssignScriptMultipleUsersModal/>}/>
<Route path="/admin" element={<AdminDashboard/>}/>
```

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
