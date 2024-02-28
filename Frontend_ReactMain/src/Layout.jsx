import React, { Fragment } from 'react'
import Navbar from './components/Navbar'
// import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <Fragment>
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
    </Fragment>
  )
}
