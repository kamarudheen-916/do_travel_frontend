import React from 'react'
import AdminRoute from './AdminRoute'
import UserRoutes from './UserRoute'
import { Route, Routes } from 'react-router-dom'

const MainRoute : React.FC =() =>{
  
  return (
    <div>
      
      <Routes>
        <Route path="/*" element={<UserRoutes/>} />
        <Route path="/admin/*" element={<AdminRoute />} />
    </Routes>
    </div>
  )
}

export default MainRoute
