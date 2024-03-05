import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './app'
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
