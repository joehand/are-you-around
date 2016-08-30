const html = require('choo/html')

module.exports = (state, prev, send) => {
  return html`
    <div class='tc b--solid b--black-40 pa3 bw2 br3'>
      <h4 class='f4 ma2 black-70 ttu pv1'>
        Create Account
      </h4>
      <form class='pv2' onsubmit=${onSubmit}>
        <input class='bb b--light-gray' type='text' placeholder='Your Name' id='name'>
      </form>
    </div>
  `
  function onSubmit (e) {
    const input = e.target.children[0]
    send('user:createNew', { name: input.value })
    input.value = ''
    e.preventDefault()
  }
}
