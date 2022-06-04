import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import request from 'src/api/request'
import Card from '../Card/Card'
import './RowContent.scss'
function RowContent({ popular, trending }) {
  let title = "What's popular"
  let type = ['tv', 'movie']
  let selectType = ['On TV', 'In Theaters']
  if (trending) {
    title = 'Trending'
    type = ['day', 'week']
    selectType = ['Today', 'This Week']
  }
  const [activeType, setActiveType] = useState(type[0])
  const [listCard, setListCard] = useState([])
  console.log(activeType)
  const getPopular = async type => {
    const result = await request.getPopular(type)
    console.log(result)
    setListCard(result)
  }
  const getTrending = async type => {
    const result = await request.getTrending(type)
    console.log(result)
    setListCard(result)
  }
  useEffect(() => {
    if (popular) {
      getPopular(activeType)
    } else if (trending) {
      getTrending(activeType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType])
  return (
    <div className='row_content'>
      <Container>
        <div className='row_heading'>
          <h4 className='row_title'>{title}</h4>
          <div className='row_select'>
            <span
              onClick={() => setActiveType(type[0])}
              className={activeType === type[0] ? 'select_active' : ''}
            >
              {selectType[0]}
            </span>
            <span
              onClick={() => setActiveType(type[1])}
              className={activeType === type[1] ? 'select_active' : ''}
            >
              {selectType[1]}
            </span>
          </div>
        </div>
        <div className='row_card'>
          {listCard.map(cardItem => {
            return (
              <div key={cardItem.id} className='card_item'>
                <Card data={cardItem} />
              </div>
            )
          })}
        </div>
      </Container>
    </div>
  )
}

export default RowContent
