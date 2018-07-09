import fetch from './fetch'

describe('Utils FETCH Helper', () => {
  test('Fetch hands', () => {
    expect.assertions(1)
    const expected = [
      {
        name: 'Paper',
        beatTo: 2,
        id: 1
      },
      {
        name: 'Rock',
        beatTo: 3,
        id: 2
      },
      {
        name: 'Scissors',
        beatTo: 1,
        id: 3
      }
    ]
    return fetch('GET', '/hands').then(({ data }) => {
      expect(data).toEqual(expected)
    })
  })
})
