import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({ loggedIn, email, onLogout }) => {
  const navigate = useNavigate()

  const onButtonClick = () => {
    if (loggedIn) {
      // Si el usuario está logueado, llamar a la función de logout
      onLogout();
    } else {
      // Si no está logueado, redirigir al login
      navigate('/login');
    }
  }

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <h1>Welcome!</h1>
      </div>
      <p>This is the home page.</p>
      <div className="buttonContainer">
        <input
          className="inputButton"
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        {loggedIn ? <div>Your email address is {email}</div> : null}
      </div>
    </div>
  )
}

export default Home;
