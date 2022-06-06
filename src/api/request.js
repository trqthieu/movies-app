import mainAxiosClient, { imageAxiosClient } from './axios'

const API_KEY = '62952951c7d597d5ecd719dd07582bee'
const requestPaths = {
  multiSearchQuery: `/search/multi?api_key=${API_KEY}`,
  moviesSearchQuery: `/search/movie?api_key=${API_KEY}`,
  languagesQuery: `/configuration/languages?api_key=${API_KEY}`,
  countriesQuery: `/configuration/countries?api_key=${API_KEY}`,
}
const request = {
  getImage: async path => {
    const result = imageAxiosClient.get(path)
    return result
  },
  getSearchResults: async value => {
    const params = {
      query: value,
    }
    const result = await mainAxiosClient.get(requestPaths.multiSearchQuery, {
      params,
    })
    return result.data.results
  },
  getCountryResults: async () => {
    const result = await mainAxiosClient.get(requestPaths.countriesQuery)
    return result.data
  },
  getMovies: async (name, page = 1) => {
    const params = {
      query: name,
      page,
    }
    const result = await mainAxiosClient.get(requestPaths.moviesSearchQuery, {
      params,
    })
    return result.data
  },
  getLanguages: async () => {
    const result = await mainAxiosClient.get(requestPaths.languagesQuery)
    return result.data
  },
  getPopular: async (type, page = 1) => {
    const params = { page }
    const result = await mainAxiosClient.get(
      `/${type}/popular?api_key=${API_KEY}`,
      {
        params,
      }
    )
    return result.data.results
  },
  getTrending: async type => {
    const result = await mainAxiosClient.get(
      `/trending/all/${type}?api_key=${API_KEY}`
    )
    return result.data.results
  },
  getTrailer: async type => {
    const result = await mainAxiosClient.get(
      `/discover/${type}?api_key=${API_KEY}`
    )
    return result.data.results
  },
  getDetails: async (type, id) => {
    const result = await mainAxiosClient.get(
      `/${type}/${id}?api_key=${API_KEY}`
    )
    return result.data
  },
  getVideos: async (type, id) => {
    const result = await mainAxiosClient.get(
      `/${type}/${id}/videos?api_key=${API_KEY}`
    )
    return result.data
  },
}
export default request
