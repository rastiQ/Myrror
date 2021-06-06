import React from 'react'
import { RiWifiLine, RiWifiOffLine } from 'react-icons/ri'
import { getConnectionStatus } from './reducers/connectionSlice'
import { useSelector } from 'react-redux'

export default function WifiStatus() {
    const isConnected = useSelector(getConnectionStatus)

    return (
        <div className="wifiStatus">
            {isConnected ? <RiWifiLine /> : <RiWifiOffLine />}
        </div>
    )
}
