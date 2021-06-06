import React from 'react'

export default function Space() {
    const handleClick = () => {        
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(document.getElementById("searchInput"), document.getElementById("searchInput").value + ' ')

        var event = new Event('input', { bubbles: true })
        document.getElementById("searchInput").dispatchEvent(event)
        document.getElementById("searchInput").focus()
    }

    return (
        <span className="key space" onClick={handleClick}>space</span>
    )
}
