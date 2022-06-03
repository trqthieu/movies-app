import React, { useEffect, useState } from 'react'
import request from 'src/api/request'
import './Language.scss'
function Language() {
  const [currentLanguage, setCurrentLangue] = useState('en')
  const [fallbackLanguage, setFallbackLangue] = useState('none')
  const [languages, setLanguages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const handleReset = () => {
    setCurrentLangue('en')
    setFallbackLangue('none')
  }

  useEffect(() => {
    const getLanguages = async () => {
      setLoading(true)
      setError()
      try {
        const result = await request.getLanguages()
        result.sort((a, b) =>
          a.english_name > b.english_name
            ? 1
            : b.english_name > a.english_name
            ? -1
            : 0
        )
        setLanguages(result)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    getLanguages()
  }, [])
  return (
    <div className='popup_wrapper'>
      {loading ? (
        <div className='loading_popup'>
          <div className='loading_icon'></div>
        </div>
      ) : (
        <>
          <h3 className='popup_title'>Language Preferences</h3>
          <p onClick={handleReset} className='language_reset'>
            Reset
          </p>
          <div className='default_langue'>
            <p className='title'>Default Language</p>
            <select
              className='select_language'
              value={currentLanguage}
              onChange={e => setCurrentLangue(e.target.value)}
              id='default-language'
            >
              {languages.map((language, index) => {
                return (
                  <option key={index} value={language.iso_639_1}>
                    {language.english_name}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='fallback_langue'>
            <p className='title'>Fallback Language</p>
            <select
              className='select_language'
              onChange={e => setFallbackLangue(e.target.value)}
              value={fallbackLanguage}
              id='fallback-language'
            >
              <option value='none'>None (Don't Fallback)</option>
              {languages.map((language, index) => {
                return (
                  <option key={index} value={language.iso_639_1}>
                    {language.english_name}
                  </option>
                )
              })}
            </select>
          </div>
        </>
      )}
      {error && <h3>{error.message}. Try again...</h3>}
    </div>
  )
}

export default Language
