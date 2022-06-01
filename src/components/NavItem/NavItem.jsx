import React from 'react'
import { Link } from 'react-router-dom'

function NavItem({ navItem }) {
  const { nav, subnav } = navItem
  return (
    <div className='header_nav_item'>
      <Link className='link' to={nav.link}>
        {nav.text}
      </Link>
      <div className='header_subnav'>
        {subnav.map((item, index) => {
          return (
            <Link key={index} className='header_subnav_link' to={item.link}>
              {item.text}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default NavItem
