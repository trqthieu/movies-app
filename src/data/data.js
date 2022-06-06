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
    { text: 'Airing Today', link: '/tv/airing-today' },
    { text: 'On TV', link: '/tv/on-the-air' },
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
export const navList = [movieNav, tvNav, personNav, moreNav]
export const popupUser = {
  heading: {
    title: 'Thieu Tran',
    link: {
      text: 'View Profile',
      path: '/profile',
    },
  },
  groups: [
    [
      {
        text: 'Discussions',
        path: '/profile',
      },
      {
        text: 'Lists',
        path: '/profile',
      },
      {
        text: 'Ratings',
        path: '/profile',
      },
      {
        text: 'Watchlist',
        path: '/profile',
      },
    ],
    [
      {
        text: 'Edit Profile',
        path: '/profile',
      },
      {
        text: 'Settings',
        path: '/profile',
      },
    ],
    [
      {
        text: 'Logout',
        path: '/profile',
      },
    ],
  ],
}
export const popupAdd = {
  groups: [
    [
      {
        text: 'Add New Movie',
        path: '/profile',
      },
      {
        text: 'Add New TV Show',
        path: '/profile',
      },
    ],
  ],
}
