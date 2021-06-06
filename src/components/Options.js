import React, { useState, useEffect } from 'react'
import OptionRange from './OptionRange'
import { IoOptionsOutline, IoMusicalNotesOutline } from 'react-icons/io5'
import { volumeUp, volumeDown, volumeChange, selectVolume } from './reducers/volumeSlice'

export default function Options() {
    const [areShown, setAreShown] = useState(false)

    const handleShowOptions = () => {
        if (!areShown) setAreShown(true)
        else setAreShown(false)
    }

    useEffect(() => {
        if (!areShown) {
            document.getElementById("optionsContent").style.opacity = 0
            document.getElementById("optionsContent").style.pointerEvents = 'none'
            return
        }
        document.getElementById("optionsContent").style.opacity = 1
        document.getElementById("optionsContent").style.pointerEvents = 'all'
    }, [areShown])

    return (
        <div className="options" id="options">
            <span className="showOptions" onClick={handleShowOptions}><IoOptionsOutline /></span>
            <div className="optionsContent" id="optionsContent">
                <div className="volumeOption option">
                    <span className="optionIcon">
                        <IoMusicalNotesOutline />
                    </span>
                    <OptionRange
                        min={0}
                        max={100}
                        step={10}
                        value={selectVolume}
                        increment={volumeUp}
                        decrement={volumeDown}
                        valueChange={volumeChange}
                    />
                </div>
            </div>
        </div>
    )
}
