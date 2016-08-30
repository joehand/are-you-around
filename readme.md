# Are you around?

Let your friends know if you are around! Publish your status so friends can subscribe.

Electron app that uses a [hypercore](https://github.com/mafintosh/hypercore). to manage your status updates. All status updates are sent directly to your friends via peer to peer networks.

Your status updates are saved in a local level database, `.aya.db` (aya = are you around). If you delete the database your account name & key will be reset.

Development Status: **Very unstable.**

<p>
<img src="https://raw.githubusercontent.com/joehand/are-you-around/master/screenshot.png" align="center" width="300" >
</p>

## Run

* Clone from Github
* `npm install`
* `npm run rebuild`
* `npm start`
* Profit!

## Development

Built with these awesome tools:

### [Choo](https://github.com/yoshuawuyts/choo) | [Dat](http://dat-data.com) | [Electron](https://github.com/electron/electron) | [Tacyons](http://tachyons.io)

Run `npm run start:dev` to run in development mode and watch file changes.

## TODO

* Make feeds download only
* Move database to user root
* Store last status/name of friends in DB. Use <- to show feed offline = friend offline
* Change status to offline on exit
* Nicer UI (thinking two tab panes, one for friends and one user)
* Add dates to status and show last update time

## License

MIT
