import { Container } from '@mui/material'
import React, { useRef, useState } from 'react'
import request from 'src/api/request'
import Card from '../Card/Card'
import './Banner.scss'
function Banner() {
  const inputRef = useRef()
  const [input, setInput] = useState('')
  const getSearchResults = async value => {
    const result = await request.getMovies(value)
    console.log(result)
  }
  const handleInput = e => {
    const value = e.target.value
    if (value.startsWith(' ')) {
      setInput(value.trim())
      return
    }
    setInput(value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (input.length > 0) {
      getSearchResults(input)
      //navigate to search page
      return
    }
    inputRef.current.focus()
  }
  return (
    <div className='banner'>
      <Container>
        <div className='banner_content'>
          <div className='banner_content_title'>
            <h1>Welcome.</h1>
            <h4>
              Millions of movies, TV shows and people to discover. Explore now.
            </h4>
          </div>
          <form onSubmit={handleSubmit} className='banner_content_form'>
            <input
              ref={inputRef}
              onChange={handleInput}
              value={input}
              type='text'
              placeholder='Search for a movie, tv show, person...'
            />
            <button type='submit'>Search</button>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default Banner
