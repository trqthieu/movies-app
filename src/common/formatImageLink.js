const { IMAGE_PATH } = require('src/api/request')

const formatLinkImage = link => {
  if (link) {
    const containHttp = link.includes('https')
    if (containHttp) {
      return link.substring(1)
    }
    return `${IMAGE_PATH}${link}`
  }
  return undefined
}
export default formatLinkImage
