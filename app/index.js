const choo = require('choo')
const html = require('choo/html')
const css = require('sheetify')
const level = require('level')
const hypercore = require('hypercore')
const swarm = require('hyperdrive-archive-swarm')

const friends = require('./components/friends')
const user = require('./components/user')

const db = level('.aya.db')
const core = hypercore(db)

css('tachyons')
css('./style', {global: true})

const app = choo()
app.model({
  effects: {
    initDb: (data, state, send, done) => {
      db.get('!aya!!user', (_, key) => {
        const newUser = key ? false : true
        const feed = core.createFeed(key)
        const sw = swarm(feed)

        if (!newUser) return feed.open(sendData)
        db.put('!aya!!user', feed.key.toString('hex'), sendData)

        function sendData () {
          const userData = {newUser: newUser, key: feed.key.toString('hex'), feed: feed, swarm: sw}
          if (userData.newUser) return send('user:newUser', userData, done)
          send('user:readFeed', userData, done)
        }
      })
    },
    createFriendFeed: (data, state, send, done) => {
      const feed = core.createFeed(data)
      const sw = swarm(feed)
      db.put('!aya!!friends', data)
      sw.on('connection', function () {
        console.log('swarm connection')
        onConnection()
      })

      function onConnection () {
        // send('', {key:key, feed: feed}, done)
        feed.get(0, function (err, name) {
           feed.createReadStream({live: true, start: feed.blocks - 1})
            .on('data', function (data) {
              // TODO: make this a subscription per friend?
              if (feed.blocks === 1) return done() // Dont add if we dont have a status
              const status = JSON.parse(data.toString())
              send('group:receiveFriend', {
                name: name.toString(),
                message: status.message,
                status: status.status,
                key: feed.key.toString('hex')
              }, done)
            })
        })
      }
    }
  },
  subscriptions: [
    (send, done) => {
      db.createReadStream({
        gte: '!aya!!friends',
        lte: '!aya!!frz' // how to do less than all !aya!!friends?
      }).on('data', data => {
        send('group:addFriend', {key: data.value}, done)
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
