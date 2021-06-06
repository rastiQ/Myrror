import React from 'react'
import Clock from './Clock'
import Weather from './Weather'
import Keyboard from './keyboard/Keyboard'
import MusicPlayer from './spotify/MusicPlayer'
import ShowControl from './ShowControl'
import WifiStatus from './WifiStatus'
import Options from './Options'
import { Online } from 'react-detect-offline'
import { useDispatch } from 'react-redux'
import { connectionChange } from './reducers/connectionSlice'

export default function Dashboard() {
    const dispatch = useDispatch()

    return (
        <>
            <Online polling={{ interval: 1000, timeout: 1000 }} onChange={status => dispatch(connectionChange(status))}></Online>
            <div className="content" id="content">
                <div className="leftColumn" id="leftColumn">
                    <Clock />
                    <MusicPlayer />
                </div>
                <div className="rightColumn" id="rightColumn">
                    <Weather />
                </div>
            </div>
            <div className="bottomBar">
                <Keyboard />
                <WifiStatus />
                <ShowControl />
                <Options />
            </div>
        </>
    )
}
