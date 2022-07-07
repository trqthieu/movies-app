import { Slider } from '@mui/material'
import React from 'react'
import './RangeSelect.scss'
function RangeSelect(props) {
  const { min, max, step, breakPoints, range, popper } = props
  const { selectedRange, handleRange } = props
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

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      handleRange(newValue)
      return
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance)
        handleRange([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        handleRange([clamped - minDistance, clamped])
      }
    } else {
      handleRange(newValue)
    }
  }
  return (
    <div className='range_select'>
      {popper && <p className='range_popper'>{popper(selectedRange)}</p>}
      <div className='range_ticks'>{arrayTicks}</div>
      <Slider
        className='range_slider'
        {...sliderProps}
        value={selectedRange}
        onChange={handleChange}
        valueLabelDisplay={range ? 'off' : 'on'}
        disableSwap
      />

      <div className='range_breakpoint'>
        {breakPoints.map(point => {
          return <span key={point}>{point}</span>
        })}
      </div>
    </div>
  )
}

export default RangeSelect
