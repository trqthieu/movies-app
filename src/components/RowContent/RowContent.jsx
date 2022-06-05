import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import request from 'src/api/request'
import Trailer from 'src/components/Trailer/Trailer'
import Card from '../Card/Card'
import './RowContent.scss'
function RowContent({ popular, trending, trailer }) {
  let title = "What's popular"
  let type = ['tv', 'movie']
  let selectType = ['On TV', 'In Theaters']
  if (trending) {
    title = 'Trending'
    type = ['day', 'week']
    selectType = ['Today', 'This Week']
  } else if (trailer) {
    title = 'Latest Trailers'
  }
  const [activeType, setActiveType] = useState(type[0])
  const [listCard, setListCard] = useState([])
  const [background, setBackground] = useState(
    '/fgYfch0MGfNEpgzPst49ThKUqA4.jpg'
  )

  const activeClass = trailer ? 'trailer_active' : 'select_active'
  const TRAILER_STYLES = {
    backgroundImage: `
    linear-gradient(
        to right,
        rgba(3, 37, 65, 0.75) 0%,
        rgba(3, 37, 65, 0.75) 100%
      ),
    url(https://image.tmdb.org/t/p/original${background})`,
  }

  const getPopular = async type => {
    const result = await request.getPopular(type)
    setListCard(result)
  }
  const getTrending = async type => {
    const result = await request.getTrending(type)
    setListCard(result)
  }
  const getTrailer = async type => {
    const result = await request.getTrailer(type)
    setListCard(result)
    setBackground(result[0].backdrop_path)
  }

  useEffect(() => {
    if (popular) {
      getPopular(activeType)
    } else if (trending) {
      getTrending(activeType)
    } else if (trailer) {
      getTrailer(activeType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType])
  return (
    <div
      style={trailer ? TRAILER_STYLES : {}}
      className={!trailer ? `row_content` : `row_content row_trailer`}
    >
      <Container>
        <div className='row_heading'>
          <h4 className='row_title'>{title}</h4>
          <div
            className={!trailer ? `row_select` : `row_select trailer_select`}
          >
            <span
              onClick={() => setActiveType(type[0])}
              className={activeType === type[0] ? activeClass : ''}
            >
              {selectType[0]}
            </span>
            <span
              onClick={() => setActiveType(type[1])}
              className={activeType === type[1] ? activeClass : ''}
            >
              {selectType[1]}
            </span>
          </div>
        </div>
        <div className='row_card'>
          {listCard.map(cardItem => {
            return (
              <div key={cardItem.id} className='card_item'>
                {trailer ? (
                  cardItem.backdrop_path && (
                    <Trailer
                      type={activeType}
                      handleBackground={setBackground}
                      data={cardItem}
                    />
                  )
                ) : (
                  <Card data={cardItem} />
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </div>
  )
}

export default RowContent
