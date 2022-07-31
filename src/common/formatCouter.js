const formatCounter = (count, unit) => {
  if (count <= 1) {
    return `${count} ${unit}`
  }
  return `${count} ${unit}s`
}
export default formatCounter
