module.exports = {
  namespace: 'user',
  state: {
    message: 'I am around!',
    status: 'offline', // 'busy', 'offline'
    key: null,
    newUser: true,
    loading: true
  },
  reducers: {
    newUser: (data, state) => {
      return {
        loading: false,
        key: data.key,
        newUser: true,
        feed: data.feed,
        swarm: data.swarm
      }
    },
    receiveName: (data, state) => {
      console.log('name', state)
      return { loading: false, newUser: false, name: data }
    },
    receiveFeed: (data, state) => {
      console.log('receive feed', data)
      return {
        loading: false,
        newUser: false,
        name: data.name,
        key: data.key,
        feed: data.feed,
        swarm: data.swarm
      }
    },
    receiveStatus: (data, state) => {
      console.log('receive status', data)
      return { loading: false, status: data.status, message: data.message }
    }
  },
  effects: {
    createNew: (data, state, send, done) => {
      console.log('createNew', data)
      state.feed.append(data.name, () => {
        console.log('done append', state)
        send('user:receiveName', data.name, done)
      })
    },
    readFeed: (data, state, send, done) => {
      console.log('readFeed', data)
      if (data.feed.blocks === 0) return send('user:newUser', data, done)
      data.feed.get(0, (err, name) => {
        if (err) console.error(err)
        data['name'] = name.toString()
        if (data.feed.blocks === 1) return send('user:receiveFeed', data , done)
        send('user:receiveFeed', data, () => {
          data.feed.get(data.feed.blocks - 1, (err, status) => {
            send('user:receiveStatus', JSON.parse(status.toString()), done)
          })
        })
      })
    },
    updateStatus: (data, state, send, done) => {
      state.feed.append(JSON.stringify(data), () => {
        send('user:receiveStatus', data, done)
      })
    }
  }
}