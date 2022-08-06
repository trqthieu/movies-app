import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid } from '@mui/material'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import getImagePath from 'src/common/getImagePath'

function ImageDisplay({ imageList, backdrops, logos }) {
  console.log(imageList)
  return (
    <div className='image_list'>
      <Grid container spacing={2}>
        {imageList.map((image, index) => (
          <Grid
            key={index}
            item
            lg={backdrops ? 4 : 3}
            sm={backdrops ? 6 : 4}
            xs={12}
          >
            <div className='image_item'>
              <a
                target='_blank'
                rel='noreferrer'
                href={getImagePath(image.file_path)}
              >
                <div
                  className='image_item_img'
                  style={
                    logos
                      ? {
                          padding: '40px',
                        }
                      : {}
                  }
                >
                  <LazyLoadImage
                    effect='opacity'
                    src={getImagePath(image.file_path)}
                    alt=''
                  />
                </div>
              </a>
              <div className='image_item_info'>
                <h3 className='title'>Info</h3>
                <div className='info_content'>
                  <p>Size</p>
                  <span>
                    {image.width}x{image.height}
                  </span>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default ImageDisplay
