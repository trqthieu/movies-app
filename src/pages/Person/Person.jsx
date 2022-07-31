import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { personRoutes } from 'src/routes/routes'

function Person() {
  return (
    <div>
      <Routes>
        {personRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  )
}

export default Person
