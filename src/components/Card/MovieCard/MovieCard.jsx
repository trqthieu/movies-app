import {
  faBookBookmark,
  faBookmark,
  faHeart,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { IMAGE_PATH } from 'src/api/request'
import images from 'src/assets/images/images'
import formatText from 'src/common/formatText'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import './MovieCard.scss'
function MovieCard({ movie }) {
  return (
    <div className='movie_card'>
      <div className='movie_img'>
        <img
          src={
            movie.poster_path
              ? `${IMAGE_PATH}${movie.poster_path}`
              : images.loadingImage
          }
          alt=''
        />
      </div>
      <div className='movie_info'>
        <div className='info_header'>
          <h3 className='name'>
            {(movie.original_title && formatText(movie.original_title, 26)) ||
              (movie.original_name && formatText(movie.original_name, 26))}
          </h3>
          <div className='rate'>
            <FontAwesomeIcon icon={faStar} />
            <span>{movie.vote_average.toFixed()}</span>
          </div>
        </div>
        <p className='overview'>{movie.overview}</p>
        <div className='movie_interact'>
          <div className='interact_item'>
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className='interact_item'>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
          <div className='interact_item'>
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
      {/* <LoadingIcon /> */}
    </div>
  )
}

export default MovieCard
