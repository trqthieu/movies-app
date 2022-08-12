import { faBookmark, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { IMAGE_PATH } from 'src/api/request'
import images from 'src/assets/images/images'
import formatText from 'src/common/formatText'
import './MovieCard.scss'
function MovieCard({ movie }) {
  return (
    <div className='movie_card'>
      <div className='movie_img'>
        <LazyLoadImage
          effect='opacity'
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
            {(movie.title && formatText(movie.title, 26)) ||
              (movie.name && formatText(movie.name, 26))}
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
