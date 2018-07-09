const get = require('lodash.get')
const _ = require('lodash')

module.exports.findEquals = (exp, equalTo) => {
  if (!exp || !equalTo) {
    return () => false
  }
  let expIsArray = Array.isArray(exp)
  return match => {
    let isTrue = false
    if (expIsArray) {
      for (let i = 0; i < exp.length; i++) {
        if (_.isEqual(equalTo, get(match, exp[i])) === true) {
          isTrue = true
        }
      }
    } else {
      isTrue = _.isEqual(equalTo, get(match, exp))
    }
    return isTrue
  }
}
