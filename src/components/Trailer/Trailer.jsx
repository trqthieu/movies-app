import {
  faBookmark,
  faEllipsis,
  faHeart,
  faList,
  faPlay,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import request from 'src/api/request'
import TrailerPopup from '../TrailerPopup/TrailerPopup'
import './Trailer.scss'
function Trailer({ type, data, handleBackground }) {
  const [videoPath, setVideoPath] = useState()
  const [showVideo, setShowVideo] = useState(false)
  const handleTrailerClick = async () => {
    const result = await request.getVideos(type, data.id)
    setShowVideo(true)
    setVideoPath(result.results[0].key)
  }
  return (
    <div className='trailer'>
      {showVideo && (
        <TrailerPopup
          videoPath={videoPath}
          setShowVideo={setShowVideo}
          id={data.id}
        />
      )}
      <div className='card_img_wrapper'>
        <div
          onMouseOver={() => handleBackground(data.backdrop_path)}
          onClick={handleTrailerClick}
          className='card_img'
        >
          <div className='btn_play_trailer'>
            <FontAwesomeIcon icon={faPlay} />
          </div>
          <LazyLoadImage
            effect='opacity'
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            alt=''
          />
        </div>
        <div className='card_actions'>
          <FontAwesomeIcon className='icon' icon={faEllipsis} />
          <div className='card_popup'>
            <div className='card_popup_item'>
              <FontAwesomeIcon className='card_popup_item_icon' icon={faList} />
              <h4 className='card_popup_item_text'>Add to list</h4>
            </div>
            <div className='card_popup_item'>
              <FontAwesomeIcon
                className='card_popup_item_icon'
                icon={faHeart}
              />
              <h4 className='card_popup_item_text'>Favorite</h4>
            </div>
            <div className='card_popup_item'>
              <FontAwesomeIcon
                className='card_popup_item_icon'
                icon={faBookmark}
              />
              <h4 className='card_popup_item_text'>Watchlist</h4>
            </div>
            <div className='card_popup_item'>
              <FontAwesomeIcon className='card_popup_item_icon' icon={faStar} />
              <h4 className='card_popup_item_text'>Your rating</h4>
            </div>
          </div>
        </div>
      </div>
      <div className='trailer_desc'>
        <h4 className='trailer_desc_name'>{data.name || data.title}</h4>
        {/* <p className='trailer_desc_overview'>{data.overview}</p> */}
      </div>
    </div>
  )
}

export default Trailer
