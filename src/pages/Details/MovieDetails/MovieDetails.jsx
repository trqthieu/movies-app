import {
  faBookmark,
  faCalendarDay,
  faHeart,
  faLink,
  faList,
  faPlay,
  faPlusCircle,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress, Container, Grid } from '@mui/material'
import Tippy from '@tippyjs/react'
import { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import request, { IMAGE_PATH } from 'src/api/request'
import _images from 'src/assets/images/images'
import formatCurrency from 'src/common/formatCurrency'
import formatDate, { getYear } from 'src/common/formatDate'
import formatLinkImage from 'src/common/formatImageLink'
import formatText from 'src/common/formatText'
import formatTime from 'src/common/formatTime'
import getImagePath from 'src/common/getImagePath'
import PersonCast from 'src/components/Card/PersonCast/PersonCast'
import TrailerPopup from 'src/components/TrailerPopup/TrailerPopup'
import './MovieDetails.scss'
function MovieDetails() {
  const location = useLocation()
  const { id } = useParams()
  const type = location.pathname.split('/')[1]

  const [data, setData] = useState()
  const [trailerPath, setTrailerPath] = useState()
  const [showTrailer, setShowTrailer] = useState(false)
  const [credits, setCredits] = useState()
  const [seasons, setSeasons] = useState()
  const [currentSeason, setCurrentSeason] = useState(0)
  const [reviews, setReviews] = useState()
  const [review, setReview] = useState()
  const [socialTab, setSocialTab] = useState('reviews')
  const [mediaTab, setMediaTab] = useState('videos')
  const [videos, setVideos] = useState()
  const [images, setImages] = useState()
  const [recommendations, setRecommendations] = useState()
  const [keywords, setKeywords] = useState([])
  const [originalLanguage, setOriginalLanguage] = useState()

  const handleTrailer = path => {
    setShowTrailer(true)
    setTrailerPath(path)
  }
  useEffect(() => {
    const getLanguages = async original => {
      const languages = await request.getLanguages()
      const foundLanguage = languages.find(language => {
        return language.iso_639_1 === original
      })
      setOriginalLanguage(foundLanguage.english_name)
    }
    data && getLanguages(data.original_language)
  }, [data])

  useEffect(() => {
    const getDetails = async () => {
      const data = await request.getDetails(type, id)

      setData(data)
      document.title = `${data.name || data.title} (${getYear(
        data.first_air_date || data.release_date
      )})`

      if (data.seasons) {
        setSeasons(data.seasons)
        setCurrentSeason(data.seasons.length - 1)
      }
    }
    const getCredits = async () => {
      const credits = await request.getCredits(type, id)
      setCredits(credits)
    }
    const getVideos = async () => {
      const videos = await request.getVideos(type, id)
      setVideos(videos)
    }
    const getImages = async () => {
      const images = await request.getImages(type, id)
      setImages(images)
    }
    const getReviews = async () => {
      const data = await request.getReviews(type, id)
      setReviews(data)
      setReview(data.results[0])
    }
    getReviews()
    const getRecommendations = async () => {
      const recommendations = await request.getRecommendations(type, id)
      setRecommendations(recommendations.results)
    }
    const getKeywords = async () => {
      const keywords = await request.getKeywords(type, id)
      setKeywords(keywords)
    }

    getRecommendations()
    getDetails()
    getCredits()
    getVideos()
    getImages()
    getKeywords()
  }, [id, type])

  return (
    <>
      {data && (
        <div className='details'>
          {showTrailer && (
            <TrailerPopup
              videoPath={trailerPath}
              setShowVideo={setShowTrailer}
              id={data.id}
            />
          )}

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
                      <h1 className='name'>{data.name || data.title}</h1>
                      <h3 className='year'>
                        {(data.first_air_date &&
                          `(${data.first_air_date.split('-')[0]})`) ||
                          (data.release_date &&
                            `(${data.release_date.split('-')[0]})`)}
                      </h3>
                    </div>
                    <div className='desc_genres'>
                      {/* <div className='certification'>TV-MA</div> */}
                      <div className='types'>
                        {data.genres
                          .map(item => {
                            return item.name
                          })
                          .join(', ')}
                      </div>
                      <div className='time'>
                        {formatTime(data.episode_run_time || data.runtime)}
                      </div>
                    </div>
                    <div className='desc_actions'>
                      <div className='score'>
                        <div className='card_rate_wrapper'>
                          <div className='card_rate'>
                            <div className='card_rate_text'>
                              {(data.vote_average * 10).toFixed() > 0
                                ? `${(data.vote_average * 10).toFixed()}%`
                                : 'NR'}
                            </div>
                            <CircularProgress
                              className='progress_bar'
                              variant='determinate'
                              value={data.vote_average * 10}
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

                        {videos && videos.results.length > 0 && (
                          <div className='interact_item play_trailer'>
                            <FontAwesomeIcon
                              className='card_popup_item_icon'
                              icon={faPlay}
                            />
                            <span
                              onClick={() =>
                                handleTrailer(videos.results[0].key)
                              }
                              className='text'
                            >
                              Play Trailer
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className='tagline'>{data.tagline}</p>
                    <div className='overview'>
                      <h1>Overview</h1>
                      <p>
                        {data.overview ||
                          "We don't have an overview translated in English. Help us expand our database by adding one."}
                      </p>
                    </div>
                    {data.created_by && data.created_by.length > 0 && (
                      <div className='character'>
                        {data.created_by.map(character => (
                          <div key={character.id} className='character_item'>
                            <h3>
                              <Link to={`/person/${character.id}`}>
                                {character.name}
                              </Link>
                            </h3>
                            <span>Creator</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Container>
            </div>
          </div>
          <div className='content_wrapper'>
            <Container>
              <Grid container spacing={2}>
                <Grid item md={9} xs={12}>
                  <div className='content_left'>
                    <div className='cast section'>
                      <h1 className='title'>Series Cast</h1>
                      <ul className='cast_list'>
                        {credits &&
                          credits.cast.slice(0, 10).map((item, index) => {
                            return (
                              <PersonCast intro key={item.id} cast={item} />
                            )
                          })}
                      </ul>
                      <Link className='all' to={'casts'}>
                        Full Cast {'&'} Crew
                      </Link>
                    </div>
                    {seasons && (
                      <div className='season section'>
                        <h1 className='title'>Current Season</h1>
                        <div className='season_item'>
                          <div className='season_img'>
                            <Link
                              to={`seasons/${seasons[currentSeason].season_number}`}
                            >
                              <LazyLoadImage
                                src={
                                  seasons[currentSeason].poster_path
                                    ? getImagePath(
                                        seasons[currentSeason].poster_path
                                      )
                                    : _images.loadingImage
                                }
                                effect='opacity'
                                alt=''
                              />
                            </Link>
                          </div>
                          <div className='season_right'>
                            <h2>
                              <Link
                                to={`seasons/${seasons[currentSeason].season_number}`}
                              >
                                {seasons[currentSeason].name}
                              </Link>
                            </h2>
                            {seasons[currentSeason].air_date && (
                              <h4>
                                {seasons[currentSeason].air_date.split('-')[0]}{' '}
                                | {seasons[currentSeason].episode_count}{' '}
                                Episodes
                              </h4>
                            )}

                            <p>
                              {seasons[currentSeason].overview ||
                                `${seasons[currentSeason].name} of ${
                                  data.name || data.title
                                } premiered on ${formatDate(
                                  seasons[currentSeason].air_date
                                )}.`}
                            </p>
                          </div>
                        </div>
                        <Link className='all' to={'seasons'}>
                          View All Seasons
                        </Link>
                      </div>
                    )}
                    <div className='social section'>
                      <div className='section_header'>
                        <h1 className='title'>Social</h1>
                        <div className='section_tabs'>
                          <span
                            className={socialTab === 'reviews' ? 'active' : ''}
                            onClick={() => setSocialTab('reviews')}
                          >
                            {reviews &&
                              `Reviews ${
                                reviews.total_pages * reviews.total_results
                              }`}
                          </span>
                          <span
                            className={
                              socialTab === 'discussions' ? 'active' : ''
                            }
                            onClick={() => setSocialTab('discussions')}
                          >
                            Discussions 0
                          </span>
                        </div>
                      </div>
                      <div className='section_content'>
                        {socialTab === 'reviews' ? (
                          review ? (
                            <div className='review_item'>
                              <div className='review_img'>
                                <Link to={'/'}>
                                  <LazyLoadImage
                                    effect='opacity'
                                    src={formatLinkImage(
                                      review.author_details.avatar_path
                                    )}
                                    alt=''
                                  />
                                </Link>
                              </div>
                              <div className='review_right'>
                                <div className='review_title'>
                                  <h3>A review By {review.author}</h3>
                                  <div className='review_rate'>
                                    <FontAwesomeIcon icon={faStar} />
                                    <span>{review.author_details.rating}</span>
                                  </div>
                                </div>
                                <p className='review_date'>
                                  Written by{' '}
                                  <Link to={'/'}>{review.author}</Link> on{' '}
                                  {formatDate(review.created_at)}
                                </p>
                                <div className='review_content'>
                                  <span>{formatText(review.content, 600)}</span>
                                  {review.content.length > 600 ? (
                                    <Link to={'/'}>read the rest.</Link>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p>
                              We don't have any reviews for{' '}
                              {data.name || data.title}. Would you like to write
                              one?
                            </p>
                          )
                        ) : (
                          <></>
                          //   <div className='discussion_item'>
                          //     <div className='discussion_img'>
                          //       <Link to={'/'}>
                          //         <img
                          //           src='https://www.themoviedb.org/t/p/w45_and_h45_face/5U5amYZQ5TD9628GWvmjXtgZygT.jpg'
                          //           alt=''
                          //         />
                          //       </Link>
                          //     </div>
                          //     <Link to={'/'} className='discussion_topic'>
                          //       Jensen Ackles casted to play Soldier Boy in Season
                          //       3
                          //     </Link>
                          //     <span className='discussion_status'>Open</span>
                          //     <span className='discussion_number'>3</span>
                          //     <span className='discussion_date'>
                          //       Oct 13, 2020 at 9:56 AM
                          //       <br />
                          //       by <Link to={'/'}>Innovator</Link>
                          //     </span>
                          //   </div>
                        )}
                      </div>

                      <Link
                        className='all'
                        to={socialTab === 'reviews' ? 'reviews' : 'discussions'}
                      >
                        {socialTab === 'reviews'
                          ? 'Read All Reviews'
                          : 'Go to Discussions'}
                      </Link>
                    </div>
                    <div className='media section'>
                      <div className='section_header'>
                        <h1 className='title'>Media</h1>
                        <div className='section_tabs'>
                          <span
                            onClick={() => setMediaTab('videos')}
                            className={mediaTab === 'videos' ? 'active' : ''}
                          >
                            Videos {videos && videos.results.length}
                          </span>
                          <span
                            className={mediaTab === 'backdrops' ? 'active' : ''}
                            onClick={() => setMediaTab('backdrops')}
                          >
                            Backdrops {images && images.backdrops.length}
                          </span>
                          <span
                            className={mediaTab === 'posters' ? 'active' : ''}
                            onClick={() => setMediaTab('posters')}
                          >
                            Posters {images && images.posters.length}
                          </span>
                        </div>
                      </div>
                      <div className='section_content'>
                        {mediaTab === 'backdrops' ? (
                          <div className='media_list'>
                            {images &&
                              images.backdrops.slice(0, 6).map(backdrop => {
                                return (
                                  <LazyLoadImage
                                    key={backdrop.file_path}
                                    src={`${IMAGE_PATH}${backdrop.file_path}`}
                                    alt=''
                                    effect='opacity'
                                  />
                                )
                              })}
                          </div>
                        ) : mediaTab === 'posters' ? (
                          <div className='media_list'>
                            {images &&
                              images.posters.slice(0, 6).map(poster => {
                                return (
                                  <LazyLoadImage
                                    key={poster.file_path}
                                    src={`${IMAGE_PATH}${poster.file_path}`}
                                    alt=''
                                    effect='opacity'
                                  />
                                )
                              })}
                          </div>
                        ) : (
                          <div className='media_list'>
                            {videos && videos.results.length > 0 ? (
                              videos.results.slice(0, 6).map(video => {
                                return (
                                  <div
                                    key={video.key}
                                    style={{
                                      backgroundImage: `url(https://i.ytimg.com/vi/${video.key}/hqdefault.jpg)`,
                                    }}
                                    className='video_thumbnail'
                                  >
                                    <span
                                      onClick={() => handleTrailer(video.key)}
                                      className='play_video'
                                    >
                                      <FontAwesomeIcon icon={faPlay} />
                                    </span>
                                  </div>
                                )
                              })
                            ) : (
                              <Link
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                                to={'/'}
                              >
                                <FontAwesomeIcon icon={faPlusCircle} />
                                <h3>Add a video</h3>
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                      <Link
                        className='all'
                        to={
                          mediaTab === 'videos'
                            ? 'videos'
                            : mediaTab === 'backdrops'
                            ? 'backdrops'
                            : 'posters'
                        }
                      >
                        {mediaTab === 'videos'
                          ? 'View All Videos'
                          : mediaTab === 'backdrops'
                          ? 'View All Backdrops'
                          : 'View All Posters'}
                      </Link>
                    </div>
                    <div className='recommendation section'>
                      <h1 className='title'>Recommendations</h1>
                      <div className='recommendation_list'>
                        {recommendations &&
                          recommendations.map(item => {
                            return (
                              <div key={item.id} className='item'>
                                <Link to={`/${item.media_type}/${item.id}`}>
                                  <div className='item_img'>
                                    <LazyLoadImage
                                      src={
                                        item.backdrop_path
                                          ? `${IMAGE_PATH}${item.backdrop_path}`
                                          : _images.loadingImage
                                      }
                                      alt=''
                                    />
                                    <div className='item_info'>
                                      <div className='info_left'>
                                        <FontAwesomeIcon icon={faCalendarDay} />
                                        <span>
                                          {item.first_air_date ||
                                            item.release_date}
                                        </span>
                                      </div>
                                      <div className='info_right'>
                                        <FontAwesomeIcon icon={faHeart} />
                                        <FontAwesomeIcon icon={faBookmark} />
                                        <FontAwesomeIcon icon={faStar} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='item_desc'>
                                    <span>{item.name || item.title}</span>
                                    <span>
                                      {(item.vote_average * 10).toFixed()}%
                                    </span>
                                  </div>
                                </Link>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item md={3} xs={12}>
                  <div className='content_right'>
                    <div className='section'>
                      <div className='panel'>
                        <strong>Social</strong>
                        <Tippy
                          content='Visit Homepage'
                          arrow
                          placement='top'
                          theme='darkBlue'
                        >
                          <span className='interact_item'>
                            <a
                              target='_blank'
                              rel='noreferrer'
                              href={data.homepage}
                            >
                              <FontAwesomeIcon icon={faLink} />
                            </a>
                          </span>
                        </Tippy>
                      </div>
                      <div className='panel'>
                        <strong>Status</strong>
                        <p>{data.status}</p>
                      </div>
                      {data.networks && data.networks.length > 0 && (
                        <div className='panel'>
                          <strong>Network</strong>
                          {data.networks.map(network => (
                            <div key={network.id} className='network_img'>
                              <Link to={`/network/${network.id}`}>
                                <LazyLoadImage
                                  effect='opacity'
                                  src={`${IMAGE_PATH}${network.logo_path}`}
                                  alt=''
                                />
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}

                      {data.type && (
                        <div className='panel'>
                          <strong>Type</strong>
                          <p>{data.type}</p>
                        </div>
                      )}

                      <div className='panel'>
                        <strong>Original Language</strong>
                        <p>{originalLanguage}</p>
                      </div>
                      {type === 'movie' && (
                        <>
                          <div className='panel'>
                            <strong>Budget</strong>
                            <p>{formatCurrency(data.budget)}</p>
                          </div>
                          <div className='panel'>
                            <strong>Revenue</strong>
                            <p>{formatCurrency(data.revenue)}</p>
                          </div>
                        </>
                      )}

                      <div className='panel'>
                        <strong>Keywords</strong>
                        <ul>
                          {keywords.map(keyword => {
                            return (
                              <li key={keyword.id}>
                                <Link to={`/keyword/${keyword.id}/${type}`}>
                                  {keyword.name}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                    <div className='section'>
                      <div className='panel'>
                        <strong>Content Score</strong>
                        <div className='score_bar'>
                          <p>100</p>
                        </div>
                      </div>
                      {/* <div className='panel'>
                        <strong>Top Contributors</strong>
                        <ul>
                          <li>
                            <div className='contributor'>
                              <img
                                src='https://www.themoviedb.org/t/p/w45_and_h45_face/9UhDsDZYJZdtiyPz5CCfiDgh0kk.jpg'
                                alt=''
                              />
                              <div className='contributor_info'>
                                <p>172</p>
                                <span>MC Clap Yo Handz</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div> */}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      )}
    </>
  )
}

export default MovieDetails
