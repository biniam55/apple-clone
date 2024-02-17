import React from 'react'
import { Nav } from 'react-bootstrap'
import Footer from './Footer'


import { Outlet } from 'react-router-dom'
 function SharedLayout() {
  return (
    <div>
        <Nav/>
        <Outlet/>
        <Footer/>
        
    </div>
  )
}
export default SharedLayout