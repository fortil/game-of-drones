import { uniqueArray, getUrl } from './'

const array = [1, 2, 3, 4, 4, 4, 5, 6, 7]
const expected = [1, 2, 3, 4, 5, 6, 7]

describe('Utils Index Helper', () => {
  describe('uniqueArray', () => {
    it('array numbers [1,2,3,4,4,4,5,6,7]', () => {
      expect(uniqueArray(array)).toEqual(expected)
    })
    it('array strings [1,2,3,4,4,4,5,6,7]', () => {
      const arrayString = array.map(i => i.toString())
      const expectedString = expected.map(i => i.toString())
      expect(uniqueArray(arrayString)).toEqual(expectedString)
    })
    it('array objects [{a: 1, b: 2}, {a: 2, b: 3}, {a: 2, b: 3}]', () => {
      const arrayObject = [{ a: 1, b: 2 }, { a: 2, b: 3 }, { a: 2, b: 3 }]
      const expectedObject = [{ a: 1, b: 2 }, { a: 2, b: 3 }]
      expect(uniqueArray(arrayObject)).toEqual(expectedObject)
    })
    it('array objects deep [{ a: 1, b: 1, c: { d: { e: 5 } } }, { a: 1, b: 1, c: { d: { e: 6 } } }, { a: 1, b: 1, c: { d: { e: 5 } } }]', () => {
      const arrayObject = [{ a: 1, b: 1, c: { d: { e: 5 } } }, { a: 1, b: 1, c: { d: { e: 6 } } }, { a: 1, b: 1, c: { d: { e: 5 } } }]
      const expectedObject = [{ a: 1, b: 1, c: { d: { e: 5 } } }, { a: 1, b: 1, c: { d: { e: 6 } } }]
      expect(uniqueArray(arrayObject)).toEqual(expectedObject)
    })
    it('array null', () => {
      const expected = []
      expect(uniqueArray()).toEqual(expected)
    })
    it('array empty []', () => {
      const expected = []
      expect(uniqueArray([])).toEqual(expected)
    })
  })
  describe('getUrl', () => {
    it('getUrl', () => {
      const url = '/Hi this/is a test/'
      const expected = encodeURI(url)
      expect(getUrl(url)).toEqual(expected)
    })
  })

})
