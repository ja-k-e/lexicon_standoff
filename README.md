# Lexicon Standoff
A real-time party vocabulary game full of deceit and wit.

## Starting a Game
- A player (Host) starts a game on a phone, tablet, or computer.
- Host shares the `gamesecret` with other players, who join the game on their phone, tablet, or computer.
- Once all players are in the lobby, the Host starts the first Round.

## Gameplay
Players are assigned a role of **Agent** or **Impostor** at the beginning of each Round.

> Role Distribution is as close to **2 Agents** to **1 Impostor** as possible

There are four stages of a Round.

### 1. Turns
  - There are two Topics generated for the Round (eg. _Goose_ and _Spider_)
  - On their turn, a Player must say **one** word they associate with both Topics.
    - A good word for _Goose_ and _Spider_ would be _Web_ since geese have webbed feet and spiders make webs.
    - Words cannot be repeated by other players.
  - **Agents** will see **both** Topics. **Impostors** will only see **one**.
  - This round should be completely silent aside from Players saying their word.
  - After every player says their one word, the Host will move the game to the **Reveal** stage.

### 2. Reveal
  - All Players will be see **both** Topics on their device.
  - Players can ask other players why they chose their word.
  - **Agents** are trying to figure out who are **Impostors** and vice versa.
  - You want your team to survive.
  - Everyone is trying to seem confident in their decision.

Players may give any explanation as to why they chose their word. 

> I could say I chose _Wisconsin_ for _Goose and Spider_ because I was attacked by a goose and bitten by a spider during a trip to Wisconsin in 2015, even if that never happened.

This is about trying to figure out who only knew **one** Topic during their turn, not about who chose the best word.


### 3. Vote
  - Every Player votes on their device for who they want to kill. After every Player votes, the Round will progress on its own.

### 4. Results
  - Players with the most votes are killed, even when there is a tie.
  - The Round is over when only **Impostors** remain, only **Agents** remain, or when there is one **Impostor** and one **Agent** left.
  - If the Round is still active
    - **Scoring**: Surviving **Impostors**  receive two points, surviving **Agents** receive one.
    - Players _keep_ their role for the next round so they should not reveal it at this time.
    - Two new Topics are generated and the game will start another **Turns** stage for the survivors.
  - If the Round is over
    - **Scoring**: If one group wins, all Players on that team receive three points. For example, if two of three **Impostors** survive, all three **Impostors** receive three points, if it is a draw, no one receives the extra points.
    - Identities are revealed
    - Game Standings will be displayed
    - The Host can start a new Round which will assign new roles for each Player, or they can end the Game.

**Impostors** will find more success if they say abstract words


# Application
This is a single page static client application.

## Firebase
This app uses a Firebase real-time db to handle all of its backend storage. You'll need a Firebase account and app to make any of this work.

This app uses Google, Facebook, and Twitter Authentication through Firebase. In order to do that, you'll need a Facebook and Twitter app set up properly and have all three methods enabled in Firebase. [Firebase Documentation](https://firebase.google.com/docs/auth/web/start).

Once your Firebase app is set up, add your Firebase initialization settings to `config/firebase-keys.js`.

```js
module.exports = {
  apiKey: 'GET-FROM-FIREBASE',
  authDomain: 'YOUR-APP.firebaseapp.com',
  databaseURL: 'https://YOUR-APP.firebaseio.com',
  projectId: 'YOUR-APP',
  storageBucket: '',
  messagingSenderId: 'GET-FROM-FIREBASE'
};
```

## Development
- `npm install`
- `gulp`
- [localhost:8000](http://localhost:8000)

## Deployment
- `gulp publish`
- Commit `/prod` changes and push to origin
- I am using Netlify to serve the `/prod` directory for free.
