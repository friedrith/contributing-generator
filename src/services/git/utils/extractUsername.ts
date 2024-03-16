const extractUsername = (url: string): string => {
  const username = url.startsWith('https://')
    ? url.split('/')[3]
    : url.split(':')[1].split('/')[0]

  return username
}

export default extractUsername
