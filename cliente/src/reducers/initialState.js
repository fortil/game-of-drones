export default () => ({
  games: {
    loading: false,
    error: null,
    statistics: null,
    currentMatch: {
      users: [
        'rJGCt1e77',
        'S1eMAYJxXm'
      ],
      rounds: [{ winner: 'rJGCt1e77', loser: 'S1eMAYJxXm', winnerHand: 1, loserHand: 2 }],
      id: 'S1eltEgmX'
    },
    list: []
  },
  users: {
    loading: false,
    error: null,
    list: []
  },
  hands: {
    list: [
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
    ],
    loading: false,
    error: null
  }
});
