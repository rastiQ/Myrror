import React, { useState, useEffect } from 'react'
import useAuth from './useAuth'
import Search from './Search'
import CurrentPlayback from './CurrentPlayback'
import SpotifyWebApi from 'spotify-web-api-node'
import SpotifyPlayer from 'react-spotify-web-playback'
import { selectVolume } from '../reducers/volumeSlice'
import { useSelector } from 'react-redux'

const SpotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_SPOTIFY_CLIENTID
})

const deviceName = 'Zrkadielko V1'

export default function Player({ code, refreshRate }) {
    const accessToken = useAuth(code)
    const [queue, setQueue] = useState()
    const [isPlaying, setIsPlaying] = useState()
    const [currentPlayback, setCurrentPlayback] = useState()
    const [isPlayingOnThisDevice, setIsPlayingOnThisDevice] = useState()
    const [deviceId, setDeviceId] = useState()

    useEffect(() => {
        if (!accessToken) return
        SpotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    const volume = useSelector(selectVolume)

    useEffect(() => {
        if(!accessToken) return

        SpotifyApi.setVolume(volume)
    }, [volume])

    useEffect(() => {
        if (!accessToken) return

        const currentStateInterval = setInterval(() => {
            SpotifyApi.getMyCurrentPlaybackState().then(data => {
                if (data.body) {
                    setCurrentPlayback(data.body)
                    setIsPlaying(data.body.is_playing)
                    setIsPlayingOnThisDevice(data.body.device.name === deviceName ? true : false)
                }
            })
        }, refreshRate * (1000))

        return () => clearInterval(currentStateInterval)

    }, [accessToken])

    useEffect(() => {
        setIsPlaying(true)
    }, [queue])

    if (!accessToken) return null
    return (
        <>
            {currentPlayback && <CurrentPlayback
                currentPlayback={currentPlayback}
                isPlayingOnThisDevice={isPlayingOnThisDevice}
                SpotifyApi={SpotifyApi}
                deviceId={deviceId}
                deviceName={deviceName}
                setDeviceId={setDeviceId} />}
            <SpotifyPlayer
                token={accessToken}
                play={isPlaying}
                callback={state => {
                    if (!state.isPlaying) setIsPlaying(false)
                }}
                syncExternalDevice={true}
                syncExternalDeviceInterval={refreshRate}
                persistDeviceSelection={true}
                uris={queue}
                name={deviceName}
                styles={playerStyle}
            />
            <Search SpotifyApi={SpotifyApi} accessToken={accessToken} setQueue={setQueue} />
        </>
    )
}

const playerStyle = {
    sliderColor: '#AAA',
    bgColor: '#000',
    sliderHandleColor: '#FFF',
    sliderTrackColor: '#777',
    color: '#FFF',
    trackNameColor: '#FFF',
    trackArtistColor: '#AAA'
}
