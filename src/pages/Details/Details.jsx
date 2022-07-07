import {
  faBookmark,
  faHeart,
  faList,
  faPlay,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress, Container, Grid } from '@mui/material'
import Tippy from '@tippyjs/react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NavItem from 'src/components/NavItem/NavItem'
import { detailsNavList } from 'src/data/data'
import './Details.scss'
import request from 'src/api/request'
import { IMAGE_PATH } from 'src/api/request'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'
function Details() {
  const [data, setData] = useState()

  const url = window.location.pathname
  const { id } = useParams()
  const type = url.split('/')[1]
  const formatTime = time => {
    const hours = Math.floor(time / 60)
    const minutes = time % 60
    const hoursStr = hours > 0 ? `${hours}h` : ''
    const minutesStr = minutes > 0 ? `${minutes}m` : ''

    return `${hoursStr} ${minutesStr}`
  }
  useEffect(() => {
    const getDetails = async () => {
      const data = await request.getDetails(type, id)
      console.log(data)
      setData(data)
    }
    getDetails()
  }, [id, type])
  return (
    <>
      {data && (
        <div className='details'>
          <div className='details_header'>
            {detailsNavList.map((navItem, index) => {
              return <NavItem key={index} navItem={navItem} />
            })}
          </div>
          <div
            className='details_banner_wrapper'
            style={{
              backgroundImage: `url(${IMAGE_PATH}${data.backdrop_path})`,
            }}
          >
            <div className='details_banner_overlay'>
              <Container>
                <div className='details_banner'>
                  <div className='details_banner_img'>
                    <LazyLoadImage
                      effect='opacity'
                      src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                      alt=''
                    />
                  </div>
                  <div className='details_banner_desc'>
                    <div className='desc_title'>
                      <h1 className='name'>{data.name}</h1>
                      <h3 className='year'>
                        {data.first_air_date &&
                          data.first_air_date.split('-')[0]}
                      </h3>
                    </div>
                    <div className='desc_genres'>
                      <div className='certification'>TV-MA</div>
                      <div className='types'>
                        {data.genres
                          .map(item => {
                            return item.name
                          })
                          .join(', ')}
                      </div>
                      <div className='time'>
                        {formatTime(data.episode_run_time)}
                      </div>
                    </div>
                    <div className='desc_actions'>
                      <div className='score'>
                        <div className='card_rate_wrapper'>
                          <div className='card_rate'>
                            <div className='card_rate_text'>
                              {(data.vote_average * 10).toFixed()}%
                            </div>
                            <CircularProgress
                              className='progress_bar'
                              variant='determinate'
                              value={80}
                              style={{
                                width: '90%',
                                height: '90%',
                                color:
                                  data.vote_average * 10 < 40
                                    ? '#d9235f'
                                    : data.vote_average * 10 < 70
                                    ? '#d2d531'
                                    : '',
                              }}
                            />
                          </div>
                        </div>
                        <p className='text'>
                          User
                          <br /> Score
                        </p>
                      </div>
                      <div className='interact'>
                        <Tippy
                          content='Add to list'
                          arrow
                          placement='bottom'
                          theme='darkBlue'
                        >
                          <div className='interact_item'>
                            <FontAwesomeIcon
                              className='card_popup_item_icon'
                              icon={faList}
                            />
                          </div>
                        </Tippy>
                        <Tippy
                          content='Mark as favorite'
                          arrow
                          placement='bottom'
                          theme='darkBlue'
                        >
                          <div className='interact_item'>
                            <FontAwesomeIcon
                              className='card_popup_item_icon'
                              icon={faHeart}
                            />
                          </div>
                        </Tippy>
                        <Tippy
                          content='Add to your watchlist'
                          arrow
                          placement='bottom'
                          theme='darkBlue'
                        >
                          <div className='interact_item'>
                            <FontAwesomeIcon
                              className='card_popup_item_icon'
                              icon={faBookmark}
                            />
                          </div>
                        </Tippy>
                        <Tippy
                          content='Rate It!'
                          arrow
                          placement='bottom'
                          theme='darkBlue'
                        >
                          <div className='interact_item'>
                            <FontAwesomeIcon
                              className='card_popup_item_icon'
                              icon={faStar}
                            />
                          </div>
                        </Tippy>

                        <div className='interact_item'>
                          <FontAwesomeIcon
                            className='card_popup_item_icon'
                            icon={faPlay}
                          />
                          <span className='text'>Play Trailer</span>
                        </div>
                      </div>
                    </div>
                    <p className='tagline'>{data.tagline}</p>
                    <div className='overview'>
                      <h1>Overview</h1>
                      <p>{data.overview}</p>
                    </div>
                    <div className='character'>
                      <h3>{data.created_by && data.created_by[0].name}</h3>
                      <span>Creator</span>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </div>
          <div className='content_wrapper'>
            <Container>
              <Grid container spacing={2}>
                <Grid item md={9}>
                  <div className='content_left'>
                    <div className='cast content_item'>
                      <h1 className='title'>Series Cast</h1>
                      <ul className='cast_list'>
                        <li className='cast_item'>
                          <div className='cast_img'>
                            <LazyLoadImage
                              effect='opacity'
                              src='https://www.themoviedb.org/t/p/w138_and_h175_face/noh94S1b6t8JIEBC1KMdoh3DPB3.jpg'
                              alt=''
                            />
                          </div>
                          <h3 className='cast_name'>Karl Urban</h3>
                          <p className='cast_character'>Billy Butcher</p>
                          <span className='cast_count_episodes'>
                            24 Episodes
                          </span>
                        </li>
                        <li className='cast_item'>
                          <div className='cast_img'>
                            <LazyLoadImage
                              effect='opacity'
                              src='https://www.themoviedb.org/t/p/w138_and_h175_face/noh94S1b6t8JIEBC1KMdoh3DPB3.jpg'
                              alt=''
                            />
                          </div>
                          <h3 className='cast_name'>Karl Urban</h3>
                          <p className='cast_character'>Billy Butcher</p>
                          <span className='cast_count_episodes'>
                            24 Episodes
                          </span>
                        </li>
                        <li className='cast_item'>
                          <div className='cast_img'>
                            <LazyLoadImage
                              effect='opacity'
                              src='https://www.themoviedb.org/t/p/w138_and_h175_face/noh94S1b6t8JIEBC1KMdoh3DPB3.jpg'
                              alt=''
                            />
                          </div>
                          <h3 className='cast_name'>Karl Urban</h3>
                          <p className='cast_character'>Billy Butcher</p>
                          <span className='cast_count_episodes'>
                            24 Episodes
                          </span>
                        </li>
                        <li className='cast_item'>
                          <div className='cast_img'>
                            <LazyLoadImage
                              effect='opacity'
                              src='https://www.themoviedb.org/t/p/w138_and_h175_face/noh94S1b6t8JIEBC1KMdoh3DPB3.jpg'
                              alt=''
                            />
                          </div>
                          <h3 className='cast_name'>Karl Urban</h3>
                          <p className='cast_character'>Billy Butcher</p>
                          <span className='cast_count_episodes'>
                            24 Episodes
                          </span>
                        </li>
                        <li className='cast_item'>
                          <div className='cast_img'>
                            <LazyLoadImage
                              effect='opacity'
                              src='https://www.themoviedb.org/t/p/w138_and_h175_face/noh94S1b6t8JIEBC1KMdoh3DPB3.jpg'
                              alt=''
                            />
                          </div>
                          <h3 className='cast_name'>Karl Urban</h3>
                          <p className='cast_character'>Billy Butcher</p>
                          <span className='cast_count_episodes'>
                            24 Episodes
                          </span>
                        </li>
                        <li className='cast_item'>
                          <div className='cast_img'>
                            <LazyLoadImage
                              effect='opacity'
                              src='https://www.themoviedb.org/t/p/w138_and_h175_face/noh94S1b6t8JIEBC1KMdoh3DPB3.jpg'
                              alt=''
                            />
                          </div>
                          <h3 className='cast_name'>Karl Urban</h3>
                          <p className='cast_character'>Billy Butcher</p>
                          <span className='cast_count_episodes'>
                            24 Episodes
                          </span>
                        </li>
                        <li className='cast_item'>
                          <div className='cast_img'>
                            <LazyLoadImage
                              effect='opacity'
                              src='https://www.themoviedb.org/t/p/w138_and_h175_face/noh94S1b6t8JIEBC1KMdoh3DPB3.jpg'
                              alt=''
                            />
                          </div>
                          <h3 className='cast_name'>Karl Urban</h3>
                          <p className='cast_character'>Billy Butcher</p>
                          <span className='cast_count_episodes'>
                            24 Episodes
                          </span>
                        </li>
                        <li className='cast_item'>
                          <div className='cast_img'>
                            <LazyLoadImage
                              effect='opacity'
                              src='https://www.themoviedb.org/t/p/w138_and_h175_face/noh94S1b6t8JIEBC1KMdoh3DPB3.jpg'
                              alt=''
                            />
                          </div>
                          <h3 className='cast_name'>Karl Urban</h3>
                          <p className='cast_character'>Billy Butcher</p>
                          <span className='cast_count_episodes'>
                            24 Episodes
                          </span>
                        </li>
                        <li className='cast_item'>
                          <div className='cast_img'>
                            <LazyLoadImage
                              effect='opacity'
                              src='https://www.themoviedb.org/t/p/w138_and_h175_face/noh94S1b6t8JIEBC1KMdoh3DPB3.jpg'
                              alt=''
                            />
                          </div>
                          <h3 className='cast_name'>Karl Urban</h3>
                          <p className='cast_character'>Billy Butcher</p>
                          <span className='cast_count_episodes'>
                            24 Episodes
                          </span>
                        </li>
                      </ul>
                      <Link className='all' to={'/'}>
                        Full Cast {'&'} Crew
                      </Link>
                    </div>
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className='content_right'>hhhh1l</div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      )}
    </>
  )
}

export default Details
