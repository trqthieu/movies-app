import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import request from 'src/api/request'
import Card from 'src/components/Card/Card'
import Filter from 'src/components/Filter/Filter'

function Popular() {
  const [movieList, setMovieList] = useState([])
  useEffect(() => {
    const getPopularMovies = async () => {
      const result = await request.getPopular('movie')
      setMovieList(result)
    }
    getPopularMovies()
  }, [])
  return (
    <div className='all_wrapper'>
      <Container>
        <h1 className='heading'>Popular Movies</h1>
        <div className='content_wrapper'>
          <Filter />
          <div className='content'>
            <Row>
              {movieList.map(movie => {
                return (
                  <Col className='mb-5' key={movie.id} lg={3} md={4} sm={6}>
                    <Card data={movie} />
                  </Col>
                )
              })}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Popular
