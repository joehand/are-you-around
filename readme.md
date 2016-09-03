# Are you around?

Let your friends know if you are around! Publish your status so friends can subscribe. All status updates are sent directly to your friends via peer to peer networks.

The app post updates and subscribes to friends via a [peer-status-feed](https://github.com/joehand/peer-status-feed). So you can join the party outside of just the app!

Want a to see if your app is working but your friends aren't around? Meet [Peer Robot](https://github.com/joehand/peer-robot)! The friend that is always around. Install with `npm install -g peer-robot` and run `peer-robot` for an insta-friend. It will give you a key you can add as a friend.

Development Status: **Very unstable.**

<p>
<img src="https://raw.githubusercontent.com/joehand/are-you-around/master/screenshot.png" align="center" width="300" >
</p>

## Run

* Clone from Github
* `npm install`
* `npm start`
* Profit!

If you receive a version mismatch error in the console, try `npm run rebuild`.

## Development

Built with these awesome tools:

### [Choo](https://github.com/yoshuawuyts/choo) | [Dat](http://dat-data.com) | [Electron](https://github.com/electron/electron) | [Tacyons](http://tachyons.io)

Run `npm run start:dev` to run in development mode and watch file changes.

Status updates are saved in a local level database, `~/.peer-status.db`. If you delete the database your account name & key will be reset.

## TODO

* ~~Make feeds download only~~
* ~~Move database to user root~~
* ~~make a robot to beep boop at friends~~
* Store last status/name of friends in DB. Use <- to show feed offline = friend offline
* Change status to offline on exit
* Nicer UI (thinking two tab panes, one for friends and one user)
* Add dates to status and show last update time
* Make status updates "tweets" and change "subscribe" to "follow".

## License

MIT
