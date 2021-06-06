import { createSlice } from '@reduxjs/toolkit'

export const volumeSlice = createSlice({
    name: 'volume',
    initialState: {
        value: 30
    },
    reducers: {
        volumeUp: state => {
            state.value += 10
        },
        volumeDown: state => {
            state.value -= 10
        },
        volumeChange: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { volumeUp, volumeDown, volumeChange } = volumeSlice.actions

export const selectVolume = state => state.volume.value

export default volumeSlice.reducer