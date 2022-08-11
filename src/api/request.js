import mainAxiosClient, { imageAxiosClient } from './axios'

const API_KEY = '62952951c7d597d5ecd719dd07582bee'
export const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'
const requestPaths = {
  keywordSearchQuery: `/search/keyword?api_key=${API_KEY}`,
  movieSearchQuery: `/search/movie?api_key=${API_KEY}`,
  languagesQuery: `/configuration/languages?api_key=${API_KEY}`,
  countriesQuery: `/configuration/countries?api_key=${API_KEY}`,
  genresQuery: `/genre/movie/list?api_key=${API_KEY}`,
  moviesPlaying: `/movie/now_playing?api_key=${API_KEY}`,
  moviesUpcoming: `/movie/upcoming?api_key=${API_KEY}`,
  tvAiringToday: `/tv/airing_today?api_key=${API_KEY}`,
  tvOnTheAir: `/tv/on_the_air?api_key=${API_KEY}`,
  popularPeople: `/person/popular?api_key=${API_KEY}`,
}
const request = {
  getImage: async path => {
    const result = imageAxiosClient.get(path)
    return result
  },
  getSearchResults: async (type, query, page = 1) => {
    const params = {
      query,
      page,
    }
    const result = await mainAxiosClient.get(
      `/search/${type}?api_key=${API_KEY}`,
      {
        params,
      }
    )
    return result.data
  },
  getSearchKeywords: async value => {
    const params = {
      query: value,
    }
    const result = await mainAxiosClient.get(requestPaths.keywordSearchQuery, {
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
    const result = await mainAxiosClient.get(requestPaths.movieSearchQuery, {
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
  getMoviesPlaying: async (page = 1) => {
    const params = { page }
    const result = await mainAxiosClient.get(requestPaths.moviesPlaying, {
      params,
    })
    return result.data.results
  },
  getMoviesUpcoming: async (page = 1) => {
    const params = { page }
    const result = await mainAxiosClient.get(requestPaths.moviesUpcoming, {
      params,
    })
    return result.data.results
  },
  getTopRated: async (type, page = 1) => {
    const params = { page }
    const result = await mainAxiosClient.get(
      `/${type}/top_rated?api_key=${API_KEY}`,
      {
        params,
      }
    )
    return result.data.results
  },
  getTVAiringToday: async (page = 1) => {
    const params = { page }
    const result = await mainAxiosClient.get(requestPaths.tvAiringToday, {
      params,
    })
    return result.data.results
  },
  getTVOnTheAir: async (page = 1) => {
    const params = { page }
    const result = await mainAxiosClient.get(requestPaths.tvOnTheAir, {
      params,
    })
    return result.data.results
  },
  getTrending: async type => {
    const result = await mainAxiosClient.get(
      `/trending/all/${type}?api_key=${API_KEY}`
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
  getImages: async (type, id) => {
    const result = await mainAxiosClient.get(
      `/${type}/${id}/images?api_key=${API_KEY}`
    )
    return result.data
  },
  getTrailer: async type => {
    const result = await mainAxiosClient.get(
      `/discover/${type}?api_key=${API_KEY}`
    )
    return result.data.results
  },
  getDiscover: async (type, params = {}) => {
    const result = await mainAxiosClient.get(
      `/discover/${type}?api_key=${API_KEY}`,
      { params }
    )
    return result.data
  },

  getGenres: async () => {
    const result = await mainAxiosClient.get(requestPaths.genresQuery)
    return result.data
  },
  getCredits: async (type, id) => {
    const result = await mainAxiosClient.get(
      `/${type}/${id}/credits?api_key=${API_KEY}&append_to_response=credits`
    )
    return result.data
  },
  getCreditDetails: async creditId => {
    const result = await mainAxiosClient.get(
      `/credit/${creditId}?api_key=${API_KEY}`
    )
    return result.data
  },
  getReviews: async (type, id) => {
    const result = await mainAxiosClient.get(
      `/${type}/${id}/reviews?api_key=${API_KEY}`
    )
    return result.data
  },

  getRecommendations: async (type, id) => {
    const result = await mainAxiosClient.get(
      `/${type}/${id}/recommendations?api_key=${API_KEY}`
    )
    return result.data
  },
  getKeywords: async (type, id) => {
    const result = await mainAxiosClient.get(
      `/${type}/${id}/keywords?api_key=${API_KEY}`
    )
    return result.data.results || result.data.keywords
  },
  getExternalIDs: async (type, id) => {
    const result = await mainAxiosClient.get(
      `/${type}/${id}/external_ids?api_key=${API_KEY}`
    )
    return result.data
  },
  getProviders: async (type, region) => {
    const params = {
      watch_region: region,
    }
    const result = await mainAxiosClient.get(
      `/watch/providers/${type}?api_key=${API_KEY}`,
      {
        params,
      }
    )
    return result.data.results
  },
  getPopularPeople: async (page = 1) => {
    const params = { page }
    const result = await mainAxiosClient.get(requestPaths.popularPeople, {
      params,
    })
    return result.data
  },
  getPersonDetails: async id => {
    const result = await mainAxiosClient.get(`/person/${id}?api_key=${API_KEY}`)
    return result.data
  },
  getPersonCredits: async id => {
    const result = await mainAxiosClient.get(
      `/person/${id}/combined_credits?api_key=${API_KEY}`
    )
    return result.data
  },
  getMovieCredits: async id => {
    const result = await mainAxiosClient.get(
      `/person/${id}/movie_credits?api_key=${API_KEY}`
    )
    return result.data
  },
  getTVCredits: async id => {
    const result = await mainAxiosClient.get(
      `/person/${id}/tv_credits?api_key=${API_KEY}`
    )
    return result.data
  },
  getTVSeasonsDetails: async (id, seasonNumber) => {
    const result = await mainAxiosClient.get(
      `/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}`
    )
    return result.data
  },
  getNetworkDetails: async networkId => {
    const result = await mainAxiosClient.get(
      `network/${networkId}?api_key=${API_KEY}`
    )
    return result.data
  },
  getKeywordDetails: async keywordId => {
    const result = await mainAxiosClient.get(
      `keyword/${keywordId}?api_key=${API_KEY}`
    )
    return result.data
  },
}
export default request
