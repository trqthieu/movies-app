import React from 'react'
import Banner from 'src/components/Banner/Banner'
import Card from 'src/components/Card/Card'
import RowContent from 'src/components/RowContent/RowContent'
import './Home.scss'
function Home() {
  return (
    <div className='home'>
      <Banner />
      <div className='content'>
        <RowContent popular />
        <RowContent trending />
      </div>
    </div>
  )
}

export default Home
