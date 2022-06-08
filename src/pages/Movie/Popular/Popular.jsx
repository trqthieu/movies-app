import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import request from 'src/api/request'
import Card from 'src/components/Card/Card'
import Filter from 'src/components/Filter/Filter'

function Popular() {
  const [movieList, setMovieList] = useState([])
  const [page, setPage] = useState(1)
  const handleLoadCard = () => {
    setPage(page => page + 1)
  }
  useEffect(() => {
    const getPopularMovies = async () => {
      const result = await request.getPopular('movie', page)
      const newMovieList = [...movieList, ...result]
      setMovieList(newMovieList)
    }
    getPopularMovies()
  }, [page])
  return (
    <div className='all_wrapper'>
      <Container>
        <h1 className='heading'>Popular Movies</h1>
        <div className='content_wrapper'>
          <Filter />
          <div className='content'>
            <Grid container spacing={2}>
              {movieList.map((movie, index) => {
                return (
                  <Grid item className='mb-5' key={index} lg={3} md={4} sm={6}>
                    <Card data={movie} />
                  </Grid>
                )
              })}
            </Grid>
            <button className='button button_loadmore'>
              <Link onClick={handleLoadCard} to={'#'}>
                Load more
              </Link>
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Popular
