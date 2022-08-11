import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import request from 'src/api/request'
import PersonCard from 'src/components/Card/PersonCard/PersonCard'
import '../Person.scss'
function PopularPerson() {
  const [page, setPage] = useState(1)
  const [people, setPeople] = useState([])
  const [totalPage, setTotalPage] = useState()
  const handlePage = item => {
    if (typeof item === 'string') {
      return
    }
    window.scrollTo(0, 0)
    setPage(item)
  }
  useEffect(() => {
    const getPopularPeople = async () => {
      const result = await request.getPopularPeople(page)
      setPeople(result.results)
      setTotalPage(result.total_pages)
    }
    getPopularPeople()
  }, [page, totalPage])

  return (
    <div className='person all_wrapper'>
      <Container>
        <h1 className='heading'>Popular People</h1>
        <div className='content_wrapper'>
          <div className='content'>
            <Grid container spacing={4}>
              {people.map(person => {
                return (
                  <Grid key={person.id} item lg={3} md={4} sm={6}>
                    <PersonCard person={person} />
                  </Grid>
                )
              })}
            </Grid>
            <div className='pagination_wrapper'>
              {page > 1 && (
                <div
                  className='pagination_item adjust'
                  onClick={() => setPage(page - 1)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>Next</span>
                </div>
              )}
              <Pagination
                page={page}
                count={totalPage}
                shape='rounded'
                onChange={handlePage}
                size='large'
                siblingCount={3}
                boundaryCount={2}
                hideNextButton
                hidePrevButton
              />
              {page < totalPage && (
                <div
                  className='pagination_item adjust'
                  onClick={() => setPage(page + 1)}
                >
                  <span>Next</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default PopularPerson
