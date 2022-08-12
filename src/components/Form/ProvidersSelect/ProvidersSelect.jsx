import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import request, { IMAGE_PATH } from 'src/api/request'
import './ProvidersSelect.scss'
function ProvidersSelect({ selectedRegion, selectedProvider, handleProvider }) {
  const [providerList, setProviderList] = useState([])
  const handleProviders = id => {
    const newProviders = [...selectedProvider]
    const index = newProviders.indexOf(id)
    if (index === -1) {
      newProviders.push(id)
    } else newProviders.splice(index, 1)
    handleProvider(newProviders)
  }
  useEffect(() => {
    const getProviders = async (type, region) => {
      const result = await request.getProviders(type, region)
      setProviderList(result)
    }
    getProviders('movie', selectedRegion)
  }, [selectedRegion])
  return (
    <div className='providers'>
      {providerList.map(provider => {
        return (
          <Tippy
            delay={[0, 0]}
            key={provider.provider_id}
            content={provider.provider_name}
          >
            <div
              onClick={() => handleProviders(provider.provider_id)}
              className='provider_item'
            >
              <LazyLoadImage
                effect='opacity'
                src={`${IMAGE_PATH}${provider.logo_path}`}
                alt=''
              />
              {selectedProvider.includes(provider.provider_id) && (
                <div className='provider_item_overlay'>
                  <FontAwesomeIcon className='icon' icon={faCheck} />
                </div>
              )}
            </div>
          </Tippy>
        )
      })}
    </div>
  )
}

export default ProvidersSelect
