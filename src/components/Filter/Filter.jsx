import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import request from 'src/api/request'
import CountriesSelect from '../Form/CountriesSelect/CountriesSelect'
import KeywordInput from '../Form/KeywordInput/KeywordInput'
import LanguageSelect from '../Form/LanguageSelect/LanguageSelect'
import ProvidersSelect from '../Form/ProvidersSelect/ProvidersSelect'
import RangeSelect from '../Form/RangeSelect/RangeSelect'
import './Filter.scss'
const filterData = {
  sort: {
    title: 'Sort',
    groups: [
      {
        title: 'Sort Results By',

        items: [
          {
            label: 'Popularity Descending',
            value: 'popularity.desc',
          },
          {
            label: 'Popularity Ascending',
            value: 'popularity.asc',
          },
          {
            label: 'Rating Descending',
            value: 'vote_average.desc',
          },
          {
            label: 'Rating Ascending',
            value: 'vote_average.asc',
          },
          {
            label: 'Release Date Descending',
            value: 'release_date.desc',
          },
          {
            label: 'Release Date Ascending',
            value: 'release_date.asc',
          },
          {
            label: 'Tile (A-Z)',
            value: 'original_title.asc',
          },
        ],
      },
    ],
  },
  filters: {
    title: 'Filters',
    groups: [
      {
        title: 'Show Me',
        items: ['Everything', "Movies I Haven't seen", 'Movie I Have Seen'],
      },
      {
        title: 'Availabilities',
        items: ['Search all availabilities?'],
        subItems: [
          {
            label: 'Stream',
            value: 'flatrate',
          },
          {
            label: 'Free',
            value: 'free',
          },
          {
            label: 'Ads',
            value: 'ads',
          },
          {
            label: 'Rent',
            value: 'rent',
          },
          {
            label: 'Buy',
            value: 'buy',
          },
        ],
      },
      {
        title: 'Release Dates',
        items: ['Search all releases?'],
        subItems: [
          'Premiere',
          'Theatrical (limited)',
          'Theatrical',
          'Digital',
          'Physical',
          'TV',
        ],
      },
    ],
  },
  where: {
    title: 'Where To Watch',
  },
}

