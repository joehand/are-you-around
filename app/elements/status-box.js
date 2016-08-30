const html = require('choo/html')

module.exports = (person) => {
  const statusColor = (status) => {
    if (status === 'online') return 'bg-green'
    if (status === 'busy') return 'bg-orange'
    if (status === 'offline') return 'bg-white'
  }

  return html`
    <div class='tc pv2 mb2 br3 ba b--silver ${statusColor(person.status)}'>
      <div class='f5 fw6 near-black ttc tracked'>${person.name}</div>
      <div class='f6 mid-gray'>${person.message}</div>
    </div>
  `
}