import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useLocation, useParams } from 'react-router-dom'
import request from 'src/api/request'
import { getYear } from 'src/common/formatDate'
import getImagePath from 'src/common/getImagePath'
import PersonCast from 'src/components/Card/PersonCast/PersonCast'
import './MovieCasts.scss'

function MovieCasts() {
  const { id } = useParams()
  const location = useLocation()
  const type = location.pathname.split('/')[1]
  const [details, setDetails] = useState()
  const [credits, setCredits] = useState()
  const [crewType, setCrewType] = useState([])
  useEffect(() => {
    const getCredits = async () => {
      const data = await request.getDetails(type, id)
      setDetails(data)

      const creditsResult = await request.getCredits(type, id)
      setCredits(creditsResult)
      const departments = creditsResult.crew.map(crew => crew.department)
      const departmentsResult = []
      departments.forEach(department => {
        if (!departmentsResult.includes(department)) {
          departmentsResult.push(department)
        }
      })
      setCrewType(departmentsResult)
    }
    getCredits()
  }, [type, id])
  return (
    <div className='credits'>
      {details && (
        <div className='season_header_wrapper'>
          <Container>
            <div className='movie_header'>
              <div className='movie_img'>
                <LazyLoadImage
                  effect='opacity'
                  src={getImagePath(details.poster_path)}
                  alt=''
                />
              </div>
              <div className='movie_right'>
                <h1>
                  {details.name || details.title}{' '}
                  <span>
                    ({getYear(details.first_air_date || details.release_date)})
                  </span>
                </h1>
                <Link className='link_back' to={`/${type}/${id}`}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>Back to main</span>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
      <div className='credit_content_wrapper'>
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <h3 className='cast_title'>
                Series Cast <span>{credits && credits.cast.length}</span>
              </h3>
              <div className='cast_group'>
                {credits &&
                  credits.cast.map(cast => (
                    <PersonCast key={cast.id} cast={cast} />
                  ))}
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <h3 className='cast_title'>
                Series Crew <span>{credits && credits.crew.length}</span>
              </h3>
              {crewType.map((type, index) => (
                <div key={index} className='cast_group'>
                  <strong className='cast_group_title'>{type}</strong>
                  {credits &&
                    credits.crew
                      .filter(crew => crew.department === type)
                      .map((crew, index) => (
                        <PersonCast cast={crew} key={index} />
                      ))}
                </div>
              ))}
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

export default MovieCasts
