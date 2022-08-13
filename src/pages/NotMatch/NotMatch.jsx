import { Container } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function NotMatch() {
  return (
    <div
      style={{
        padding: '200px 0',
      }}
      className='not_match'
    >
      <Container>
        <h1
          style={{
            fontWeight: '600',
          }}
        >
          Oops! We can't find the page you're looking for
        </h1>
        <button
          style={{
            border: 'none',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '2rem',
            fontWeight: '600',
          }}
        >
          <Link to={'/'}>Return to home page</Link>
        </button>
      </Container>
    </div>
  )
}

export default NotMatch
