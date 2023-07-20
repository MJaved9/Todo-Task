import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Signup from '../Components/Signup'
import Login from '../Components/Login'
import Todo from '../Pages/Todo'
import { useSelector } from 'react-redux';
const AllRoutes = () => {
  
  return (
    <Routes>
      <Route path="/" element={< Todo/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      {/* <Route path="/Notes" element={<Notes/>}/> */   }
      {/* <Route path="/Notes/:note_id" element={<Notes_Edit/>}/> */}
    </Routes>
  )
}

export default AllRoutes