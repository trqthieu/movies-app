import { Slider } from '@mui/material'
import React, { useState } from 'react'
import './RangeSelect.scss'
function RangeSelect(props) {
  const { min, max, step, breakPoints, range, popper } = props
  const sliderProps = { min, max, step }
  const arrayTicks = []
  for (let i = 0; i <= max / step; i++) {
    arrayTicks.push(
      <span
        key={i}
        className={
          breakPoints.includes(i * step) ? 'tick_item break_point' : 'tick_item'
        }
      ></span>
    )
  }

  const minDistance = step
  const [value, setValue] = useState([min, max])
  console.log(value)
  const handleChange = (event, newValue, activeThumb) => {
    console.log('in handle change')
    if (!Array.isArray(newValue)) {
      setValue(newValue)
      return
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance)
        setValue([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setValue([clamped - minDistance, clamped])
      }
    } else {
      setValue(newValue)
    }
  }
  return (
    <div className='range_select'>
      {popper && <p className='range_popper'>{popper(value)}</p>}
      <div className='range_ticks'>{arrayTicks}</div>
      {range ? (
        <Slider
          className='range_slider'
          {...sliderProps}
          value={value}
          onChange={handleChange}
          valueLabelDisplay='off'
          disableSwap
        />
      ) : (
        <Slider
          onChange={handleChange}
          className='range_slider'
          valueLabelDisplay='on'
          {...sliderProps}
        />
      )}

      <div className='range_breakpoint'>
        {breakPoints.map(point => {
          return <span key={point}>{point}</span>
        })}
      </div>
    </div>
  )
}

export default RangeSelect
