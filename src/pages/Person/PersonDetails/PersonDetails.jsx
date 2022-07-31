import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import Tippy from '@tippyjs/react/headless'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useParams } from 'react-router-dom'
import request, { IMAGE_PATH } from 'src/api/request'
import icons from 'src/assets/icons/icons.js'
import calculateAge from 'src/common/calculateAge'
import formatCounter from 'src/common/formatCouter'
import { getYear } from 'src/common/formatDate'
import formatText from 'src/common/formatText'
import MovieCard from 'src/components/Card/MovieCard/MovieCard'
import NavItem from 'src/components/NavItem/NavItem'
import { personNavList } from 'src/data/data'
import './PersonDetails.scss'
function PersonDetails() {
  const { id } = useParams()
  const [details, setDetails] = useState()
  console.log(details)
  const [acting, setActing] = useState([])
  const [production, setProduction] = useState([])
  const [writing, setWriting] = useState([])
  const [bio, setBio] = useState()
  const [readMoreVisible, setReadMoreVisible] = useState(false)
  const bioRef = useRef()
  const handleReadMore = () => {
    setReadMoreVisible(false)
    setBio(details.biography)
  }
  const divideByYear = movies => {
    const listYears = movies.map(
      movie => movie.release_date || movie.first_air_date
    )
    const movieYears = listYears.map(yearInString => {
      return getYear(yearInString)
    })
    const years = []
    movieYears.forEach(year => {
      if (year && !years.includes(year)) {
        years.push(year)
      }
    })
    years.sort((a, b) => b - a)
    if (movieYears.includes(undefined)) {
      years.unshift(undefined)
    }
    const result = []
    for (let i = 0; i < years.length; i++) {
      const arr = []
      for (let j = 0; j < movies.length; j++) {
        if (
          getYear(movies[j].release_date || movies[j].first_air_date) ===
          years[i]
        ) {
          arr.push(movies[j])
        }
      }
      result.push(arr)
    }
    return result
  }

  useEffect(() => {
    const getDetails = async () => {
      const detailsResult = await request.getPersonDetails(id)
      setDetails(detailsResult)
      setBio(formatText(detailsResult.biography, 1000))
      if (detailsResult.biography.length > 1000) {
        setReadMoreVisible(true)
      }

      const credits = await request.getPersonCredits(id)
      console.log(credits)
      const movies = credits.cast
      movies.sort((a, b) => {
        return b.popularity - a.popularity
      })
      setActing(movies)
      setProduction(
        credits.crew.filter(item => item.department === 'Production')
      )
      setWriting(credits.crew.filter(item => item.department === 'Writing'))
    }

    getDetails()
  }, [id])
  return (
    <div className='person_details'>
      <div className='details_header'>
        {personNavList.map((navItem, index) => {
          return <NavItem key={index} navItem={navItem} />
        })}
      </div>
      <div className='persons_content'>
        <Container>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
              {details && (
                <div className='content_left'>
                  <div className='person_img'>
                    <LazyLoadImage
                      src={`${IMAGE_PATH}${details.profile_path}`}
                      alt=''
                    />
                  </div>
                  <div className='person_info'>
                    <div className='person_social'>
                      <Link to={'/'}>
                        <img src={icons.facebookIcon} alt='' />
                      </Link>
                      <Link to={'/'}>
                        <img src={icons.twitterIcon} alt='' />
                      </Link>
                      <Link to={'/'}>
                        <img src={icons.instagramIcon} alt='' />
                      </Link>
                    </div>
                    <h3>Personal Info</h3>
                    <div className='panel'>
                      <strong>Known For</strong>
                      <p>{details.known_for_department}</p>
                    </div>
                    <div className='panel'>
                      <strong>Known Credits</strong>
                      <p>{acting.length > 0 && acting.length}</p>
                    </div>
                    <div className='panel'>
                      <strong>Gender</strong>
                      <p>{details.gender === 1 ? 'Female' : 'Male'}</p>
                    </div>
                    <div className='panel'>
                      <strong>Birthday</strong>
                      <p>
                        {details.birthday +
                          (details.deathday
                            ? ''
                            : ` (${calculateAge(
                                details.birthday
                              )} years old) `)}
                      </p>
                    </div>
                    {details.deathday && (
                      <div className='panel'>
                        <strong>Day of Death</strong>
                        <p>
                          {details.deathday +
                            ` (${calculateAge(
                              details.birthday,
                              details.deathday
                            )} years old) `}
                        </p>
                      </div>
                    )}

                    <div className='panel'>
                      <strong>Place of Birth</strong>
                      <p>{details.place_of_birth}</p>
                    </div>
                    <div className='panel'>
                      <strong>Also Known As</strong>
                      {details.also_known_as.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Grid>
            <Grid item md={8} xs={12}>
              <div className='content_right'>
                <h1 className='person_name'>{details && details.name}</h1>
                <div className='person_panel'>
                  <strong>Biography</strong>
                  <p ref={bioRef} className='biography'>
                    {bio}
                  </p>
                  {readMoreVisible && (
                    <p className='read_more'>
                      <span onClick={() => handleReadMore()}>Read more</span>
                    </p>
                  )}
                </div>

                <div className='person_panel'>
                  <strong>Known For</strong>
                  <div className='card_list'>
                    {acting.splice(0, 8).map(movie => (
                      <div key={movie.id} className='card_item mr-10'>
                        <Link to={`/${movie.media_type}/${movie.id}`}>
                          <img
                            src={`${IMAGE_PATH}${movie.poster_path}`}
                            alt=''
                          />
                          <p>{movie.original_title || movie.original_name}</p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='person_panel'>
                  <div className='panel_header'>
                    <strong>Acting</strong>
                    <div className='filter'>
                      <div className='filter_item'>
                        <p>All</p>
                        <div className='filter_child'>
                          <p>Movies</p>
                          <p>TV Shows</p>
                        </div>
                      </div>
                      <div className='filter_item'>
                        <p>Department</p>
                        <div className='filter_child'>
                          {acting.length > 0 && (
                            <p>{`Acting  (${acting.length})`}</p>
                          )}
                          {production.length > 0 && (
                            <p>{`Production  (${production.length})`}</p>
                          )}
                          {writing.length > 0 && (
                            <p>{`Writing  (${writing.length})`}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='panel_body'>
                    {acting.length > 0 &&
                      divideByYear(acting).map((arr, index) => (
                        <div key={index} className='panel_group'>
                          {arr.map((cast, index) => (
                            <div key={index} className='panel_item'>
                              <span className='movie_year'>
                                {cast.release_date ? (
                                  getYear(cast.release_date)
                                ) : cast.first_air_date ? (
                                  getYear(cast.first_air_date)
                                ) : (
                                  <FontAwesomeIcon icon={faMinus} />
                                )}
                              </span>
                              <Tippy
                                trigger='click'
                                hideOnClick
                                interactive
                                render={attrs => (
                                  <div className='box' tabIndex='-1' {...attrs}>
                                    <MovieCard movie={cast} />
                                  </div>
                                )}
                              >
                                <div className='movie_more'></div>
                              </Tippy>

                              <span className='movie_name'>
                                <Link to={`/${cast.media_type}/${cast.id}`}>
                                  <strong>
                                    {cast.original_title || cast.original_name}
                                  </strong>
                                </Link>
                                {cast.character && (
                                  <>
                                    <span>&nbsp;</span>
                                    <span
                                      style={{
                                        color: 'rgba(0,0,0,0.5)',
                                      }}
                                    >
                                      {cast.media_type === 'tv' &&
                                        ` (${formatCounter(
                                          cast.episode_count,
                                          'episode'
                                        )}) `}
                                      as
                                    </span>
                                    <span>&nbsp;</span>
                                    <span>{cast.character}</span>
                                  </>
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                </div>
                {production.length > 0 && (
                  <div className='person_panel'>
                    <div className='panel_header'>
                      <strong>Production</strong>
                    </div>
                    <div className='panel_body'>
                      {divideByYear(production).map((arr, index) => (
                        <div key={index} className='panel_group'>
                          {arr.map((crew, index) => (
                            <div key={index} className='panel_item'>
                              <span className='movie_year'>
                                {crew.release_date ? (
                                  getYear(crew.release_date)
                                ) : crew.first_air_date ? (
                                  getYear(crew.first_air_date)
                                ) : (
                                  <FontAwesomeIcon icon={faMinus} />
                                )}
                              </span>
                              <Tippy
                                trigger='click'
                                hideOnClick
                                interactive
                                render={attrs => (
                                  <div className='box' tabIndex='-1' {...attrs}>
                                    <MovieCard movie={crew} />
                                  </div>
                                )}
                              >
                                <div className='movie_more'></div>
                              </Tippy>

                              <span className='movie_name'>
                                <Link to={`/${crew.media_type}/${crew.id}`}>
                                  <strong>
                                    {crew.original_title || crew.original_name}
                                  </strong>
                                </Link>
                                <span>&nbsp;</span>
                                <span
                                  style={{
                                    color: 'rgba(0,0,0,0.5)',
                                  }}
                                >
                                  ... {` ${crew.job} `}
                                </span>
                                <span>&nbsp;</span>
                                <span>{crew.character}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {writing.length > 0 && (
                  <div className='person_panel'>
                    <div className='panel_header'>
                      <strong>Writing</strong>
                    </div>
                    <div className='panel_body'>
                      {divideByYear(writing).map((arr, index) => (
                        <div key={index} className='panel_group'>
                          {arr.map((crew, index) => (
                            <div key={index} className='panel_item'>
                              <span className='movie_year'>
                                {crew.release_date ? (
                                  getYear(crew.release_date)
                                ) : crew.first_air_date ? (
                                  getYear(crew.first_air_date)
                                ) : (
                                  <FontAwesomeIcon icon={faMinus} />
                                )}
                              </span>
                              <Tippy
                                trigger='click'
                                hideOnClick
                                interactive
                                render={attrs => (
                                  <div className='box' tabIndex='-1' {...attrs}>
                                    <MovieCard movie={crew} />
                                  </div>
                                )}
                              >
                                <div className='movie_more'></div>
                              </Tippy>

                              <span className='movie_name'>
                                <Link to={`/${crew.media_type}/${crew.id}`}>
                                  <strong>
                                    {crew.original_title || crew.original_name}
                                  </strong>
                                </Link>
                                <span>&nbsp;</span>
                                <span
                                  style={{
                                    color: 'rgba(0,0,0,0.5)',
                                  }}
                                >
                                  ... {` ${crew.job} `}
                                </span>
                                <span>&nbsp;</span>
                                <span>{crew.character}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

export default PersonDetails
