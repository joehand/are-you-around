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
      console.log('receiveFriend', data)
      const friends = state.friends
      const loading = state.loading
      loading.splice(loading.indexOf(data.key), 1)
      friends[data.key] = { name: data.name, message: data.message, status: data.status }
      console.log('new friends', friends)
      return { friends: friends, loading: loading}
    },
    loadingFriend: (data, state) => {
      return { loading: state.loading.concat(data) }
    }
  },
  effects: {
    addFriend: (data, state, send, done) => {
      console.log('adding friend', data)
      send('group:loadingFriend', data.key, () => {
        send('createFriendFeed', data.key, done)
      })
    }
  }
}