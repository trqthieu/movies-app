import axiosClient from './axios'

const API_KEY = '62952951c7d597d5ecd719dd07582bee'
const requestPaths = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumantaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  searchQuery: `/search/movie?api_key=${API_KEY}`,
}
const request = {
  getSearchResults: async value => {
    const params = {
      query: value,
    }
    const result = await axiosClient.get(requestPaths.searchQuery, { params })
    return result.data.results
  },
}
export default request
