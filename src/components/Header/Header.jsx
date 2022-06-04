import {
  faBars,
  faBell,
  faPlus,
  faSearch,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import images from 'src/assets/images/images'
import Language from '../Popup/Language/Language'
import NavItem from '../NavItem/NavItem'
import Notification from '../Popup/Notification/Notification'
import Search from '../Search/Search'
import './Header.scss'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import Popup from '../Popup/Popup'
import { popupUser, popupAdd, navList } from 'src/data/data'

function Header() {
  const [searching, setSearching] = useState(false)
  const [mobileNav, setMobileNav] = useState([])
  const [popupIndex, setPopupIndex] = useState()
  const [login, setLogin] = useState(true)
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
  const handlePopup = index => {
    if (popupIndex === index) {
      setPopupIndex()
      return
    }
    setPopupIndex(index)
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
                  <FontAwesomeIcon
                    onClick={() => handlePopup(0)}
                    icon={faPlus}
                  />
                  {popupIndex === 0 && <Popup popupData={popupAdd} />}
                </div>
                <div className='header_nav_item language'>
                  <p onClick={() => handlePopup(1)} className='language_text'>
                    EN
                  </p>
                  {popupIndex === 1 && <Language />}
                </div>
                {!login ? (
                  <>
                    <Link className='header_nav_item' to={'/login'}>
                      Login
                    </Link>
                    <Link className='header_nav_item' to={'/sign-up'}>
                      Join TMDB
                    </Link>
                  </>
                ) : (
                  <>
                    <div className='header_nav_item icon'>
                      <FontAwesomeIcon
                        onClick={() => handlePopup(2)}
                        icon={faBell}
                      />
                      {popupIndex === 2 && <Notification />}
                    </div>

                    {/* <Tippy
                      theme='light'
                      arrow
                      duration={100}
                      content='Profile and Settings'
                    > */}
                    <div className='header_nav_item avatar'>
                      <img
                        onClick={() => handlePopup(3)}
                        src={images.avatar}
                        alt='avatar'
                      />
                      {popupIndex === 3 && <Popup popupData={popupUser} />}
                    </div>
                    {/* </Tippy> */}
                  </>
                )}
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
                    onClick={() => {
                      setSearching(true)
                      handlePopup()
                    }}
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
