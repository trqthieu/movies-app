import {
  faCaretDown,
  faCaretRight,
  faIdBadge,
  faLink,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import request from 'src/api/request'
import images from 'src/assets/images/images'
import formatCounter from 'src/common/formatCouter'
import formatDate from 'src/common/formatDate'
import getImagePath from 'src/common/getImagePath'
import './Network.scss'
function Network() {
  const { networkId } = useParams()
  const [networkDetails, setNetworkDetails] = useState()
  const [movieList, setMovieList] = useState([])
  const [total, setTotal] = useState(0)
  const [filterParams, setFilterParams] = useState({
    page: 1,
    sort_by: 'popularity.desc',
    with_networks: networkId,
  })
  console.log(filterParams)
  console.log(movieList)

  const handleLoadMore = () => {
    const newParams = { ...filterParams }
    newParams.page += 1
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
    const getNetworkDetails = async () => {
      const network = await request.getNetworkDetails(networkId)
      setNetworkDetails(network)
    }
    getNetworkDetails()
  }, [networkId])
  useEffect(() => {
    const getMovies = async () => {
      const resultMovie = await request.getDiscover('tv', filterParams)
      setTotal(resultMovie.total_results)
      const newMovieList = [...movieList, ...resultMovie.results]
      setMovieList(newMovieList)
    }

    getMovies()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams])
  return (
    <div className='network_wrapper'>
      <div className='network_banner_wrapper'>
        <Container>
          {networkDetails && (
            <div className='network_banner'>
              <div className='network_logo'>
                <div className='network_img'>
                  <img src={getImagePath(networkDetails.logo_path)} alt='' />
                </div>
                <div>
                  <h2>{formatCounter(total, 'show')}</h2>
                </div>
              </div>
              <div className='network_info'>
                <div className='network_info_item'>
                  <FontAwesomeIcon icon={faIdBadge} />
                  <span>{networkDetails.name}</span>
                </div>
                <div className='network_info_item'>
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{networkDetails.headquarters}</span>
                </div>
                <div className='network_info_item'>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href={networkDetails.homepage}
                  >
                    <FontAwesomeIcon icon={faLink} />
                    <span>Homepage</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
      <div className='network_filter_wrapper'>
        <Container>
          <div className='network_filter'>
            <div className='network_filter_item'>
              <span>Overview</span>
              <FontAwesomeIcon icon={faCaretDown} />
              <div className='header_subnav'>
                <div className='header_subnav_item'>
                  <span>Main</span>
                </div>
                <div className='header_subnav_item'>
                  <span>Changes</span>
                </div>
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
                  <span>First Air Date</span>
                  <FontAwesomeIcon icon={faCaretRight} />
                  <div className='header_subnav right'>
                    <div
                      onClick={() => handleSort('first_air_date.asc')}
                      className='header_subnav_item'
                    >
                      <span>Ascending</span>
                    </div>
                    <div
                      onClick={() => handleSort('first_air_date.desc')}
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
                  <Link to={`/tv/${movie.id}`}>
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
                      <Link to={`/tv/${movie.id}`}>
                        <h3>{movie.name}</h3>
                      </Link>
                      <span>{formatDate(movie.first_air_date)}</span>
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

export default Network
