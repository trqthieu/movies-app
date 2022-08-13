import {
  faBars,
  faBell,
  faPlus,
  faSearch,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from '@mui/material'
import Tippy from '@tippyjs/react'
import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import images from 'src/assets/images/images'
import { navList, popupAdd, popupUser } from 'src/data/data'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import NavItem from '../NavItem/NavItem'
import Language from '../Popup/Language/Language'
import Notification from '../Popup/Notification/Notification'
import Popup from '../Popup/Popup'
import SearchBar from '../SearchBar/SearchBar'
import './Header.scss'

function Header() {
  const [searching, setSearching] = useState(false)
  const [mobileNav, setMobileNav] = useState([])
  const [login, setLogin] = useState(() => {
    const userAuth = JSON.parse(localStorage.getItem('userAuth'))
    return userAuth
  })
  const handleLogout = () => {
    localStorage.removeItem('userAuth')
    window.location.reload()
  }
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
                  <LazyLoadImage
                    effect='opacity'
                    src={images.logo}
                    alt='Movies Logo'
                  />
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
                <Tippy
                  theme='light'
                  placement='bottom'
                  hideOnClick
                  interactive
                  trigger='click'
                  content={<Popup popupData={popupAdd} />}
                >
                  <div className='header_nav_item icon'>
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                </Tippy>

                <Tippy
                  theme='light'
                  placement='bottom'
                  hideOnClick
                  interactive
                  trigger='click'
                  content={<Language />}
                >
                  <div className='header_nav_item language'>
                    <p className='language_text'>EN</p>
                  </div>
                </Tippy>

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
                    <Tippy
                      theme='light'
                      placement='bottom'
                      hideOnClick
                      interactive
                      trigger='click'
                      content={<Notification />}
                    >
                      <div className='header_nav_item icon'>
                        <FontAwesomeIcon icon={faBell} />
                      </div>
                    </Tippy>

                    <Tippy
                      theme='light'
                      placement='bottom'
                      hideOnClick
                      interactive
                      trigger='click'
                      content={
                        <Popup
                          popupData={popupUser}
                          login={login}
                          handleLogout={handleLogout}
                        />
                      }
                    >
                      <div className='header_nav_item avatar'>
                        <LazyLoadImage
                          effect='opacity'
                          src={login.user.photoURL}
                          alt='avatar'
                        />
                      </div>
                    </Tippy>
                  </>
                )}
              </div>
              <Tippy
                theme='light'
                placement='bottom'
                hideOnClick
                interactive
                trigger='click'
                content={
                  !login ? (
                    <div>
                      <Link className='header_subnav_link' to={'/login'}>
                        Login
                      </Link>
                      <Link className='header_subnav_link' to={'/sign-up'}>
                        Sign Up
                      </Link>
                    </div>
                  ) : (
                    <Popup
                      popupData={popupUser}
                      login={login}
                      handleLogout={handleLogout}
                    />
                  )
                }
              >
                <div className='header_nav_item user'>
                  {login ? (
                    <LazyLoadImage src={login.user.photoURL} />
                  ) : (
                    <FontAwesomeIcon icon={faUser} />
                  )}
                </div>
              </Tippy>
              <div
                onClick={() => setSearching(!searching)}
                className='header_nav_item search'
              >
                {!searching && (
                  <FontAwesomeIcon
                    onClick={() => {
                      setSearching(true)
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
      {searching && <SearchBar setSearching={setSearching} />}
    </>
  )
}

export default Header
