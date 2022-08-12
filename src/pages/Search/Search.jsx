import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid, Pagination, PaginationItem } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useParams } from 'react-router-dom'
import request from 'src/api/request'
import images from 'src/assets/images/images'
import formatDate from 'src/common/formatDate'
import getImagePath from 'src/common/getImagePath'
import SearchFilter from 'src/components/Filter/SearchFilter/SearchFilter'
import './Search.scss'
const searchFilter = [
  {
    type: 'movie',
    text: 'Movies',
    count: 0,
  },
  {
    type: 'tv',
    text: 'TV Shows',
    count: 0,
  },
  {
    type: 'person',
    text: 'People',
    count: 0,
  },
  //   {
  //     type: 'collection',
  //     text: 'Collections',
  //     count: 0,
  //   },
  {
    type: 'company',
    text: 'Companies',
    count: 0,
  },
  {
    type: 'keyword',
    text: 'Keywords',
    count: 0,
  },
]

function Search() {
  const { type, query } = useParams()
  const [displayType, setDisplayType] = useState(searchFilter)
  const [selectedType, setSelectedType] = useState(() =>
    searchFilter.find(search => search.type === type)
  )
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [movieList, setMovieList] = useState([])

  const handlePage = (event, value) => {
    setCurrentPage(value)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const getSearchResults = async () => {
      const result = await request.getSearchResults(
        selectedType.type,
        query,
        currentPage
      )
      setTotalPage(result.total_pages)
      setMovieList(result.results)
    }
    getSearchResults()
  }, [selectedType, query, currentPage])

  useEffect(() => {
    document.title = `${query} - Movies App`
    const promiseList = displayType.map(typeItem => {
      return request.getSearchResults(typeItem.type, query, 1)
    })
    Promise.all(promiseList).then(value => {
      const newDisplayType = displayType.map((type, index) => {
        return {
          type: type.type,
          text: type.text,
          count: value[index].total_results,
        }
      })
      setDisplayType(newDisplayType)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <div className='search_content_wrapper'>
      <Container>
        <div className='search_content'>
          <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
              <SearchFilter
                setCurrentPage={setCurrentPage}
                displayType={displayType}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
              />
            </Grid>
            <Grid item md={9} xs={12}>
              <div className='filter_content'>
                {(selectedType.type === 'tv' ||
                  selectedType.type === 'movie' ||
                  selectedType.type === 'collection') &&
                  movieList.map((movie, index) => (
                    <div key={index} className='movie_item'>
                      <Link to={`/${selectedType.type}/${movie.id}`}>
                        <div className='movie_item_img'>
                          <LazyLoadImage
                            effect='opacity'
                            src={
                              movie.poster_path
                                ? getImagePath(movie.poster_path)
                                : images.loadingImage
                            }
                            alt=''
                          />
                        </div>
                      </Link>
                      <div className='movie_item_info'>
                        <div>
                          <Link to={`/${selectedType.type}/${movie.id}`}>
                            <h3>{movie.name || movie.title}</h3>
                          </Link>
                          {selectedType.type !== 'collection' && (
                            <span>
                              {formatDate(
                                movie.first_air_date || movie.release_date
                              )}
                            </span>
                          )}
                        </div>
                        <p>{movie.overview}</p>
                      </div>
                    </div>
                  ))}
                {selectedType.type === 'person' &&
                  movieList.map(person => (
                    <div key={person.id} className='person_item'>
                      <div className='person_img'>
                        <LazyLoadImage
                          effect='blur'
                          src={
                            person.profile_path
                              ? getImagePath(person.profile_path)
                              : person.gender === 2
                              ? images.malePerson
                              : images.femalePerson
                          }
                          alt=''
                        />
                      </div>
                      <div className='person_info'>
                        <Link to={`/person/${person.id}`}>
                          <strong>{person.name}</strong>
                        </Link>
                        <p>
                          {person.known_for_department} •{' '}
                          {person.known_for &&
                            person.known_for.map((known, index) => (
                              <Link
                                to={`/${known.media_type}/${known.id}`}
                                key={known.id}
                              >
                                {known.title || known.name}
                                {index === person.known_for.length - 1
                                  ? ''
                                  : ', '}
                              </Link>
                            ))}
                        </p>
                      </div>
                    </div>
                  ))}
                {selectedType.type === 'company' && (
                  <div className='company_list'>
                    {movieList.map(company => (
                      <div key={company.id} className='company_item'>
                        <Link to={`/company/${company.id}/movie`}>
                          {company.name}
                        </Link>
                        <div className='company_img'>
                          <LazyLoadImage
                            effect='blur'
                            src={getImagePath(company.logo_path)}
                            alt=''
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {selectedType.type === 'keyword' && (
                  <div className='keyword_list'>
                    {movieList.map(keyword => (
                      <div key={keyword.id} className='keyword_item'>
                        <Link to={`/keyword/${keyword.id}/movie`}>
                          {keyword.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className='pagination_wrapper'>
                {currentPage > 1 && (
                  <div
                    className='pagination_item adjust'
                    onClick={() => {
                      setCurrentPage(currentPage - 1)
                      window.scrollTo(0, 0)
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Previous</span>
                  </div>
                )}
                {totalPage > 1 && (
                  <Pagination
                    page={currentPage}
                    count={totalPage}
                    shape='rounded'
                    onChange={handlePage}
                    size='large'
                    siblingCount={3}
                    boundaryCount={2}
                    hideNextButton
                    hidePrevButton
                  />
                )}

                {currentPage < totalPage && (
                  <div
                    className='pagination_item adjust'
                    onClick={() => {
                      setCurrentPage(currentPage + 1)
                      window.scrollTo(0, 0)
                    }}
                  >
                    <span>Next</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default Search
