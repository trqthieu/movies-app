import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Pagination.scss'
function Pagination() {
  return (
    <div className='pagination_wrapper'>
      <div className='pagination_item adjust'>
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Previous</span>
      </div>
      <span className='pagination_item active'>item</span>
      <div className='pagination_item adjust'>
        <span>Next</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  )
}

export default Pagination
