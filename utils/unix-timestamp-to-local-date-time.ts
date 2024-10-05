function unixTimeStampToLocalDateTime(timestamp: number, lang = 'en') {
  const date = new Date(timestamp)

  const month = date.toLocaleDateString(lang, { month: 'short' })

  const year = date.getUTCFullYear()

  const day = date.getUTCDate().toString().padStart(2, '0')

  const hours = date.getUTCHours().toString().padStart(2, '0')

  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  return `${month} ${day} ${year}, ${hours}:${minutes}`
}

export default unixTimeStampToLocalDateTime
