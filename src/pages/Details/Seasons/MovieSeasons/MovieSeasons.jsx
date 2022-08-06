import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import request from 'src/api/request'
import images from 'src/assets/images/images'
import formatDate, { getYear } from 'src/common/formatDate'
import getImagePath from 'src/common/getImagePath'
import './MovieSeasons.scss'
function MovieSeasons() {
  const { id } = useParams()
  const [seasonList, setSeasonList] = useState([])
  const [details, setDetails] = useState()
  useEffect(() => {
    const getDetails = async () => {
      const data = await request.getDetails('tv', id)
      setDetails(data)
      setSeasonList(data.seasons)
    }
    getDetails()
  }, [id])
  return (
    <div className='seasons'>
      {details && (
        <>
          <div className='season_header_wrapper'>
            <Container>
              <div className='movie_header'>
                <div className='movie_img'>
                  <img src={getImagePath(details.poster_path)} alt='' />
                </div>
                <div className='movie_right'>
                  <h1>
                    {details.name || details.original_title}{' '}
                    <span>
                      ({getYear(details.first_air_date || details.release_date)}
                      )
                    </span>
                  </h1>
                  <Link className='link_back' to={`/tv/${id}`}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Back to main</span>
                  </Link>
                </div>
              </div>
            </Container>
          </div>
          <div className='season_content'>
            <div className='season_list'>
              {seasonList.map(season => (
                <div key={season.id} className='season_item_wrapper'>
                  <Container>
                    <div className='season_item'>
                      <div className='season_item_img'>
                        <img
                          src={
                            season.poster_path
                              ? getImagePath(season.poster_path)
                              : images.loadingImage
                          }
                          alt=''
                        />
                      </div>
                      <div className='season_item_info'>
                        <h2>
                          <Link to={`${season.season_number}`}>
                            {season.name}
                          </Link>{' '}
                          <span>
                            {getYear(season.air_date)} | {season.episode_count}{' '}
                            Episodes
                          </span>
                        </h2>
                        <p className='season_item_date'>
                          {season.name} of {details.name} premiered on{' '}
                          {formatDate(season.air_date)}.
                        </p>
                        <p className='season_item_overview'>
                          {season.overview}
                        </p>
                      </div>
                    </div>
                  </Container>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MovieSeasons
