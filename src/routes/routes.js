import Home from 'src/pages/Home/Home.jsx'
import Movie from 'src/pages/Movie/Movie.jsx'
import Tv from 'src/pages/Tv/Tv.jsx'
import Person from 'src/pages/Person/Person.jsx'

export const routesConfig = {
  home: '/',
  movie: '/movie',
  tv: '/tv',
  person: '/person',
}
const routesPath = [
  {
    path: routesConfig.home,
    element: <Home />,
  },
  {
    path: routesConfig.movie,
    element: <Movie />,
  },
  {
    path: routesConfig.tv,
    element: <Tv />,
  },
  {
    path: routesConfig.person,
    element: <Person />,
  },
]
export default routesPath
