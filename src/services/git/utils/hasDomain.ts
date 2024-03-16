const hasDomain = (domain: string, url: string) =>
  url.startsWith(`git@${domain}`) || url.startsWith(`https://${domain}`)

export default hasDomain
