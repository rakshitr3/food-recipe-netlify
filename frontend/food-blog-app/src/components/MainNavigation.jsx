import React from 'react'
import { Outlet } from 'react-router-dom'              //Outlet is used for rendering children used in app.jsx create browser router
import Footer from './Footer'
import Navbar from './Navbar'

export default function MainNavigation() {
  return (
   <>
    <Navbar/>
    <Outlet/>
    <Footer/>
   </>
  )
}