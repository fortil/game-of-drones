export const uniqueArray = (a = []) => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))

export const getUrl = url => encodeURI(url)
