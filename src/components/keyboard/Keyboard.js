import React from 'react'
import Key from './Key'
import Space from './Space'
import Backspace from './Backspace'
import { MdKeyboardHide } from 'react-icons/md'

const firstRow = 'qwertzuiop'
const secondRow = 'asdfghjkl'
const thirdRow = 'yxcvbnm'

export default function Keyboard() {
    const handleHideKeyboard = () => { //TODO univerzelnejsie do buducna
        document.getElementById("keyboard").style.opacity = 0;
        document.getElementById("keyboard").style.pointerEvents = 'none'
    }

    return (
        <div className="keyboard" id="keyboard">
            <div className="keyboardHideButton" onClick={handleHideKeyboard}>
                <MdKeyboardHide />
            </div>
            <div className="firstRow">
                {[...firstRow].map(key =>
                    <Key letter={key} key={key}/>
                )}
            </div>
            <div className="secondRow">
                {[...secondRow].map(key =>
                    <Key letter={key} key={key}/>
                )}
            </div>
            <div className="thirdRow">
                {[...thirdRow].map(key =>
                    <Key letter={key} key={key}/>
                )}
            </div>
            <div className="fourthRow">
                <Space />
                <Backspace />
            </div>
        </div>
    )
}
