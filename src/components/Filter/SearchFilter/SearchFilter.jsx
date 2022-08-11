import formatNumber from 'src/common/formatNumber'
import './SearchFilter.scss'

function SearchFilter({
  displayType,
  setSelectedType,
  selectedType,
  setCurrentPage,
}) {
  return (
    <div className='search_filter'>
      <h1 className='search_filter_title'>{selectedType.text}</h1>
      <div className='search_filter_list'>
        {displayType.map(item => (
          <div
            key={item.type}
            onClick={() => {
              setSelectedType(item)
              setCurrentPage(1)
            }}
            className={`search_filter_item ${
              item.type === selectedType.type && 'active'
            }`}
          >
            <p>{item.text}</p>
            <span>{formatNumber(item.count)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchFilter
