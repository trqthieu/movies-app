import React, { useEffect, useState } from 'react'
import request from 'src/api/request'
import './LanguageSelect.scss'
function LanguageSelect() {
  const [languages, setLanguages] = useState([])
  useEffect(() => {
    const getLanguages = async () => {
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
        console.log(error)
      }
    }
    getLanguages()
  }, [])
  return (
    <div className='language_select'>
      <select name='language_filter' id='language_filter'>
        <option value='none'>None Selected</option>
        {languages.map(language => {
          return (
            <option key={language.iso_639_1} value={language.iso_639_1}>
              {language.english_name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default LanguageSelect
