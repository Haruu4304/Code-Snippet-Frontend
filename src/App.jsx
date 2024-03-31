import React from 'react'
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import UploadCode from './components/Uploadcode'
import GetuploadedCode from './components/GetuploadedCode'
import HelloUserPage from './components/HelloUserPage'
import Sidebar from './pages/Sidebar'
import Navbar from './pages/Navbar'
import CodeuploadBlock from './components/CodeuploadBlock'

const App = () => {
  return (
    <div>
          <Navbar/>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/hello/:userName' element={<HelloUserPage/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/' element={<Register/>}/>
          <Route path='sidebar' element={<Sidebar/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/uploadCode' element={<UploadCode/>}/>
          <Route path='/getCode' element={<GetuploadedCode/>}/>
          <Route path='/codeUploadblock' element={<CodeuploadBlock/>}/>
        </Routes>
    </div>
  )
}

export default App