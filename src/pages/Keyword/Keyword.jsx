import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import request from 'src/api/request'
import images from 'src/assets/images/images'
import formatCounter from 'src/common/formatCouter'
import formatDate from 'src/common/formatDate'
import getImagePath from 'src/common/getImagePath'
import './Keyword.scss'
function Keyword() {
  const { keywordId, type } = useParams()
  const [keyword, setKeyword] = useState()
  const [filterParams, setFilterParams] = useState({
    page: 1,
    sort_by: 'popularity.desc',
    with_keywords: keywordId,
  })
  const [total, setTotal] = useState(0)
  const [movieList, setMovieList] = useState([])
  console.log(type)
  console.log(filterParams)
  console.log(movieList)

  const handleLoadMore = () => {
    const newParams = { ...filterParams }
    newParams.page++
    setFilterParams(newParams)
  }

  const handleSort = value => {
    const newParams = { ...filterParams }
    newParams.page = 1
    newParams.sort_by = value
    setFilterParams(newParams)
    setMovieList([])
  }

  useEffect(() => {
    const getKeyword = async () => {
      const keywordResult = await request.getKeywordDetails(keywordId)
      setKeyword(keywordResult)
    }
    getKeyword()
  }, [keywordId])

  useEffect(() => {
    const getDiscover = async () => {
      const movieResult = await request.getDiscover(type, filterParams)
      setTotal(movieResult.total_results)
      const newMovieList = [...movieList, ...movieResult.results]
      setMovieList(newMovieList)
    }
    getDiscover()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, filterParams])

  useEffect(() => {
    const newParams = { ...filterParams }
    newParams.page = 1
    newParams.sort_by = 'popularity.desc'
    setFilterParams(newParams)
    setMovieList([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  return (
    <div className='keyword_wrapper'>
      <div className='keyword_banner_wrapper'>
        <Container>
          <div className='keyword_banner'>
            <h3>{keyword && keyword.name}</h3>
            <span>
              {formatCounter(total, type === 'tv' ? 'show' : 'movie')}
            </span>
          </div>
        </Container>
      </div>
      <div className='network_filter_wrapper'>
        <Container>
          <div className='network_filter'>
            <div className='network_filter_item'>
              <span>{type === 'tv' ? 'TV Shows' : 'Movies'}</span>
              <FontAwesomeIcon icon={faCaretDown} />
              <div className='header_subnav'>
                <Link to={`/keyword/${keywordId}-movie`}>
                  <div className='header_subnav_item'>
                    <span>Movies</span>
                  </div>
                </Link>
                <Link to={`/keyword/${keywordId}-tv`}>
                  <div className='header_subnav_item'>
                    <span>TV Shows</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className='network_filter_item'>
              <span>Sort</span>
              <FontAwesomeIcon icon={faCaretDown} />
              <div className='header_subnav'>
                <div className='header_subnav_item'>
                  <span>Popularity</span>
                  <FontAwesomeIcon icon={faCaretRight} />
                  <div className='header_subnav right'>
                    <div
                      onClick={() => handleSort('popularity.asc')}
                      className='header_subnav_item'
                    >
                      <span>Ascending</span>
                    </div>
                    <div
                      onClick={() => handleSort('popularity.desc')}
                      className='header_subnav_item'
                    >
                      <span>Descending</span>
                    </div>
                  </div>
                </div>
                <div className='header_subnav_item'>
                  <span>Rating</span>
                  <FontAwesomeIcon icon={faCaretRight} />
                  <div className='header_subnav right'>
                    <div
                      onClick={() => handleSort('vote_average.asc')}
                      className='header_subnav_item'
                    >
                      <span>Ascending</span>
                    </div>
                    <div
                      onClick={() => handleSort('vote_average.desc')}
                      className='header_subnav_item'
                    >
                      <span>Descending</span>
                    </div>
                  </div>
                </div>

                <div className='header_subnav_item'>
                  <span>
                    {type === 'tv' ? 'First Air Date' : 'Release Date'}
                  </span>
                  <FontAwesomeIcon icon={faCaretRight} />
                  <div className='header_subnav right'>
                    <div
                      onClick={() =>
                        handleSort(
                          type === 'tv'
                            ? 'first_air_date.asc'
                            : 'release_date.asc'
                        )
                      }
                      className='header_subnav_item'
                    >
                      <span>Ascending</span>
                    </div>
                    <div
                      onClick={() =>
                        handleSort(
                          type === 'tv'
                            ? 'first_air_date.desc'
                            : 'release_date.desc'
                        )
                      }
                      className='header_subnav_item'
                    >
                      <span>Descending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className='filter_content_wrapper'>
        <Container>
          <div className='filter_content'>
            <div className='filter_movie_list'>
              {movieList.map((movie, index) => (
                <div key={index} className='movie_item'>
                  <Link to={`/${type}/${movie.id}`}>
                    <div className='movie_item_img'>
                      <img
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
                      <Link to={`/${type}/${movie.id}`}>
                        <h3>{movie.name || movie.original_title}</h3>
                      </Link>
                      <span>
                        {formatDate(movie.first_air_date || movie.release_date)}
                      </span>
                    </div>
                    <p>{movie.overview}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleLoadMore()}
              className='button button_loadmore'
            >
              <span>Load more</span>
            </button>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Keyword
