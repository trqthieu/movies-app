import { useEffect } from 'react'
import './MediaFilter.scss'

function MediaFilter({
  isVideos,
  active,
  setActive,
  mediaList,
  filterDisplay,
  mediaType,
}) {
  useEffect(() => {
    setActive(filterDisplay[0])
  }, [filterDisplay, setActive])
  return (
    <div className='media_filter'>
      <h1 className='media_filter_title'>{mediaType}</h1>
      <div className='media_filter_list'>
        {filterDisplay.map((filter, index) => (
          <div
            onClick={() => setActive(filter)}
            key={index}
            className={`media_filter_item ${active === filter && 'active'}`}
          >
            <p>{filter.english_name || filter}</p>
            <span>
              {isVideos
                ? mediaList.filter(media => media.type === filterDisplay[index])
                    .length
                : mediaList.filter(
                    media => media.iso_639_1 === filterDisplay[index].iso_639_1
                  ).length}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MediaFilter
