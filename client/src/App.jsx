import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Recommendation from './Components/Recommendation/Recommendation'
import Comparison from './Components/Comparison/Comparison'
import UserProfile from './Components/UserProfile/UserProfile'
import Scholarship from './Components/Scholarship/Scholarship'
import ChatUI from './Components/ChatUi/ChatUi'
import ChatPage from './Components/ChatPage/Chatpage'
import ScholarshipComparison from './Components/Comparison/ScholarshipComparison'


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
          <Route path='/chatpage' element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
