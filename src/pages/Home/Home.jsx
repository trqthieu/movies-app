import { Container, Grid } from '@mui/material'
import React from 'react'
import Banner from 'src/components/Banner/Banner'
import Card from 'src/components/Card/Card'
import Footer from 'src/components/Footer/Footer'
import RowContent from 'src/components/RowContent/RowContent'
import './Home.scss'
const leaderboardData = {
  all: 743030,
  week: 8889,
  users: [
    {
      avatar:
        'https://www.gravatar.com/avatar/ec287b318fb1f7d5fb441288c85e5b37.jpg?s=64',
      name: 'young40',
      all: 10630,
      week: 8889,
    },
    {
      avatar:
        'https://www.themoviedb.org/t/p/w64_and_h64_face/hjvyN4SrXqXy316GkbOshW8sGXJ.jpg',
      name: 'talestalker',
      all: 743030,
      week: 6195,
    },
    {
      avatar:
        'https://www.gravatar.com/avatar/18bf84654d6180fdcb873d3172a8e269.jpg?s=64',
      name: 'neitsaB',
      all: 20350,
      week: 3201,
    },
    {
      avatar:
        'https://www.themoviedb.org/t/p/w64_and_h64_face/yYG7Rhn9HfFpssIMeNiDynvxC14.jpg',
      name: 'raze464',
      all: 331870,
      week: 3018,
    },
  ],
}
function Home() {
  return (
    <div className='home'>
      <Banner />
      <div className='content'>
        <RowContent popular />
        <RowContent trailer />
        <RowContent trending />
        <div className='leaderboard'>
          <Container>
            <div className='leaderboard_heading'>
              <span className='leaderboard_title'>Leaderboard</span>
              <div className='leaderboard_type'>
                <p>All Time Edits</p>
                <p>Edits This Week</p>
              </div>
            </div>
            <div className='leaderboard_content'>
              <Grid container spacing={2}>
                {leaderboardData.users.map((user, index) => {
                  return (
                    <Grid item key={index} md={6}>
                      <div className='leaderboard_item'>
                        <img src={user.avatar} alt='' />
                        <div className='leaderboard_info'>
                          <h4 className='info_name'>{user.name}</h4>
                          <div className='info_gauge'>
                            <span
                              style={{
                                width: `${
                                  (user.all / leaderboardData.all) * 100
                                }%`,
                              }}
                              className='gauge_bar all'
                            ></span>

                            <span className='text'>{user.all}</span>
                          </div>
                          <div className='info_gauge'>
                            <span
                              style={{
                                width: `${
                                  (user.week / leaderboardData.week) * 100
                                }%`,
                              }}
                              className='gauge_bar week'
                            ></span>

                            <span className='text'>{user.week}</span>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  )
                })}
              </Grid>
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default Home
