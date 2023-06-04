import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages'
import AppLayout from './pages/app'
import Log from './pages/app/log'
import Admin from './pages/admin'

function App() {

  return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Log />} />
            {/* <Route path='/logout' element={<LogOut />} /> */}
            <Route path='/app/*' element={<AppLayout />} />
            {/* <Route path='/admin/*' element={<Admin />} /> */}
          </Routes>
        </BrowserRouter>
    
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  )
}

export default App
