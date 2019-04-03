import React from 'react'

import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'

export default function Index () {
  return (
    <React.Fragment>
      <Header />
      <main role='main' className='inner cover'>
        <p className='lead'>#learntocode</p>
      </main>
      <Footer />
    </React.Fragment>
  )
}
