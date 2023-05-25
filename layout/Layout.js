import React, { Children } from 'react'
import HeaderX from '../components/HeaderX'
import HeaderY from '../components/HeaderY'
import Footer from '../components/Footer'
import Head from 'next/head'

const Layout = ({children,home}) => {
  return (
    <>
    <Head>
      <title>RBlog</title>
    </Head>
    {
      home?<HeaderX />:<HeaderY/>
    }
      
      {children}
      <Footer/>
    </>
  )
}

export default Layout