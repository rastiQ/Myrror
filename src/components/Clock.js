import React, { useState, useEffect } from 'react'
import { days, months } from '../utils/days-sk'

const getDay = (dayNumber) => {
    return days[dayNumber]
}

const getMonth = (monthNumber) => {
    return months[monthNumber]
}

export default function Clock() {
    const [actualTime, setActualTime] = useState(new Date())

    useEffect(() => {
        let timer = setInterval(() => {
            setActualTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [actualTime])

    return (
        <div className="clock">
            <div className="time">
                <span className="hours-minutes">
                    {actualTime.getHours() < 10 ? `0${actualTime.getHours()}:` : `${actualTime.getHours()}:`}
                    {actualTime.getMinutes() < 10 ? `0${actualTime.getMinutes()}` : `${actualTime.getMinutes()}`}
                </span>
                <span className="seconds">{
                    actualTime.getSeconds() < 10 ? `0${actualTime.getSeconds()}`
                        : `${actualTime.getSeconds()}`
                }</span>
            </div>
            <div className="date">
                <span className="day">{`${getDay(actualTime.getDay())}, `}</span>
                <span className="fullDate">{`${actualTime.getDate()}. ${getMonth(actualTime.getMonth())} ${actualTime.getFullYear()}`}</span>
            </div>
        </div>
    )
}
