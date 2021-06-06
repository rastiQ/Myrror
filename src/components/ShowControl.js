import React, { useState, useEffect } from 'react'
import { FiMaximize, FiMinimize } from 'react-icons/fi'

export default function ShowControl() {
    const [isShown, setIsShown] = useState(true)

    useEffect(() => {
        if(!isShown) {
            document.getElementById("content").style.opacity = 0;
            document.getElementById("content").style.pointerEvents = 'none';
            document.getElementById("keyboard").style.opacity = 0;
            document.getElementById("keyboard").style.pointerEvents = 'none';
            document.getElementById("options").style.opacity = 0;
            document.getElementById("options").style.pointerEvents = 'none';
            return
        }
        document.getElementById("content").style.opacity = 1;
        document.getElementById("content").style.pointerEvents = 'all';
        document.getElementById("options").style.opacity = 1;
        document.getElementById("options").style.pointerEvents = 'all';

    }, [isShown])

    return (
        <div className="showControl">
            {!isShown ?
                <span className="show" onClick={() => setIsShown(true)}>
                    <FiMaximize />
                </span>
                :
                <span className="hide" onClick={() => setIsShown(false)}>
                    <FiMinimize />
                </span>}
        </div>
    )
}
