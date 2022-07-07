import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import request from 'src/api/request'
import useDebounce from 'src/hooks/useDebounce'
import './KeywordInput.scss'
function KeywordInput({ selectedKeyword, handleKeyword }) {
  const inputRef = useRef()
  const [input, setInput] = useState('')
  const [keywordList, setKeywordList] = useState([])
  const [loading, setLoading] = useState(false)
  const handleInput = e => {
    if (e.target.value.startsWith(' ')) {
      setInput(e.target.value.trim())
      return
    }
    setInput(e.target.value)
  }
  const addKeyword = keyword => {
    const newKeywordList = [...selectedKeyword]
    if (!newKeywordList.includes(keyword)) {
      newKeywordList.push(keyword)
    }
    handleKeyword(newKeywordList)
    setKeywordList([])
    setInput('')
    inputRef.current.focus()
  }
  const removeKeyword = keyword => {
    const newKeywordList = [...selectedKeyword]
    const index = newKeywordList.indexOf(keyword)
    newKeywordList.splice(index, 1)
    handleKeyword(newKeywordList)
  }
  const debounce = useDebounce(input, 500)
  useEffect(() => {
    const getKeywords = async () => {
      setLoading(true)
      const results = await request.getSearchKeywords(debounce)
      setKeywordList(results)
      setLoading(false)
    }
    if (debounce.length > 1) {
      getKeywords()
    }
  }, [debounce])
  return (
    <div>
      <div className='input_wrapper'>
        <div className='selected_keywords'>
          {selectedKeyword.map(selectedKeyword => {
            return (
              <div key={selectedKeyword.id} className='selected_keywords_item'>
                <span>{selectedKeyword.name}</span>
                <FontAwesomeIcon
                  onClick={() => removeKeyword(selectedKeyword)}
                  className='icon'
                  icon={faXmark}
                />
              </div>
            )
          })}
        </div>
        <div className='input_wrapper'>
          <input
            ref={inputRef}
            value={input}
            onChange={handleInput}
            type='text'
            className='keywords_input'
            placeholder='Filter by keywords...'
          />
          {loading && <div className='loading_icon'></div>}
        </div>
      </div>
      <div className='input_results'>
        {keywordList.map(keyword => {
          return (
            <div
              onClick={() => addKeyword(keyword)}
              className='input_results_item'
              key={keyword.id}
            >
              {keyword.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default KeywordInput
