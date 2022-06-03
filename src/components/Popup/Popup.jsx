import React from 'react'
import { Link } from 'react-router-dom'
import './Popup.scss'

function Popup({ popupData }) {
  const { heading, groups } = popupData
  return (
    <div className='popup_wrapper popup'>
      {heading && (
        <div className='popup_group user'>
          <p className='user_name'>{heading.title}</p>
          <Link className='link_profile' to={heading.link.path}>
            {heading.link.text}
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
    </div>
  )
}

export default Popup
