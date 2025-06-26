import React from 'react'
import '../styles/HomeNoUser.css' // import the CSS file
import { useNavigate } from 'react-router-dom'
const HomeNoUser = () => {
  const Navigate = useNavigate() // use navigate hook to navigate to the register page
  return (
    
    <div className="home-banner">
      <div className="home-content">
        <h1 className="home-title">
          <h3 className='other'>Welcome to&nbsp;</h3>  
          <h3 className='bookify'>Bookify </h3>
          </h1>
        <div className="home-description">
  Streamline your entertainment with Bookify where every ticket is just a tap away.
</div>
        <button className='booknow' onClick={()=>Navigate('/register')}>Get Started </button>
      </div>
    </div>
  )
}

export default HomeNoUser
