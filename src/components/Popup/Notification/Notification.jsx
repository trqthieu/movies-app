import React from 'react'
import { Link } from 'react-router-dom'

function Notification() {
  return (
    <div className='popup_wrapper'>
      <h3 className='popup_title'>Unread Notifications {0}</h3>
      <div className='popup_notification'>
        <p>
          Good job! Looks like you're all caught up.
          <Link to={'/'}>View All</Link>
        </p>
      </div>
    </div>
  )
}

export default Notification
