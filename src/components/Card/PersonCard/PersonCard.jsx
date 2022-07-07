import React from 'react'
import './PersonCard.scss'
import { IMAGE_PATH } from 'src/api/request'
import images from 'src/assets/images/images'
import { LazyLoadImage } from 'react-lazy-load-image-component'
function PersonCard({ person }) {
  const { gender, name, known_for, profile_path } = person
  const handleSrcPerson = path => {
    if (path) {
      return `${IMAGE_PATH}${profile_path}`
    } else if (gender === 1) {
      return images.femalePerson
    }
    return images.malePerson
  }
  const knowFor = known_for
    .map(item => item.original_title || item.name)
    .join(', ')
  return (
    <div className='person_card'>
      <div className='person_card_img'>
        <LazyLoadImage
          effect='opacity'
          src={handleSrcPerson(profile_path)}
          alt=''
        />
      </div>
      <div className='desc'>
        <h1 className='person_card_name'>{name}</h1>
        <p className='person_card_knownfor'>{knowFor}</p>
      </div>
    </div>
  )
}

export default PersonCard
