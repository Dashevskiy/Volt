import React from 'react'
import './App.css'
import { Main } from './components/main'
import Logo from './assets/logo.svg'

function App() {
  return (
    <div className='container-app'>
      <div>
        <img className='logo' src={Logo}/>
        <hr/>
      </div>

      <Main/>
    </div>
  )
}

export default App
