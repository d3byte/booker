import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Home from './pages/Home'
import rootReducer from './redux/reducers'

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <Home/>
    </Provider>, 
    document.getElementById('root')
)
