import { Container, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import images from 'src/assets/images/images'
import './Footer.scss'
const footerData = [
  {
    title: 'The basics',
    content: [
      {
        link: '/',
        text: 'About TMDB',
      },
      {
        link: '/',
        text: 'Contact Us',
      },
      {
        link: '/',
        text: 'Support Forums',
      },
      {
        link: '/',
        text: 'API',
      },
      {
        link: '/',
        text: 'System Status',
      },
    ],
  },
  {
    title: 'Get involved',
    content: [
      {
        link: '/',
        text: 'Contribution Bible',
      },
      {
        link: '/',
        text: 'Add New Movie',
      },
      {
        link: '/',
        text: 'Add New TV Show',
      },
    ],
  },
  {
    title: 'Community',
    content: [
      {
        link: '/',
        text: 'Guidelines',
      },
      {
        link: '/',
        text: 'Discussions',
      },
      {
        link: '/',
        text: 'Leaderboard',
      },
      {
        link: '/',
        text: 'Twitter',
      },
    ],
  },
  {
    title: 'Legal',
    content: [
      {
        link: '/',
        text: 'Terms of Use',
      },
      {
        link: '/',
        text: 'API Terms of Use',
      },
      {
        link: '/',
        text: 'Privacy Policy',
      },
    ],
  },
]
function Footer() {
  return (
    <div className='footer'>
      <Container>
        <Grid container spacing={2}>
          <Grid item lg={3}>
            <Grid container spacing={2} className='justify-content-center'>
              <Grid item>
                <img className='img' src={images.logo2} alt='logo' />
              </Grid>
              <Grid item>
                <button>
                  <Link to={'/sign-up'}>Join the community</Link>
                </button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={9}>
            <Grid container spacing={4}>
              {footerData.map((data, index) => {
                return (
                  <Grid item key={index} className='col_item' lg={3} sm={6}>
                    <h4>{data.title}</h4>
                    {data.content.map((item, index) => {
                      return (
                        <Link key={index} to={item.link}>
                          {item.text}
                        </Link>
                      )
                    })}
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Footer
