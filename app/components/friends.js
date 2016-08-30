const html = require('choo/html')
const statusBox = require('../elements/status-box')

module.exports = (state, prev, send) => {
  return html`
    <div id='friends'>
      <form class='mb2 tc'
        onsubmit=${addFriend}>
        <input class='w6 ph5 pv1'
          type='text' placeholder='Add Friend' id='key'>
      </form>
      <div class='pt1'>
        ${state.group.loading.length ? html`<h3 class='tc f4 gray'>Loading Friends</h3>` : ''}
        ${Object.keys(state.group.friends).map(function (key) {
          const friend = state.group.friends[key]
          return statusBox(friend)
        })}
      </div>
    </div>
  `

  function addFriend (e) {
    const input = e.target.children[0]
    send('group:addFriend', { key: input.value })
    input.value = ''
    e.preventDefault()
  }
}
