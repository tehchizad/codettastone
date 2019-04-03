import React from 'react'

export default function Header () {
  return (
    <React.Fragment>
      <header className='masthead mb-auto'>
        <div className='inner'>
          <h4 className='masthead-brand'>
            <a className='nav-link' href='/'>codettastone</a>
          </h4>
          <nav className='nav nav-masthead justify-content-center'>
            <a className='nav-link' href='/bart'>bart</a>
            <a className='nav-link' href='/rest'>rest</a>
          </nav>
        </div>
      </header>
    </React.Fragment>
  )
}
