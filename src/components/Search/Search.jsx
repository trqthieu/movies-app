import {
  faArrowTrendUp,
  faSearch,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
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
  const debounce = useDebounce(input, 500)
  useEffect(() => {
    inputRef.current.focus()
    const getTrending = async () => {
      setLoading(true)
      const result = await request.getSearchResults(debounce)
      setSearchResults(result)
      setLoading(false)
    }
    if (debounce) {
      getTrending()
    }
    if (!input) {
      setSearchResults([])
    }
  }, [debounce, input])
  return (
    <div className='search__wrapper'>
      <Container>
        <div className='search_form'>
          <div className='search_form_icon'>
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value.trim())}
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
                    <p className='text'>{searchResult.original_title}</p>
                  </div>
                </Container>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Search
