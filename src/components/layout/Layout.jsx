import React from 'react'
import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header'
import { Home } from '../../pages/home/Home';

export const Layout = () => {
  return (
    <>
    <Header/>
    <main>
    <Outlet />
    </main>

    {/* <Footer /> */}
    </>
  )
}
