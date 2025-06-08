export function formatMediaDuration(seconds: number) {
  if (isNaN(seconds)) return '0:00'

  const totalSeconds = Math.floor(Math.max(0, seconds))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const secs = totalSeconds % 60

  const formattedSecs = secs.toString().padStart(2, '0')

  if (hours > 0) {
    const formattedMins = minutes.toString().padStart(2, '0')
    return `${hours}:${formattedMins}:${formattedSecs}`
  } else {
    return `${minutes}:${formattedSecs}`
  }
}
