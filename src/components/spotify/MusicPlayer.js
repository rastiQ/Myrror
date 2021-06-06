import React from 'react'
import Login from './Login'
import Player from './Player'
import { useSelector } from 'react-redux'
import { getConnectionStatus } from '../reducers/connectionSlice'

const code = new URLSearchParams(window.location.search).get('code')

export default function MusicPlayer() {
    const isConnected = useSelector(getConnectionStatus)

    return (
        <div className="musicPlayer">
            {isConnected ? (!code ? <Login /> : <Player code={code} refreshRate={2} />) : <></>}
        </div>
    )
}
