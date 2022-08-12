import { faArrowLeft, faPen, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useLocation, useParams } from 'react-router-dom'
import request from 'src/api/request'
import images from 'src/assets/images/images'
import formatDate, { getYear } from 'src/common/formatDate'
import formatLinkImage from 'src/common/formatImageLink'
import formatText from 'src/common/formatText'
import getImagePath from 'src/common/getImagePath'
import './MovieReviews.scss'
function MovieReviews() {
  const location = useLocation()
  const { id } = useParams()
  const type = location.pathname.split('/')[1]
  const [details, setDetails] = useState()
  const [reviewList, setReviewList] = useState([])
  const [readAll, setReadAll] = useState()
  useEffect(() => {
    const getDetails = async () => {
      const data = await request.getDetails(type, id)
      const reviews = await request.getReviews(type, id)
      setReviewList(reviews.results)
      setDetails(data)
    }
    getDetails()
  }, [type, id])

  return (
    <div className='reviews'>
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
      <div className='review_details_wrapper'>
        <Container>
          <div className='review_details'>
            <div className='review_list'>
              {reviewList.map(review => (
                <div key={review.id} className='review_item'>
                  <div className='review_img'>
                    <Link to={'/'}>
                      <LazyLoadImage
                        effect='opacity'
                        src={
                          review.author_details.avatar_path
                            ? formatLinkImage(review.author_details.avatar_path)
                            : images.malePerson
                        }
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
                      Written by <Link to={'/'}>{review.author}</Link> on{' '}
                      {formatDate(review.created_at)}
                    </p>
                    <div className='review_content'>
                      <span>
                        {readAll === review.id
                          ? review.content
                          : formatText(review.content, 600)}
                      </span>
                      {review.content.length > 600 && readAll !== review.id && (
                        <span
                          onClick={() => setReadAll(review.id)}
                          className='rest'
                        >
                          read the rest.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='review_form_wrapper'>
              <button className='write_review'>
                <FontAwesomeIcon icon={faPen} />
                <span>Write review</span>
              </button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default MovieReviews
