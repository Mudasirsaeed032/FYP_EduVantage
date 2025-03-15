import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Signup/Signup'
import Login from './Login/Login'
import Home from './Home/Home'
import Recommendation from './Recommendation/Recommendation'
import Comparison from './Comparison/Comparison'
import UserProfile from './UserProfile/UserProfile'
import Scholarship from './Scholarship/Scholarship'
import ScholarshipComparison from './Comparison/ScholarshipComparison'
import ChatUI from './ChatUi/ChatUi'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/recommendation' element={<Recommendation />} />
          <Route path='/comparison' element={<Comparison />} />
          <Route path='/profile/:id' element={<UserProfile />} />
          <Route path='/scholarship' element={<Scholarship />} />
          <Route path='/scholarshipcomparison' element={<ScholarshipComparison />} />
          <Route path='/chat' element={<ChatUI />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
