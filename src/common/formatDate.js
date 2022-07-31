const formatDate = date => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  if (date) {
    const formattedDate = date.split('-')
    const day = formattedDate[2].slice(0, 2)
    return `${monthNames[formattedDate[1] - 1]} ${day}, ${formattedDate[0]}`
  }
  return 'Date unavailable'
}
export const getYear = date => {
  if (date) {
    const formattedDate = date.split('-')
    return formattedDate[0] - 0
  }
  return undefined
}
export default formatDate
