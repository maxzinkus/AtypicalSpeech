import React from 'react'
import ScriptController from './ScriptController'
import { useState } from 'react';
import UtteranceDisplayer from './UtteranceDisplayer';

function RecordingModal() {

    const [currentState, setCurrentState] = useState({currentLine: 0})
    const [error, setError] = useState("");

    const utterances = JSON.parse('["Ellen looked out at the street through the glass front.", " The man from four hundred and ten was standing out there, smoking a cigarette, watching her.", " When their eyes met, he abruptly threw away the cigarette and started walking toward the apartment house.", " Again she felt that faint dread she had experienced in the hall earlier.", " The waitress picked up her quarter, gave her back a nickel and a dime.", " four hundred and ten was just ahead of her in the lobby.", "He held the front door open for her.", " He opened the elevator doors, too, and she stepped in ahead of him.", " When the doors clanged shut, she had a feeling of panic.", "Come in, my dear, come in.", " She almost fell over the landing.", " The door closed behind her.", " She stumbled to the davenport, sank down, gasping.", " Two cats rubbed against her legs, purring.", " Two cats? She heard herself say stupidly, Missis Moffatt, wheres the other cat? and wondered why she said it."]')

    const previousLine = (event) => {
        var originalLineNumber = currentState.currentLine
        if (currentState.currentLine >= 1) {
            setCurrentState({
                currentLine: originalLineNumber - 1
            })
        }
        console.log("previous line: ", currentState.currentLine)
    }

    const nextLine = (event) => {
        var originalLineNumber = currentState.currentLine
        if (currentState.currentLine >= 0) {
            setCurrentState({
                currentLine: originalLineNumber + 1
            })
        }
        console.log("next line: ", currentState.currentLine)
    }

    return (
        <><div>RecordingModal</div>
        <UtteranceDisplayer line={utterances[currentState.currentLine]}></UtteranceDisplayer>
        <ScriptController previousLine={previousLine} nextLine={nextLine}></ScriptController></>
    )
}

export default RecordingModal