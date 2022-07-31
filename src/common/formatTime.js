const formatTime = time => {
  const hours = Math.floor(time / 60)
  const minutes = time % 60
  const hoursStr = hours > 0 ? `${hours}h` : ''
  const minutesStr = minutes > 0 ? `${minutes}m` : ''

  return `${hoursStr} ${minutesStr}`
}

export default formatTime
