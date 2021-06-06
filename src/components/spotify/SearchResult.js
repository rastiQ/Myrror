import React, { useState, useEffect } from 'react'

export default function SearchResult({ track, setQueue, setSearch }) {
    const trackName = track.name.length > 25 ? track.name.substr(0, 25) + '...' : track.name

    const getArtistsString = (stringLength) => {
        let artistsString = ''

        track.artists.forEach((artist, i) => {
            track.artists.length === i + 1 ? artistsString += artist.name : artistsString += artist.name + ', '
        })

        if (artistsString.length > stringLength) return artistsString.substr(0, stringLength) + '...'
        return artistsString
    }

    const handleSong = () => {
        setQueue([track.uri])
        setSearch('')

        document.getElementById("keyboard").style.opacity = 0;
        document.getElementById("keyboard").style.pointerEvents = 'none'
    }

    return (
        <div className="searchResult" onClick={handleSong}>
            <img src={track.album.images[2].url} className="albumImage" />
            <div className="resultText">
                <h3>{trackName}</h3>
                <p>{track.explicit && <span className="explicit">E</span>}{getArtistsString(31)}</p>
            </div>

            {/* knižnica zatiaľ nepodporuje pridávanie do queue
            <div className="trackButtons">
                <span className="addToQueue"><BiListPlus /></span>
                <span className="removeFromQueue"><BiListPlus /></span>
            </div>
            */}
        </div>
    )
}
