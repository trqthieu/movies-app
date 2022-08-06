import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import request from 'src/api/request'
import { getYear } from 'src/common/formatDate'
import MovieSeasons from './MovieSeasons/MovieSeasons'
import SeasonDetails from './SeasonDetails/SeasonDetails'

function Seasons() {
  return (
    <div>
      <Routes>
        <Route index element={<MovieSeasons />} />
        <Route path='/:seasonNumber' element={<SeasonDetails />} />
      </Routes>
    </div>
  )
}

export default Seasons
