import { Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithGoogle } from 'src/firebase'
import './Login.scss'
function Login() {
  const navigate = useNavigate()
  const handleSignIn = async () => {
    const userAuth = await signInWithGoogle()
    if (userAuth) {
      localStorage.setItem('userAuth', JSON.stringify(userAuth))
      navigate('/')
      window.location.reload()
    }
  }
  return (
    <div className='login'>
      <Container>
        <h1>
          The application is under construction, please choose the login method
          below
        </h1>
        <button
          onClick={handleSignIn}
          type='button'
          className='login-with-google-btn'
        >
          Sign in with Google
        </button>
      </Container>
    </div>
  )
}

export default Login
