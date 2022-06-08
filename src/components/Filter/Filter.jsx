import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CountriesSelect from '../Select/CountriesSelect/CountriesSelect'
import LanguageSelect from '../Select/LanguageSelect/LanguageSelect'
import RangeSelect from '../Select/RangeSelect/RangeSelect'
import './Filter.scss'
const filterData = {
  sort: {
    title: 'Sort',
    groups: [
      {
        title: 'Sort Results By',
        items: [
          'Popularity Descending',
          'Popularity Ascending',
          'Rating Descending',
          'Rating Ascending',
          'Release Date Descending',
          'Release Date Ascending',
          'Tile (A-Z)',
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
        subItems: ['Stream', 'Free', 'Ads', 'Rent', 'Buy'],
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
      {
        title: 'Genres',
        items: [
          'Action',
          'Adventure',
          'Animation',
          'Comedy',
          'Crime',
          'Documentary',
          'Drama',
          'Family',
          'Fantasy',
          'History',
          'Horror',
          'Music',
          'Mystery',
          'Romance',
          'Science Fiction',
          'TV Movie',
          'Thriller',
          'War',
          'Western',
        ],
      },
    ],
  },
  where: {
    title: 'Where To Watch',
  },
}

function Filter() {
  const currentDateRef = useRef()
  const [typeOpen, setTypeOpen] = useState([])
  useEffect(() => {
    const date = new Date()
    const currentDate = date.toISOString().substring(0, 10)
    currentDateRef.current.value = currentDate
  })
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
            <select name='sort' id='sort'>
              {filterData.sort.groups[0].items.map((item, index) => {
                return (
                  <option key={index} value={index}>
                    {item}
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
            {filterData.filters.groups[0].items.map(item => {
              return (
                <div key={item}>
                  <input type='radio' name='show' id={item} value={item} />
                  <label htmlFor={item}>{item}</label>
                </div>
              )
            })}
          </div>
          <div className='group'>
            <p className='group_title'>{filterData.filters.groups[1].title}</p>
            <input
              className='parent_checkbox'
              type='checkbox'
              name='availabilities'
              id='availabilities'
            />
            <label htmlFor='availabilities'>
              {filterData.filters.groups[1].items[0]}
            </label>
            <div className='sub_checkbox'>
              {filterData.filters.groups[1].subItems.map(item => {
                return (
                  <div key={item}>
                    <input type='checkbox' name={item} id={item} />
                    <label htmlFor={item}>{item}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='group'>
            <p className='group_title'>{filterData.filters.groups[2].title}</p>
            <input
              className='parent_checkbox'
              type='checkbox'
              name='releases'
              id='releases'
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
                <CountriesSelect />
              </div>
              {filterData.filters.groups[2].subItems.map(item => {
                return (
                  <div key={item}>
                    <input type='checkbox' name={item} id={item} />
                    <label htmlFor={item}>{item}</label>
                  </div>
                )
              })}
            </div>
            <div className='release_date'>
              <span>from</span>
              <input type='date' name='release_from' id='release_from' />
            </div>
            <div className='release_date'>
              <span>to</span>
              <input
                ref={currentDateRef}
                type='date'
                name='release_to'
                id='release_to'
              />
            </div>
          </div>
          <div className='group genres'>
            <p className='group_title'>{filterData.filters.groups[3].title}</p>
            {filterData.filters.groups[3].items.map(item => {
              return (
                <div className='genres_item' key={item}>
                  {item}
                </div>
              )
            })}
          </div>
          <div className='group'>
            <p className='group_title'>Certification</p>
          </div>
          <div className='group'>
            <p className='group_title'>Language</p>
            <LanguageSelect />
          </div>
          <div className='group'>
            <p className='group_title'>User Score</p>
            <RangeSelect
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
              min={0}
              max={400}
              step={15}
              breakPoints={[0, 120, 240, 360]}
            />
          </div>
          <div className='group'>
            <p className='group_title'>Keywords</p>
            <input
              type='text'
              className='keywords_input'
              placeholder='Filter by keywords...'
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
            <CountriesSelect />
          </div>
        </div>
      </div>
      <button className='button button_search'>
        <Link to={'#'}>Search</Link>
      </button>
    </div>
  )
}

export default Filter
