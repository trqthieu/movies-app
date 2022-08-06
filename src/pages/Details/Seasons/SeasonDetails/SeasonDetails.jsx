import {
  faArrowLeft,
  faArrowRight,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import request from 'src/api/request'
import formatDate, { getYear } from 'src/common/formatDate'
import formatTime from 'src/common/formatTime'
import getImagePath from 'src/common/getImagePath'
import './SeasonDetails.scss'
function SeasonDetails() {
  const params = useParams()
  const { id: TVId, seasonNumber } = params
  const [seasonList, setSeasonList] = useState()
  const [seasonIndex, setSeasonIndex] = useState(0)
  const [seasonDetails, setSeasonDetails] = useState()

  console.log(seasonDetails)
  const logicPagination = (seasonList, currentSeason) => {
    return seasonList.findIndex(
      element => element.season_number === currentSeason - 0
    )
  }
  useEffect(() => {
    const getDetails = async () => {
      const details = await request.getDetails('tv', TVId)
      setSeasonList(details.seasons)
      const currentIndex = logicPagination(details.seasons, seasonNumber)
      setSeasonIndex(currentIndex)

      const TVSeasons = await request.getTVSeasonsDetails(TVId, seasonNumber)
      setSeasonDetails(TVSeasons)
    }
    getDetails()
  }, [TVId, seasonNumber])

  return (
    <div>
      {seasonDetails && (
        <div className='season_header_wrapper'>
          <Container>
            <div className='movie_header'>
              <div className='movie_img'>
                <img src={getImagePath(seasonDetails.poster_path)} alt='' />
              </div>
              <div className='movie_right'>
                <h1>
                  {seasonDetails.name}{' '}
                  <span>({getYear(seasonDetails.air_date)})</span>
                </h1>
                <Link className='link_back' to={`/tv/${TVId}/seasons`}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>Back to season list</span>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
      <div className='season_pagination_wrapper'>
        <Container>
          <div className='season_pagination'>
            <div>
              {seasonIndex !== 0 && (
                <div className='previous'>
                  <Link
                    to={`/tv/${TVId}/seasons/${
                      seasonList[seasonIndex - 1].season_number
                    }`}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>{seasonList[seasonIndex - 1].name}</span>
                  </Link>
                </div>
              )}
            </div>
            {seasonList && seasonIndex !== seasonList.length - 1 && (
              <div className='next'>
                <Link
                  to={`/tv/${TVId}/seasons/${
                    seasonList[seasonIndex + 1].season_number
                  }`}
                >
                  <span>{seasonList[seasonIndex + 1].name}</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            )}
          </div>
        </Container>
      </div>
      <div className='season_content_wrapper'>
        <Container>
          <div className='season_content'>
            <div className='season_filter_wrapper'>
              <h3>
                Episodes{' '}
                <span>{seasonDetails && seasonDetails.episodes.length}</span>
              </h3>
              <div className='season_filter'>
                <span>Sort</span>
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </div>
            <div className='episode_list'>
              {seasonDetails &&
                seasonDetails.episodes.map((episode, index) => (
                  <div key={episode.id} className='episode_item_wrapper'>
                    <div className='episode_item'>
                      <div className='episode_item_img'>
                        <img src={getImagePath(episode.still_path)} alt='' />
                      </div>
                      <div className='episode_item_info'>
                        <div className='title'>
                          <h3>
                            <span>{index + 1}</span> {episode.name}
                          </h3>
                          <p>
                            {formatDate(episode.air_date)}{' '}
                            <span>{formatTime(episode.runtime)}</span>
                          </p>
                        </div>
                        <p>{episode.overview}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default SeasonDetails
