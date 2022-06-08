import {
  faBookmark,
  faEllipsis,
  faHeart,
  faList,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import images from 'src/assets/images/images'
import './Card.scss'

const formatDate = date => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const formattedDate = date.split('-')
  return `${monthNames[formattedDate[1] - 1]} ${formattedDate[2]}, ${
    formattedDate[0]
  }`
}
function Card({ data }) {
  const [loadedImage, setLoadedImage] = useState(false)

  return (
    <div className='card'>
      <div className='card_img_wrapper'>
        <div className='card_img'>
          <img
            onLoad={() => setLoadedImage(true)}
            src={
              loadedImage
                ? `https://image.tmdb.org/t/p/original${data.poster_path}`
                : images.loadingImage
            }
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
        <div className='card_rate_wrapper'>
          <div className='card_rate'>
            <span className='card_rate_text'>{data.vote_average * 10}%</span>
            <CircularProgress
              className='progress_bar'
              variant='determinate'
              value={data.vote_average * 10}
              style={{
                width: '38px',
                height: '38px',
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
      </div>
      <div className='card_desc'>
        <Link to={'/'}>
          <h4 className='card_desc_name'>{data.name || data.title}</h4>
        </Link>
        <p className='card_desc_date'>
          {formatDate(data.first_air_date || data.release_date)}
        </p>
      </div>
    </div>
  )
}

export default Card
