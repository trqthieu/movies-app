import {
  faClose,
  faPlus,
  faSearch,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import images from 'src/assets/images/images'
import Search from '../Search/Search'
import './Header.scss'
function Header() {
  const [searching, setSearching] = useState(false)
  return (
    <>
      <div className='header__wrapper'>
        <Container>
          <div className='header'>
            <div className='header_left'>
              <div className='header_logo'>
                <Link to={'/'}>
                  <img src={images.logo} alt='Movies Logo' />
                </Link>
              </div>
              <div className='header_nav'>
                <div className='header_nav_item'>
                  <Link className='link' to={'/movie'}>
                    Movies
                  </Link>
                  <div className='header_subnav'>
                    <Link className='header_subnav_link' to={'/movie'}>
                      Popular
                    </Link>
                    <Link
                      className='header_subnav_link'
                      to={'/movie/now-playing'}
                    >
                      Now Playing
                    </Link>
                    <Link className='header_subnav_link' to={'/movie/upcoming'}>
                      Upcoming
                    </Link>
                    <Link
                      className='header_subnav_link'
                      to={'/movie/top-rated'}
                    >
                      Top Rated
                    </Link>
                  </div>
                </div>
                <div className='header_nav_item'>
                  <Link className='link' to={'/tv'}>
                    TV Shows
                  </Link>
                  <div className='header_subnav'>
                    <Link className='header_subnav_link' to={'/tv'}>
                      Popular
                    </Link>
                    <Link className='header_subnav_link' to={'/tv/now-playing'}>
                      Airing Today
                    </Link>
                    <Link className='header_subnav_link' to={'/tv/upcoming'}>
                      On TV
                    </Link>
                    <Link className='header_subnav_link' to={'/tv/top-rated'}>
                      Top Rated
                    </Link>
                  </div>
                </div>
                <div className='header_nav_item'>
                  <Link className='link' to={'/person'}>
                    People
                  </Link>
                  <div className='header_subnav'>
                    <Link className='header_subnav_link' to={'/person'}>
                      Popular People
                    </Link>
                  </div>
                </div>
                <div className='header_nav_item'>
                  More
                  <div className='header_subnav'>
                    <Link className='header_subnav_link' to={'/movie'}>
                      Discussions
                    </Link>
                    <Link className='header_subnav_link' to={'/movie'}>
                      Leaderboard
                    </Link>
                    <Link className='header_subnav_link' to={'/movie'}>
                      Support
                    </Link>
                    <Link className='header_subnav_link' to={'/movie'}>
                      API
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='header_right'>
              <div className='header_nav'>
                <div className='header_nav_item icon'>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
                <div className='header_nav_item language'>EN</div>
                <Link className='header_nav_item' to={'/login'}>
                  Login
                </Link>
                <Link className='header_nav_item' to={'/sign-up'}>
                  Join TMDB
                </Link>
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
          </div>
        </Container>
      </div>
      {searching && <Search />}
    </>
  )
}

export default Header
