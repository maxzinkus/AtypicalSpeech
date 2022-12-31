import React from 'react'
import ScriptController from './ScriptController'
import { useState, useEffect } from 'react';
import UtteranceDisplayer from './UtteranceDisplayer';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import AudioPlayer from './AudioPlayer';
import ReviewPage from './ReviewPage';
import { useLocation } from 'react-router-dom';
import axios from 'axios'

function RecordingModal() {

    const location = useLocation();
    const accessCode = location.state.accessCode;
    const scriptID = location.state.script_id;

    console.log("script id in modal: ", scriptID);

    const [currentState, setCurrentState] = useState({currentLine: 0, recordState: null, audioData: null, review: false})
    const [currentUtterances, setCurrentUtterances] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [error, setError] = useState("");

    const RECORDING_DELAY = 1000;

    useEffect(() => {
        async function fetchScript() {
            const script = await axios.post('http://localhost:3000/script/findScriptID/', {script_id: scriptID});
            console.log(script.data.utterances.utterances)
            setCurrentUtterances(script.data.utterances.utterances)
            console.log("after setting utterances: ", currentUtterances)
            setIsFetched(true)
        }

        fetchScript();
    }, [])

    // const utterances = JSON.parse('["", "Ellen looked out at the street through the glass front.", " The man from four hundred and ten was standing out there, smoking a cigarette, watching her.", " When their eyes met, he abruptly threw away the cigarette and started walking toward the apartment house.", " Again she felt that faint dread she had experienced in the hall earlier.", " The waitress picked up her quarter, gave her back a nickel and a dime.", " four hundred and ten was just ahead of her in the lobby.", "He held the front door open for her.", " He opened the elevator doors, too, and she stepped in ahead of him.", " When the doors clanged shut, she had a feeling of panic.", "Come in, my dear, come in.", " She almost fell over the landing.", " The door closed behind her.", " She stumbled to the davenport, sank down, gasping.", " Two cats rubbed against her legs, purring.", " Two cats? She heard herself say stupidly, Missis Moffatt, wheres the other cat? and wondered why she said it."]')
    
    const blobToFile = (theBlob, fileName) => {
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }

    const previousLine = (event) => {
        var originalLineNumber = currentState.currentLine
        if (currentState.currentLine >= 1) {
            setCurrentState({
                ...currentState,
                currentLine: originalLineNumber - 1
            })
        }
        console.log("previous line: ", currentState.currentLine)
    }

    const review = async (event) => {
        console.log("review")
        setCurrentState({
            ...currentState,
            review: true
        })
        console.log("after review:", currentState)

        console.log("stop recording after one second")
        await new Promise(resolve => setTimeout(resolve, RECORDING_DELAY));
        console.log("one second delay")
        stop()
    }

    const convertToNonReview = (event) => {
        console.log("change to recording state")
        setCurrentState({
            ...currentState,
            review: false
        })
    }

    const nextLine = (event) => {
        console.log("next line")
        var originalLineNumber = currentState.currentLine
        if (currentState.currentLine >= 0) {
            console.log("add current line: ", originalLineNumber + 1)
            setCurrentState({
                ...currentState,
                review: false,
                currentLine: originalLineNumber + 1
            })
        }
        console.log("next line: ", currentState.currentLine)
        // convertToNonReview()
        saveBlob()
        start()
    }

    const start = async (event) => {
        console.log("start recording after one second")
        await new Promise(resolve => setTimeout(resolve, RECORDING_DELAY));

        setCurrentState({
            ...currentState,
            currentLine: currentState.currentLine + 1,
            recordState: RecordState.START,
            review: false
        })

        console.log(currentState)
    }

    const pause = (event) => {
        console.log("Pause")
        setCurrentState({
            ...currentState,
            recordState: RecordState.PAUSE,
        })
    }

    const stop = async (event) => {
        await new Promise(resolve => setTimeout(resolve, RECORDING_DELAY));

        setCurrentState({
            ...currentState,
            recordState: RecordState.STOP,
            review: true
        })
        console.log("stope")
        console.log(currentState)
    }

    const saveBlob = (event) => {
        var blob = currentState.audioData.blob
        var fileName =  accessCode + "_script" + scriptID + "_line#" + currentState.currentLine.toString()
        console.log("file name: ", fileName);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
    
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    async function createBlobFromLocalPath(containerClient, blobName, localFileWithPath, uploadOptions){

        // create blob client from container client
        const blockBlobClient = await containerClient.getBlockBlobClient(blobName);
    
        // upload file to blob storage
        await blockBlobClient.uploadFile(localFileWithPath, uploadOptions);
        console.log(`${blobName} succeeded`);
    }

    const onStop = (audioData) => {
        console.log('audioData', audioData)
        setCurrentState({
            // currentLine: currentState.currentLine,
            // recordState: currentState.recordState,
            ...currentState,
            audioData: audioData
        })
        ReviewPageRendering()
    }

    const ReviewPageRendering = () => {
        console.log("review page rendering: ", currentState.review)
        if (currentState.review) {
            return <ReviewPage audioData={currentState.audioData}></ReviewPage>
        }
    }

    const AudioPlayerRendering = () => {
        return <AudioPlayer source={currentState.audioData}></AudioPlayer>
    }

    const UtteranceDisplayerRendering = () => {
        // await new Promise(resolve => setTimeout(resolve, RECORDING_DELAY));
        // if (currentUtterances.utterances === ) return
        return <UtteranceDisplayer line={currentUtterances[currentState.currentLine]}></UtteranceDisplayer>
    }

    const render = () => {
        return (
            <><div>
                {UtteranceDisplayerRendering()}
                {<AudioReactRecorder state={currentState.recordState} onStop={onStop}></AudioReactRecorder>}
                {currentState.review && <audio id="audio" controls src={currentState.audioData ? currentState.audioData.url : null}></audio>}
                {currentState.review && <ReviewPage audioData={currentState.audioData}></ReviewPage>}
                {<ScriptController previousLine={previousLine} nextLine={nextLine} start={start} stop={stop} pause={pause} save={saveBlob} review={review} nextContent={"Review"} reviewState={currentState.review}></ScriptController>}
            </div></>
        )
    }

    if (!isFetched) {
        return <div className="App">Loading...</div>;
    }
    
    return (
        <>
        {render()}
        </>
    );

}

export default RecordingModal