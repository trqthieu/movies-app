import React from 'react'
import { Link } from 'react-router-dom'
import './Popup.scss'

function Popup({ popupData, login, handleLogout }) {
  const { heading, groups } = popupData
  return (
    <div className='popup_wrapper popup'>
      {heading && (
        <div className='popup_group user'>
          <p className='user_name'>{login.user.displayName}</p>
          <Link className='link_profile' to={heading.path}>
            {heading.text}
          </Link>
        </div>
      )}
      {groups.map((group, index) => {
        return (
          <div key={index} className='popup_group'>
            {group.map((item, index) => {
              return (
                <Link key={index} to={item.path}>
                  {item.text}
                </Link>
              )
            })}
          </div>
        )
      })}
      {login && (
        <div onClick={handleLogout} className='popup_group'>
          <button>Logout</button>
        </div>
      )}
    </div>
  )
}

export default Popup
