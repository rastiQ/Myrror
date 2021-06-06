import React, { useEffect, useState } from 'react'
import { MdDevices } from 'react-icons/md'

export default function CurrentPlayback({ currentPlayback, isPlayingOnThisDevice, SpotifyApi, deviceId, deviceName, setDeviceId }) {
    const [trackName, setTrackName] = useState()
    const [artistsString, setArtistsString] = useState()

    useEffect(() => {
        if (!currentPlayback.item) return
        setTrackName(currentPlayback.item.name.length > 20 ? currentPlayback.item.name.substr(0, 20) + '...' : currentPlayback.item.name)
        setArtistsString(getArtistsString(30))
    }, [currentPlayback])

    const getArtistsString = (stringLength) => {
        let artistsString = ''

        currentPlayback.item.artists.forEach((artist, i) => {
            currentPlayback.item.artists.length === i + 1 ? artistsString += artist.name : artistsString += artist.name + ', '
        })

        if (artistsString.length > stringLength) return artistsString.substr(0, stringLength) + '...'
        return artistsString
    }

    const playOnThisDevice = () => {
        SpotifyApi.getMyDevices().then(data => {
            data.body.devices.forEach(device => {
                if (device.name === deviceName) {
                    setDeviceId(device.id)
                    SpotifyApi.transferMyPlayback([device.id]).then(() => {
                        return
                    }).catch(error => {
                        console.log(error)
                    })
                }
            })
        })
    }

    return (
        currentPlayback.item &&
        <div className="currentPlayback">
            <span className="currentDevice"><MdDevices /> {currentPlayback.device.name}</span>
            {!isPlayingOnThisDevice && <span className="playOnThisDevice" onClick={playOnThisDevice}>Počúvať na tomto zariadení</span>}
            <img src={currentPlayback.item.album.images[1].url} className="currentPlaybackImage" />
            <div className="currentPlaybackInfo">
                <h3>{trackName}</h3>
                <p>{currentPlayback.item.explicit && <span className="explicit">E</span>}{artistsString}</p>
            </div>
        </div>
    )
}
