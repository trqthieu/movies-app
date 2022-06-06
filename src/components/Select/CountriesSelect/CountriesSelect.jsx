import axios from 'axios'
import React, { useEffect, useState } from 'react'
import request from 'src/api/request'
import './CountriesSelect.scss'
function CountriesSelect() {
  const [countryList, setCountryList] = useState([])
  useEffect(() => {
    const getCountries = async () => {
      const result = await request.getCountryResults()
      setCountryList(result)
    }
    getCountries()
  }, [])

  return (
    <div className='countries_select'>
      <select name='countries' id='countries'>
        {countryList.map((country, index) => {
          return (
            <option key={index} value={country.iso_3166_1}>
              {country.english_name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default CountriesSelect
