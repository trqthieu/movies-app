import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import request from 'src/api/request'
import PersonCard from 'src/components/Card/PersonCard/PersonCard'
import '../Person.scss'
function PopularPerson() {
  const [page, setPage] = useState(1)
  const [people, setPeople] = useState([])
  const [totalPage, setTotalPage] = useState()
  const [listPage, setListPage] = useState([])
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
    const displayPage = (currentPage, distance) => {
      const result = []
      let first = [1, 2, '...']
      let last = ['...', totalPage - 1, totalPage]
      const middle = []
      for (let i = distance; i > 0; i--) {
        if (currentPage - i < 1) continue
        middle.push(currentPage - i)
      }
      middle.push(currentPage)
      for (let i = distance; i > 0; i--) {
        if (currentPage + distance + 1 - i > 500) continue
        middle.push(currentPage + distance + 1 - i)
      }

      for (let i = 2; i <= 4; i++) {
        if (currentPage - distance === i) {
          first = []
          for (let j = 1; j < i; j++) {
            first.push(j)
          }
        }
      }
      if (!middle.includes(1)) {
        result.unshift(...first)
      }

      result.push(...middle)
      for (let i = totalPage - 1; i >= totalPage - 3; i--) {
        if (currentPage + distance === i) {
          last = []
          for (let j = totalPage; j > i; j--) {
            last.unshift(j)
          }
        }
      }

      if (!middle.includes(totalPage)) {
        result.push(...last)
      }

      return result
    }
    getPopularPeople()

    setListPage(displayPage(page, 3))
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
              {page !== 1 && (
                <div
                  className='pagination_item adjust'
                  onClick={() => setPage(page - 1)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>Previous</span>
                </div>
              )}
              {listPage.map((item, index) => {
                return (
                  <span
                    onClick={() => handlePage(item)}
                    key={index}
                    className={
                      item === page
                        ? 'pagination_item active'
                        : 'pagination_item'
                    }
                  >
                    {`${item}`}
                  </span>
                )
              })}
              {page !== 500 && (
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
