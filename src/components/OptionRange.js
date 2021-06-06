import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HiPlus, HiMinus } from 'react-icons/hi'

export default function OptionRange({ min, max, step, increment, decrement, valueChange, value }) {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(valueChange(event.target.value))
    }

    const handlePlus = () => {
        dispatch(increment())
    }

    const handleMinus = () => {
        dispatch(decrement())
    }

    const rangeValue = useSelector(value)

    return (
        <span className="optionRange">
            <span className="increment" onClick={handlePlus}><HiPlus/></span>
            <input type="range" name="volume" orient="vertical" value={rangeValue} min={min} max={max} step={step} onChange={handleChange} />
            <span className="decrement" onClick={handleMinus}><HiMinus/></span>
        </span>
    )
}
