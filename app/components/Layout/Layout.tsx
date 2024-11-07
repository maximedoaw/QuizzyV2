"use client"

import React, { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import NavBar from '../NavBar/NavBar'

type LayoutProps = {
    children : ReactNode
}

const Layout : React.FC<LayoutProps> = ({ children }) => {
  return (
    <RecoilRoot>
      <NavBar />
      {children}
    </RecoilRoot>
  )
}

export default Layout
