const choo = require('choo')
const html = require('choo/html')
const css = require('sheetify')
const PeerStatus = require('peer-status-feed')

const friends = require('./components/friends')
const user = require('./components/user')

const userFeed = PeerStatus()

css('tachyons')
css('./style', {global: true})

const app = choo()
app.model({
  effects: {
    initDb: (data, state, send, done) => {
      userFeed.open(function () {
        send('user:receiveKey', userFeed.key, () => {
          if (!userFeed.status) return send('user:newUser', null, done)

          send('user:receiveName', userFeed.status.name, () => {
            send('user:receiveStatus', userFeed.status, done)
          })
        })
      })
    },
    appendStatus: (data, state, send, done) => {
      data.timestamp = new Date()
      if (!data.name) data.name = state.user.name
      userFeed.appendStatus(data, done)
    },
    addFriendFeed: (data, state, send, done) => {
      userFeed.addPeer(data, done)
    }
  },
  subscriptions: [
    (send, done) => {
      userFeed.on('peer-data', function (data) {
        send('group:friendData', data, done)
      })
    }
  ]
})
app.model(require('./models/user'))
app.model(require('./models/friends'))

const mainView = (state, prev, send) => {
  return html`
    <main
      id='main'
      onload=${() => send('initDb')}
      class=''>
      <header class='tc pt2'>
        <h1 class='f6 gray fw2 ttu tracked'>
          Are You Around?
        </h1>
        <h2 class='f6 ttu tracked'>Welcome ${state.user.name}!</h2>
        <hr class='mw3 bb bw1 b--black-10'>
      </header>
      <section class='mw6 center ph3'>
        <div class='pb3'>
          ${user(state, prev, send)}
        </div>
        <div class='pb3'>
          ${state.user.newUser ? '' : friends(state, prev, send)}
        </div>
      </section>
    </main>
  `
}

app.router((route) => [
  route('/', mainView)
])

const tree = app.start()
document.body.appendChild(tree)
