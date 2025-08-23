import { BrowserRoter, Routes, Route } from 'react-router-dom'
import React from 'react'

const AppRouter = () => {
  return (
    <BrowserRoter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    </BrowserRoter>
  )
}

export default AppRouter