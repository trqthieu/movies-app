import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useLocation, useParams } from 'react-router-dom'
import request from 'src/api/request'
import { getYear } from 'src/common/formatDate'
import getImagePath from 'src/common/getImagePath'
import MediaFilter from 'src/components/Filter/MediaFilter/MediaFilter'
import ImageDisplay from './ImageDisplay'
import './MovieMedia.scss'
import VideoDisplay from './VideoDisplay'
const videoFilter = [
  'Trailer',
  'Teaser',
  'Clip',
  'Behind the Scenes',
  'Bloopers',
  'Featurette',
  'Opening Credits',
]
function MovieMedia() {
  const params = useParams()
  const { id } = params
  const location = useLocation()
  const type = location.pathname.split('/')[1]
  const media = location.pathname.split('/')[3]

  const [details, setDetails] = useState()
  const [mediaList, setMediaList] = useState([])
  const [filterDisplay, setFilterDisplay] = useState([])
  const [filterActive, setFilterActive] = useState()
  const [mediaDisplay, setMediaDisplay] = useState([])

  useEffect(() => {
    const getDetails = async () => {
      const data = await request.getDetails(type, id)
      setDetails(data)
    }
    const getMedia = async () => {
      if (media === 'videos') {
        const videos = await request.getVideos(type, id)
        setMediaList(videos.results)
        setFilterDisplay(videoFilter)
        return
      } else {
        const images = await request.getImages(type, id)
        const languages = await request.getLanguages()

        setMediaList(images[media])
        const filterLanguages = []
        images[media].forEach(image => {
          if (!filterLanguages.includes(image.iso_639_1)) {
            filterLanguages.push(image.iso_639_1)
          }
        })
        const display = languages.filter(language => {
          return filterLanguages.includes(language.iso_639_1)
        })
        if (filterLanguages.includes(null)) {
          display.push({ english_name: 'No Language', iso_639_1: null })
        }
        setFilterDisplay(display)
        return
      }
    }
    getDetails()
    getMedia()
  }, [type, id, media])

  useEffect(() => {
    if (filterActive) {
      const display =
        media === 'videos'
          ? mediaList.filter(media => media.type === filterActive)
          : mediaList.filter(
              media => media.iso_639_1 === filterActive.iso_639_1
            )
      setMediaDisplay(display)
    }
  }, [filterActive, mediaList, media])

  return (
    <div className='media'>
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
      <div className='media_content_wrapper'>
        <Container>
          <div className='media_content'>
            <Grid container spacing={2}>
              <Grid item md={3} xs={12}>
                <MediaFilter
                  isVideos={media === 'videos'}
                  mediaType={media}
                  active={filterActive}
                  setActive={setFilterActive}
                  mediaList={mediaList}
                  filterDisplay={filterDisplay}
                />
              </Grid>
              <Grid item md={9} xs={12}>
                {media === 'videos' ? (
                  <VideoDisplay videoList={mediaDisplay} />
                ) : (
                  <ImageDisplay
                    imageList={mediaDisplay}
                    backdrops={media === 'backdrops'}
                    logos={media === 'logos'}
                  />
                )}
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default MovieMedia
