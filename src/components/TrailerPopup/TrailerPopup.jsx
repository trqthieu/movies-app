import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function TrailerPopup({ videoPath, setShowVideo, id }) {
  return (
    <div>
      <div className='video_popup'>
        <div className='custom_bar'>
          <FontAwesomeIcon
            onClick={() => setShowVideo(false)}
            className='icon'
            icon={faXmark}
          />
        </div>
        <iframe
          allow='autoplay'
          className='youtube_frame'
          width='928'
          height='584'
          title={id}
          src={`https://www.youtube.com/embed/${videoPath}?autoplay=1`}
        ></iframe>
      </div>
      <div className='video_popup_overlay'></div>
    </div>
  )
}

export default TrailerPopup
