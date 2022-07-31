function calculateAge(birthday, deathday = Date.now()) {
  const birthdayDate = new Date(birthday)
  const deathdayDate = deathday ? new Date(deathday) : Date.now()
  var ageDifMs = deathdayDate.getTime() - birthdayDate.getTime()
  var ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}
export default calculateAge
