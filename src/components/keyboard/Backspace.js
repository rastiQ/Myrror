import React from 'react'
import {TiBackspaceOutline} from 'react-icons/ti'

export default function Backspace() {
    const handleClick = () => {        
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(document.getElementById("searchInput"), document.getElementById("searchInput").value.slice(0, -1))

        var event = new Event('input', { bubbles: true })
        document.getElementById("searchInput").dispatchEvent(event)
        document.getElementById("searchInput").focus()
    }

    return (
        <span className="key backspace" onClick={handleClick}><TiBackspaceOutline/></span>
    )
}
