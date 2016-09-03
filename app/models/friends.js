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
      const key = data.key
      const status = data.data
      const friends = state.friends
      const loading = state.loading
      loading.splice(loading.indexOf(key), 1)
      friends[key] = { name: status.name, message: status.message, status: status.status }
      return { friends: friends, loading: loading}
    },
    loadingFriend: (data, state) => {
      return { loading: state.loading.concat(data) }
    }
  },
  effects: {
    addFriend: (data, state, send, done) => {
      send('group:loadingFriend', data.key, () => {
        send('addFriendFeed', data.key, done)
      })
    },
    friendData: (data, state, send, done) => {
      console.log('got friend data', data)
      send('group:receiveFriend', data, done)
    }
  }
}