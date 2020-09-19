const mapApiResponse = (response) => {
  const {
    Title: title,
    Year: year,
    Released: released,
    Runtime: runtime
  } = response
  return {
    title,
    year,
    released,
    runtime
  }
}

module.exports = {
  mapApiResponse
}
