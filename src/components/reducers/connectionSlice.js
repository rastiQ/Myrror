import { createSlice } from '@reduxjs/toolkit'

export const connectionSlice = createSlice({
    name: 'connection',
    initialState: {
        value: true
    },
    reducers: {
        connectionChange: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { connectionChange } = connectionSlice.actions

export const getConnectionStatus = state => state.connection.value

export default connectionSlice.reducer