function Filter({
  handleFilterParams,
  handlePage,
  handleFiltering,
  handleMovieList,
}) {
  const [genres, setGenres] = useState([])

  const [sortBy, setSortBy] = useState(filterData.sort.groups[0].items[0].value)
  const [showMe, setShowMe] = useState(0)
  const [monetizationTypes, setMonetizationTypes] = useState([null])
  const [releaseTypes, setReleaseTypes] = useState([null])
  const [region, setRegion] = useState()
  const [releaseDate, setReleaseDate] = useState(() => {
    const date = new Date()
    const currentDate = date.toISOString().substring(0, 10)
    const dates = ['', currentDate]
    return dates
  })
  const [selectedGenres, setSelectedGenres] = useState([])
  const [originalLanguage, setOriginalLanguage] = useState('none')
  const [voteAverage, setVoteAverage] = useState([0, 10])
  const [voteCount, setVoteCount] = useState(0)
  const [runtime, setRuntime] = useState([0, 400])
  const [keyword, setKeyword] = useState([])
  const [watchRegion, setWatchRegion] = useState('none')
  const [providers, setProviders] = useState([])

  const handleFilter = () => {
    const filterParams = {
      sort_by: sortBy,
      show_me: showMe,
      with_watch_monetization_types: monetizationTypes.includes(null)
        ? ''
        : monetizationTypes.join('|'),
      with_release_type: releaseTypes.includes(null)
        ? ''
        : releaseTypes.join('|'),
      certification_country: 'US',
      'release_date.gte': releaseDate[0],
      'release_date.lte': releaseDate[1],
      with_genres: selectedGenres.join(','),
      with_original_language: originalLanguage === 'none' && '',
      'vote_average.gte': voteAverage[0],
      'vote_average.lte': voteAverage[1],
      'vote_count.gte': 0,
      'vote_count.lte': voteCount,
      'with_runtime.gte': runtime[0],
      'with_runtime.lte': runtime[1],
      with_keywords: keyword.map(word => word.id).join('|'),
      with_watch_providers: providers.join('|'),
      region: region,
      watch_region: watchRegion === 'none' && '',
    }
    handleFilterParams(filterParams)
    handlePage(1)
    handleFiltering(true)
    handleMovieList([])
    window.scrollTo(0, 0)
  }

  const handleReleaseDate = (position, value) => {
    const newReleaseDate = [...releaseDate]
    newReleaseDate[position] = value
    setReleaseDate(newReleaseDate)
  }

  const handleSelect = (value, setValue) => {
    setValue(value)
  }
  const handleCheckbox = (value, list, setList) => {
    const index = list.indexOf(value)
    if (index === -1) {
      const newList = [...list, value]
      setList(newList)
      return
    }
    const newList = [...list]
    newList.splice(index, 1)
    setList(newList)
  }
  useEffect(() => {
    setProviders([])
  }, [watchRegion])
  useEffect(() => {
    const getGenres = async () => {
      const result = await request.getGenres()
      setGenres(result.genres)
    }
    getGenres()
  }, [])

  return (
    <div className='filter_wrapper'>
      <div className='type'>
        <label htmlFor='sort_filter'>
          <div className='type_heading'>
            <p>{filterData.sort.title}</p>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </label>
        <input
          hidden
          className='display_type_content'
          type='checkbox'
          name='sort_filter'
          id='sort_filter'
        />
        <div className='type_content'>
          <div className='group'>
            <p className='group_title'>{filterData.sort.groups[0].title}</p>
            <select
              value={sortBy}
              name='sort'
              id='sort'
              onChange={e => handleSelect(e.target.value, setSortBy)}
            >
              {filterData.sort.groups[0].items.map(item => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
      </div>
      <div className='type'>
        <label htmlFor='filters_filters'>
          <div className='type_heading'>
            <p>{filterData.filters.title}</p>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </label>
        <input
          hidden
          className='display_type_content'
          type='checkbox'
          name='filters_filters'
          id='filters_filters'
        />
        <div className='type_content'>
          <div className='group'>
            <p className='group_title'>{filterData.filters.groups[0].title}</p>
            {filterData.filters.groups[0].items.map((item, index) => {
              return (
                <div key={item}>
                  <input
                    onChange={() => handleSelect(index, setShowMe)}
                    type='radio'
                    name='show'
                    id={item}
                    checked={index === showMe}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              )
            })}
          </div>
          <div className='group'>
            <p className='group_title'>{filterData.filters.groups[1].title}</p>
            <input
              value='all_availabilities'
              className='parent_checkbox'
              type='checkbox'
              name='availabilities'
              id='availabilities'
              checked={monetizationTypes.includes(null)}
              onChange={() =>
                handleCheckbox(null, monetizationTypes, setMonetizationTypes)
              }
            />
            <label htmlFor='availabilities'>
              {filterData.filters.groups[1].items[0]}
            </label>
            <div className='sub_checkbox'>
              {filterData.filters.groups[1].subItems.map(item => {
                return (
                  <div key={item.value}>
                    <input
                      type='checkbox'
                      name='availabilities'
                      id={item.value}
                      checked={monetizationTypes.includes(item.value)}
                      onChange={() =>
                        handleCheckbox(
                          item.value,
                          monetizationTypes,
                          setMonetizationTypes
                        )
                      }
                    />
                    <label htmlFor={item.value}>{item.label}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='group'>
            <p className='group_title'>{filterData.filters.groups[2].title}</p>
            <input
              onChange={() =>
                handleCheckbox(null, releaseTypes, setReleaseTypes)
              }
              className='parent_checkbox'
              type='checkbox'
              name='releases'
              id='releases'
              checked={releaseTypes.includes(null)}
            />
            <label htmlFor='releases'>
              {filterData.filters.groups[2].items[0]}
            </label>
            <div className='sub_checkbox'>
              <input
                className='parent_checkbox'
                type='checkbox'
                name='countries'
                id='countries'
              />
              <label htmlFor='countries'>Search all countries</label>
              <div className='sub_checkbox'>
                <CountriesSelect
                  selectedValue={region}
                  handleSelect={setRegion}
                />
              </div>
              {filterData.filters.groups[2].subItems.map((item, index) => {
                return (
                  <div key={item}>
                    <input
                      onChange={() =>
                        handleCheckbox(index + 1, releaseTypes, setReleaseTypes)
                      }
                      value={index + 1}
                      checked={releaseTypes.includes(index + 1)}
                      type='checkbox'
                      name={item}
                      id={item}
                    />
                    <label htmlFor={item}>{item}</label>
                  </div>
                )
              })}
            </div>
            <div className='release_date'>
              <span>from</span>
              <input
                value={releaseDate[0]}
                type='date'
                name='release_date.gte'
                id='release_date.gte'
                onChange={e => handleReleaseDate(0, e.target.value)}
              />
            </div>
            <div className='release_date'>
              <span>to</span>
              <input
                onChange={e => handleReleaseDate(1, e.target.value)}
                value={releaseDate[1]}
                type='date'
                name='release_date.lte'
                id='release_date.lte'
              />
            </div>
          </div>
          <div className='group genres'>
            <p className='group_title'>Genres</p>
            {genres.map(item => {
              return (
                <div
                  onClick={() =>
                    handleCheckbox(item.id, selectedGenres, setSelectedGenres)
                  }
                  className={
                    selectedGenres.includes(item.id)
                      ? 'genres_item active'
                      : 'genres_item'
                  }
                  key={item.id}
                >
                  {item.name}
                </div>
              )
            })}
          </div>
          <div className='group'>
            <p className='group_title'>Certification</p>
          </div>
          <div className='group'>
            <p className='group_title'>Language</p>
            <LanguageSelect
              selectedLanguage={originalLanguage}
              handleLanguage={setOriginalLanguage}
            />
          </div>
          <div className='group'>
            <p className='group_title'>User Score</p>
            <RangeSelect
              handleRange={setVoteAverage}
              selectedRange={voteAverage}
              popper={value => `Rated ${value[0]} - ${value[1]}`}
              range
              min={0}
              max={10}
              step={1}
              breakPoints={[0, 5, 10]}
            />
          </div>
          <div className='group'>
            <p className='group_title'>Minimum User Votes</p>
            <RangeSelect
              handleRange={setVoteCount}
              selectedRange={voteCount}
              min={0}
              max={500}
              step={50}
              breakPoints={[0, 100, 200, 300, 400, 500]}
            />
          </div>
          <div className='group'>
            <p className='group_title'>Runtime</p>
            <RangeSelect
              popper={value => {
                return `${value[0]} minutes - ${value[1]} minutes`
              }}
              range
              selectedRange={runtime}
              handleRange={setRuntime}
              min={0}
              max={400}
              step={15}
              breakPoints={[0, 120, 240, 360]}
            />
          </div>
          <div className='group'>
            <p className='group_title'>Keywords</p>
            <KeywordInput
              selectedKeyword={keyword}
              handleKeyword={setKeyword}
            />
          </div>
        </div>
      </div>
      <div className='type'>
        <label htmlFor='where_filter'>
          <div className='type_heading'>
            <p>{filterData.where.title}</p>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </label>
        <input
          className='display_type_content'
          type='checkbox'
          name='where_filter'
          id='where_filter'
          hidden
        />
        <div className='type_content'>
          <div className='group'>
            <p className='group_title'>My Services</p>
            <div className='select_item'>
              <input type='checkbox' name='services' id='services' />
              <label htmlFor='services'>
                Restrict searches to my subscribed services?
              </label>
            </div>
          </div>
          <div className='group'>
            <p className='group_title'>Country</p>
            <CountriesSelect
              selectedValue={watchRegion}
              handleSelect={setWatchRegion}
            />
            <ProvidersSelect
              selectedRegion={watchRegion}
              selectedProvider={providers}
              handleProvider={setProviders}
            />
          </div>
        </div>
      </div>
      <button onClick={handleFilter} className='button button_search'>
        <Link to={'#'}>Search</Link>
      </button>
    </div>
  )
}

export default Filter
