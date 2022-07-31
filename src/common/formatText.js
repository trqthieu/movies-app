const formatText = (text, numberOfLetter) => {
  return text.length <= numberOfLetter
    ? text
    : `${text.slice(0, numberOfLetter)}...`
}
export default formatText
