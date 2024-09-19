import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Callbacks from './components/Callback';
const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/callbacks" element={<Callbacks/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App