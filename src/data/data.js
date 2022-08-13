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
    text: 'View Profile',
    path: '/profile',
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
const getMenu = (textList, linkList, title) => {
  return {
    nav: { text: title },
    subnav: textList.map((item, index) => {
      return {
        text: item,
        link: linkList[index],
      }
    }),
  }
}
const overviewDetails = (linkList, isTV) => {
  const textList = isTV
    ? [
        'Main',
        'Alternative Titles',
        'Cast & Crew',
        'Episode Groups',
        'Seasons',
        'Translations',
        'Changes',
        'Report',
        'Edit',
      ]
    : [
        'Main',
        'Alternative Titles',
        'Cast & Crew',
        'Release Dates',
        'Translations',
        'Changes',
      ]
  return getMenu(textList, linkList, 'Overview')
}

const mediaDetails = linkList => {
  const textList = ['Backdrops', 'Logos', 'Posters', 'Videos']
  return getMenu(textList, linkList, 'Media')
}
const fandomDetails = linkList => {
  const textList = ['Discussions', 'Reviews']
  return getMenu(textList, linkList, 'Fandom')
}

const shareDetails = linkList => {
  const textList = ['Share Link', 'Facebook', 'Tweet']
  return getMenu(textList, linkList, 'Share')
}

const overviewPerson = {
  nav: { text: 'Overview' },
  subnav: [
    { text: 'Main', link: '/' },
    { text: 'Translations', link: '/' },
    { text: 'Changes', link: '/' },
    { text: 'Report', link: '/' },
    { text: 'Edit', link: '/' },
  ],
}
const mediaPerson = {
  nav: { text: 'Media' },
  subnav: [{ text: 'Profiles', link: '/' }],
}
const fandomPerson = {
  nav: { text: 'Fandom' },
  subnav: [{ text: 'Discussions', link: '/' }],
}
const sharePerson = {
  nav: { text: 'Share' },
  subnav: [
    { text: 'Share Link', link: '/' },
    { text: 'Facebook', link: '/' },
    { text: 'Tweet', link: '/' },
  ],
}

export const detailsNavList = (overview, media, fandom, share, isTV) => {
  return [
    overviewDetails(overview, isTV),
    mediaDetails(media),
    fandomDetails(fandom),
    shareDetails(share),
  ]
}
export const personNavList = [
  overviewPerson,
  mediaPerson,
  fandomPerson,
  sharePerson,
]
