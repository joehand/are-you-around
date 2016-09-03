module.exports = {
  namespace: 'user',
  state: {
    message: 'I am around!',
    status: 'offline', // 'busy', 'offline'
    name: null,
    key: null,
    newUser: true,
    loading: true
  },
  reducers: {
    newUser: (data, state) => {
      return {
        loading: false,
        newUser: true
      }
    },
    receiveKey: (data, state) => {
      return {key: data}
    },
    receiveName: (data, state) => {
      return { loading: false, newUser: false, name: data }
    },
    receiveStatus: (data, state) => {
      return { loading: false, status: data.status, message: data.message }
    }
  },
  effects: {
    createNew: (data, state, send, done) => {
      send('user:receiveName', data.name, () => {
        // put new users online
        send('user:updateStatus', {
          name: data.name,
          status: 'online',
          message: state.message
        }, done)
      })
    },
    updateStatus: (data, state, send, done) => {
      send('appendStatus', data, () => {
        send('user:receiveStatus', data, done)
      })
    }
  }
}