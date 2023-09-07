import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { message } from 'antd';
import axios from 'fetch'
import UtteranceDisplayer from './UtteranceDisplayer';

function RecordingMedia(){
    const location = useLocation();
    const navigate = useNavigate();

    const accessCode = location.state.accessCode;
    const userID = accessCode;
    const scriptID = location.state.script_id;
    const type = location.state.type;
    const line = location.state.line;

    // state
    const [checkBlob, setCheckBlob] = useState(null);
    const [currentState, setCurrentState] = useState({currentLine: 0, recordState: null, audioData: null, review: false, totalLines: [], startState: false, addr:''})

    // effect
    useEffect(()=>{
        async function fetchScript() {
            const res = await axios.post('/api/media/get_id', {script_id: scriptID});

            const script = res.data;

            console.log('===>', line, script.desc)
            setCurrentState({
                ...currentState,
                totalLines: script.desc,
                currentLine: line,
                addr: script.addr
            })
        }

        fetchScript()
    }, [])

    // new recorder library
    const recorderControls = useAudioRecorder()

    // const stopAudioRecorder = (save) => {
    //     setShouldSave(save);
    //     recorderControls.stopRecording();
    // }

    const startModule = async () => {
        setCurrentState({...currentState, startState: true})
    }

    const UtteranceDisplayerRendering = () => {
        return <UtteranceDisplayer currentRecordState={true} line={currentState.totalLines} current_line={currentState.currentLine}></UtteranceDisplayer>
    }

    const renderRecordingModal = () => {
        return (
            <>
                <div className='utterance_display'>
                    {UtteranceDisplayerRendering()}
                </div>
                <br/>
                <div className='center'>
                    <img alt="example" style={{width: '800px',}} src={currentState.addr}/>
                    {/* {renderRecorder()} */}
                </div>
            </>
        )
    }

    if (!currentState.startState) {
        return (
        <div className='vertical_center'>
            <div className='large_font_blue_center'>
            You are about to start {type} # {scriptID}.
            <br />
            Please press START when you are ready to begin/resume.
            </div>
            <br />
            
            <div className='login_button'>
                <button class="btn btn-primary" onClick={startModule}>Start</button>
            </div>
        </div>
        )
    }

    return(
        <div>
            {renderRecordingModal()}
        {/* {currentState.totalLines === currentState.currentLine && renderComplete()} */}
        </div>
    )
}

export default RecordingMedia