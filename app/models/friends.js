module.exports = {
  namespace: 'group',
  state: {
    loading: [],
    friends : {
      // hypercorekeyasdlkfj: {
      //   name: 'fred',
      //   message: 'I am around!',
      //   status: 'online'
      // }
    }
  },
  reducers: {
    receiveFriend: (data, state) => {
      const friends = state.friends
      const loading = state.loading
      loading.splice(loading.indexOf(data.key), 1)
      friends[data.key] = { name: data.name, message: data.message, status: data.status }
      return { friends: friends, loading: loading}
    },
    loadingFriend: (data, state) => {
      return { loading: state.loading.concat(data) }
    }
  },
  effects: {
    addFriend: (data, state, send, done) => {
      send('group:loadingFriend', data.key, () => {
        send('createFriendFeed', data.key, done)
      })
    }
  }
}