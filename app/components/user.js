const html = require('choo/html')
const newUser = require('./new-user')
const statusBox = require('../elements/status-box')

module.exports = (state, prev, send) => {
  console.log('component/user', state)
  if (state.user.loading) return '' // TODO: loading screen
  return html`
    <div id='user'>
      ${state.user.newUser ? newUser(state, prev, send) : user()}
    </div>
  `

  function user () {
    return html`
      <div>
        ${statusBox(state.user)}
        <form
          id='form-status'
          class='pa3 tc' onsubmit=${onSubmit}>
          <fieldset class='center tc'>
            <legend>Status</legend>
            ${['online', 'busy', 'offline'].map((status) => {
              return html`
                <label class='ph2'>
                  <input
                    class='mr2'
                    onclick=${() => send('user:updateStatus', { status:status, message: state.user.message })}
                    type='radio' name='status' value='online'
                    ${state.user.status === status ? 'checked' : ''}/>${status}
                </label>
              `
            })}
          </fieldset>
          <input
            class='mt3 ph3 pv1'
            type="text"
            placeholder='Status Message'/>
        </form>
        <h6 class='mt2 tc ttu'>Share Your Status: <small><pre>${state.user.key}</pre></small></h6>
        <hr class='mw6 bb b--black-60'>
      </div>
    `

    function onSubmit (e) {
      const input = e.target.children[1]
      console.log('here', e.target.children)
      send('user:updateStatus', { message: input.value, status: state.user.status })
      e.preventDefault()
    }
  }
}