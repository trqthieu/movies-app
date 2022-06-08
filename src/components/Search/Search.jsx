import {
  faArrowTrendUp,
  faSearch,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import axiosClient from 'src/api/axios'
import request from 'src/api/request'
import requestPaths from 'src/api/request'
import useDebounce from 'src/hooks/useDebounce'
import './Search.scss'
function Search() {
  const inputRef = useRef()
  const [searchResults, setSearchResults] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const debounce = useDebounce(input, 500)
  const handleInput = e => {
    const value = e.target.value
    if (value.startsWith(' ')) {
      setInput(value.trim())
      return
    }
    setInput(value)
  }
  useEffect(() => {
    inputRef.current.focus()
    const getTrending = async () => {
      try {
        setLoading(true)
        setError()
        const result = await request.getSearchResults(debounce)
        console.log(result)
        setSearchResults(result)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    if (debounce) {
      getTrending()
    }
  }, [debounce])
  useEffect(() => {
    if (!input) {
      setSearchResults([])
    }
  }, [input])
  return (
    <div className='search_wrapper'>
      <div className='search_form_wrapper'>
        <Container>
          <div className='search_form'>
            <div className='search_form_icon'>
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <input
              ref={inputRef}
              value={input}
              onChange={handleInput}
              type='text'
              placeholder='Search for a movie, tv show, person...'
            />
            <div className='search_form_status'>
              {debounce && !loading && (
                <div
                  onClick={() => {
                    setInput('')
                    inputRef.current.focus()
                  }}
                  className='clear_icon'
                >
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              )}
              {loading && <div className='loading_icon'></div>}
            </div>
          </div>
        </Container>
      </div>
      {searchResults.length > 0 && input && (
        <div className='search_list'>
          <div className='search_item'>
            <Container>
              <div className='title'>
                <FontAwesomeIcon icon={faArrowTrendUp} />
                <h4 className='text'>Trending</h4>
              </div>
            </Container>
          </div>
          {searchResults.map(searchResult => {
            return (
              <div key={searchResult.id} className='search_item'>
                <Container>
                  <div className='result'>
                    <FontAwesomeIcon icon={faSearch} />
                    <p className='text'>
                      {searchResult.name || searchResult.original_title}
                    </p>
                  </div>
                </Container>
              </div>
            )
          })}
        </div>
      )}
      {error && (
        <Container>
          <h3>{error.message}. Try again...</h3>
        </Container>
      )}
    </div>
  )
}

export default Search
