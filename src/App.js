import './styles/style.scss'
import Dashboard from './components/Dashboard'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import volumeReducer from './components/reducers/volumeSlice'
import connectionReducer from './components/reducers/connectionSlice'

const store = configureStore({
    reducer: {
        volume: volumeReducer,
        connection: connectionReducer
    }
})

function App() {
    return (
        <Provider store={store}>
            <Dashboard />
        </Provider>
    );
}

export default App;
