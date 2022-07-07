import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import request from 'src/api/request'
import Card from 'src/components/Card/Card'
import Filter from 'src/components/Filter/Filter'

function NowPlaying() {
  const [movieList, setMovieList] = useState([])
  const [filtering, setFiltering] = useState(false)
  const [page, setPage] = useState(1)
  const [filterParams, setFilterParams] = useState({})

  const handleLoadCard = () => {
    setPage(page => page + 1)
  }
  useEffect(() => {
    const getPopularMovies = async () => {
      const result = await request.getMoviesPlaying(page)
      const newMovieList = [...movieList, ...result]
      setMovieList(newMovieList)
    }
    const getFilterMovies = async () => {
      const result = await request.getDiscover('movie', {
        ...filterParams,
        page,
      })
      console.log(result.results)
      const newMovieList = [...movieList, ...result.results]
      setMovieList(newMovieList)
    }
    if (!filtering) {
      getPopularMovies()
    } else {
      getFilterMovies()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterParams])

  return (
    <div className='all_wrapper'>
      <Container>
        <h1 className='heading'>Now Playing Movies</h1>
        <div className='content_wrapper'>
          <Filter
            handleFilterParams={setFilterParams}
            handlePage={setPage}
            handleFiltering={setFiltering}
            handleMovieList={setMovieList}
          />
          <div className='content'>
            <Grid container spacing={2}>
              {movieList.length > 0 ? (
                movieList.map((movie, index) => {
                  return (
                    <Grid
                      item
                      className='mb-5'
                      key={index}
                      lg={3}
                      md={4}
                      sm={6}
                    >
                      <Card data={movie} type='movie' />
                    </Grid>
                  )
                })
              ) : (
                <p style={{ padding: '0 20px' }}>
                  No items were found that match your query.
                </p>
              )}
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

export default NowPlaying
