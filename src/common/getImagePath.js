const { IMAGE_PATH } = require('src/api/request')

const getImagePath = path => {
  return `${IMAGE_PATH}${path}`
}
export default getImagePath
