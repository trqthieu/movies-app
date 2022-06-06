import {
  faAngleDown,
  faAngleRight,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef } from 'react'
import CountriesSelect from '../Select/CountriesSelect/CountriesSelect'
import LanguageSelect from '../Select/LanguageSelect/LanguageSelect'
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
  useEffect(() => {
    const date = new Date()
    const currentDate = date.toISOString().substring(0, 10)
    currentDateRef.current.value = currentDate
  })
  return (
    <div className='filter_wrapper'>
      <div className='type'>
        <div className='type_heading'>
          <p>{filterData.sort.title}</p>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
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
        <div className='type_heading'>
          <p>{filterData.filters.title}</p>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
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
          </div>
          <div className='group'>
            <p className='group_title'>Minimum User Votes</p>
          </div>
          <div className='group'>
            <p className='group_title'>Runtime</p>
          </div>
          <div className='group'>
            <p className='group_title'>Keywords</p>
          </div>
        </div>
      </div>
      <div className='type'>
        <div className='type_heading'>
          <p>{filterData.where.title}</p>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
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
    </div>
  )
}

export default Filter
