import {
  faBookmark,
  faEllipsis,
  faHeart,
  faList,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import images from 'src/assets/images/images'
import './Card.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import request, { IMAGE_PATH } from 'src/api/request'
import formatDate from 'src/common/formatDate'

function Card({ data, type }) {
  return (
    <div className='card'>
      <div className='card_img_wrapper'>
        <div className='card_img'>
          <LazyLoadImage
            effect='opacity'
            src={`${IMAGE_PATH}${data.poster_path}`}
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
            <span className='card_rate_text'>
              {(data.vote_average * 10).toFixed() > 0
                ? `${(data.vote_average * 10).toFixed()} %`
                : 'NR'}
            </span>
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
      </div>
      <div className='card_desc'>
        <Link to={`/${type}/${data.id}`}>
          <h4 className='card_desc_name'>{data.name || data.title}</h4>
        </Link>
        <p className='card_desc_date'>
          {(data.first_air_date || data.release_date) &&
            formatDate(data.first_air_date || data.release_date)}
        </p>
      </div>
    </div>
  )
}

export default Card
