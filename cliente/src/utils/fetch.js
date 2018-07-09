import fetch from 'cross-fetch'
import 'cross-fetch/polyfill'
import { getUrl } from './index'

const home = `${process.env.SERVER_URL || 'http://localhost:8080'}/api/v1`

export default (method, path, data) => {
  let body = undefined
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (method.toLowerCase() === 'post') {
    body = JSON.stringify(data)
    headers['Content-Length'] = JSON.stringify(data).length.toString()
  }
  const object = {
    method,
    headers,
    mode: 'cors',
    body,
    cache: 'default'
  }

  return fetch(`${home}${getUrl(path)}`, object)
    .then(res => {
      if (res.status >= 400) {
        throw new Error(res.statusText || 'Bad response from server')
      }
      return res.json()
    })
}
