import {
  faBars,
  faPerson,
  faPlus,
  faSearch,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Container, TabContainer } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import images from 'src/assets/images/images'
import Search from '../Search/Search'
import NavItem from '../NavItem/NavItem'
import './Header.scss'
import Language from '../Language/Language'

const movieNav = {
  nav: { text: 'Movies', link: '/movie' },
  subnav: [
    { text: 'Popular', link: '/movie' },
    { text: 'Now Playing', link: '/movie/now-playing' },
    { text: 'Upcoming', link: '/movie/upcoming' },
    { text: 'Top Rated', link: '/movie/top-rated' },
  ],
}
const tvNav = {
  nav: { text: 'TV Shows', link: '/tv' },
  subnav: [
    { text: 'Popular', link: '/tv' },
    { text: 'Airing Today', link: '/tv/now-playing' },
    { text: 'On TV', link: '/tv/upcoming' },
    { text: 'Top Rated', link: '/tv/top-rated' },
  ],
}
const personNav = {
  nav: { text: 'People', link: '/person' },
  subnav: [{ text: 'Popular People', link: '/person' }],
}
const moreNav = {
  nav: { text: 'More', link: '#' },
  subnav: [
    { text: 'Discussions', link: '#' },
    { text: 'Leaderboard', link: '#' },
    { text: 'Support', link: '#' },
    { text: 'API', link: '#' },
  ],
}
const navList = [movieNav, tvNav, personNav, moreNav]
function Header() {
  const [searching, setSearching] = useState(false)
  const [mobileNav, setMobileNav] = useState([])
  const handleMobileNav = index => {
    let newMobileNav = [...mobileNav]
    if (!newMobileNav.includes(index)) {
      newMobileNav.push(index)
    } else {
      newMobileNav = newMobileNav.filter(item => {
        return item !== index
      })
    }

    setMobileNav(newMobileNav)
  }
  return (
    <>
      <div className='header_wrapper'>
        <Container>
          <div className='header'>
            <label htmlFor='mobile-menu'>
              <div className='menu_bar'>
                <FontAwesomeIcon icon={faBars} />
              </div>
            </label>
            <input type='checkbox' id='mobile-menu' hidden />
            <div className='mobile_nav_wrapper'>
              <Container>
                <div className='mobile_nav'>
                  <label htmlFor='mobile-menu'>
                    <div className='mobile_icon_close'>
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                  </label>
                  {navList.map((item, index) => {
                    return (
                      <div key={index} className='mobile_nav_item'>
                        <Link
                          key={index}
                          onClick={() => handleMobileNav(index)}
                          to={'#'}
                        >
                          {item.nav.text}
                        </Link>
                        {mobileNav.includes(index) && (
                          <div className='mobile_subnav'>
                            {item.subnav.map((item, index) => {
                              return (
                                <Link
                                  key={index}
                                  className='mobile_subnav_link'
                                  to={item.link}
                                >
                                  {item.text}
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </Container>
            </div>
            <div className='header_left'>
              <div className='header_logo'>
                <Link to={'/'}>
                  <img src={images.logo} alt='Movies Logo' />
                </Link>
              </div>
              <div className='header_nav'>
                {navList.map((navItem, index) => {
                  return <NavItem key={index} navItem={navItem} />
                })}
              </div>
            </div>
            <div className='header_right'>
              <div className='header_nav'>
                <div className='header_nav_item icon'>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
                <div className='header_nav_item language'>
                  <p>EN</p>
                  <Language />
                </div>
                <Link className='header_nav_item' to={'/login'}>
                  Login
                </Link>
                <Link className='header_nav_item' to={'/sign-up'}>
                  Join TMDB
                </Link>
              </div>
              <div className='header_nav_item user'>
                <FontAwesomeIcon icon={faUser} />
                <div className='header_subnav'>
                  <Link className='header_subnav_link' to={'/login'}>
                    Login
                  </Link>
                  <Link className='header_subnav_link' to={'/sign-up'}>
                    Sign Up
                  </Link>
                </div>
              </div>
              <div
                onClick={() => setSearching(!searching)}
                className='header_nav_item search'
              >
                {!searching && (
                  <FontAwesomeIcon
                    onClick={() => setSearching(true)}
                    icon={faSearch}
                  />
                )}
                {searching && (
                  <FontAwesomeIcon
                    onClick={() => setSearching(false)}
                    icon={faXmark}
                  />
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
      {searching && <Search />}
    </>
  )
}

export default Header
