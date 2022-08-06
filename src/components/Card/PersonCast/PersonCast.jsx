import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import request from 'src/api/request'
import images from 'src/assets/images/images'
import getImagePath from 'src/common/getImagePath'
import './PersonCast.scss'
function PersonCast({ cast, intro }) {
  const [creditDetails, setCreditDetails] = useState()
  useEffect(() => {
    const getCreditDetails = async () => {
      const details = await request.getCreditDetails(cast.credit_id)
      setCreditDetails(details)
    }
    getCreditDetails()
  }, [cast.credit_id])
  return (
    <div key={cast.id} className={intro ? 'cast_person intro' : 'cast_person'}>
      <div className='cast_img'>
        <img
          src={
            cast.profile_path
              ? getImagePath(cast.profile_path)
              : cast.gender === 1
              ? images.femalePerson
              : images.malePerson
          }
          alt=''
        />
      </div>
      <div className='cast_info'>
        <Link to={`/person/${cast.id}`}>
          <strong>{cast.name}</strong>
        </Link>
        <p>
          {cast.character || cast.job}{' '}
          {creditDetails && creditDetails.media && creditDetails.media.seasons && (
            <span>
              (
              {creditDetails.media.seasons.reduce((a, b) => {
                return a + b.episode_count
              }, 0) + ' Episodes'}
              )
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

export default PersonCast
