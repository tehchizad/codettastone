import React from 'react'

import Map from './Map'
import Station from './Station'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Bart () {
  return (
    <React.Fragment>
      <Header />
      <main role='main' className='container'>
        <Map />
        <div className='col overflow-auto'>
          <Station />
        </div>
      </main>
      <Footer />
    </React.Fragment>
  )
}
