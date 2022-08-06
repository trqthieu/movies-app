import React from 'react'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import NavItem from 'src/components/NavItem/NavItem'
import { detailsNavList } from 'src/data/data'
import { movieDetailsRoutes } from 'src/routes/routes'

function Details() {
  const { id } = useParams()
  const location = useLocation()
  const type = location.pathname.split('/')[1]
  const overview =
    type === 'tv'
      ? [
          '/',
          '/titles',
          '/casts',
          '/episode_groups',
          '/seasons',
          '/translations',
          '/changes',
          '/report',
          '/edit',
        ].map(item => {
          return `/${type}/${id}${item}`
        })
      : [
          '/',
          '/titles',
          '/casts',
          '/release_dates',
          '/translations',
          '/changes',
        ].map(item => {
          return `/${type}/${id}${item}`
        })
  const media = ['/backdrops', '/logos', '/posters', '/videos'].map(item => {
    return `/${type}/${id}${item}`
  })
  const fandom = ['/discussions', '/reviews'].map(item => {
    return `/${type}/${id}${item}`
  })
  const share = ['/', '/', '/'].map(item => {
    return `/${type}/${id}${item}`
  })
  return (
    <div>
      <div className='details_header'>
        {detailsNavList(overview, media, fandom, share, type === 'tv').map(
          (navItem, index) => {
            return <NavItem key={index} navItem={navItem} />
          }
        )}
      </div>
      <Routes>
        {movieDetailsRoutes.map((route, index) => {
          return <Route key={index} path={route.path} element={route.element} />
        })}
      </Routes>
    </div>
  )
}

export default Details
