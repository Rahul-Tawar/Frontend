import React from 'react'
import HeroBanner from './HeroBanner'
import TenderList from './TenderList'
import Features from './Features'
import Nav from '../../components/Nav'
import { Footer } from '../../components/Footer'


const Home = () => {
  return (
    
    <>
      <Nav />
      <HeroBanner />
      <TenderList />
      <Features /> 
      <Footer /> 
    </>
     
   
  )
}

export default Home
