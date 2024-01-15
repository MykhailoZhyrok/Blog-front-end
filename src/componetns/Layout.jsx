import React from 'react'
import { Navbar } from './Navbar'
import cl from './layout.module.css'
export const Layout = ({children}) => {

  
  return (
    <React.Fragment>
        <div className={cl.navbar}>
            <Navbar/>
        </div>
        {children}
    </React.Fragment>
  )
}
