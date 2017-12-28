# Lexicon Standoff
A real-time party vocabulary game full of deceit and wit.

## Starting a Game
- A player (Host) starts a game on a phone, tablet, or computer.
- Host shares the `gamesecret` with other players, who join the game on their phone, tablet, or computer.
- Once all players are in the lobby, the Host starts the first Round.

## Gameplay
Players are assigned a role of **Agent** or **Imposter** at the beginning of each Round.

> Role Distribution is as close to **2 Agents** to **1 Imposter** as possible

A Round is split into four stages:

  1. [**Turns**](#1-turns)
    - Living Players take turns saying a word
  1. [**Reveal**](#2-reveal)
    - Topics are revealed to all players
  1. [**Actions**](#3-actions)
    - Alive Players vote who to kill, dead Players select a Player to confuse
  1. [**Results**](#4-results)
    - Players are killed, scores are displayed

### 1. Turns
  - There are two Topics generated for the Round (eg. “Goose” & “Spider”)
  - **Agents** will only see the two Topics on their turn. **Imposters** will see both _in addition to_ two extras. They will not know which are the real Topics and which are fake.
    - **Agents** will see “Goose” & “Spider”
    - **Imposters** will see “Goose”, “Mountain”, “Spider”, “Computer”
    - After the first Round, Players may also be _confused_, in which case they will have an extra Topic.
  - On an alive Player's turn, they must say **one** word they associate with both Topics.
    - A good word for “Goose” & “Spider” would be “Web” since geese have webbed feet and spiders make webs.
    - Another good word would be “Phobia” since [Arachnophobia](https://en.wikipedia.org/wiki/Arachnophobia) and [Anatidaephobia](www.fearof.net/fear-of-ducks-phobia-anatidaephobia/) exist.
    - Words cannot be repeated by other players.
  - Strategy
    - **Agents** want to be discreet in their selection so as not to make it obvious to the **Imposters** what the two Topics are, but also specific enough so that fellow **Agents** will trust them.
    - **Imposters** will try and figure out which two Topics are the real Topics based on how **Agents** answer the question, but also be abstract enough with their selection so that they can defend their choice when the Topics are revealed. 
  - This round should be completely silent aside from Players saying their word.
  - After every player says their one word, the Host will move the game to the **Reveal** stage.

### 2. Reveal
  - All Players will be see the real two Topics on their device.
  - Players can ask other players why they chose their word.
  - **Agents** are trying to figure out who are **Imposters** and vice versa.
  - You want your team to survive.
  - Everyone is trying to appear confident in their decision and find their teammates.
  - Players that were confused may explain their selection relative to the extra word they were presented.

Players may give any explanation as to why they chose their word, even if it is a lie.

> I chose _Wisconsin_ for _Goose & Spider_ because I saw someone attacked by geese and bitten by a spider during a trip to Wisconsin in 2015.

This is about trying to figure out who is on your team, not about who chose the best word.


### 3. Actions
  - Every living Player votes on their device for who they want to kill.
  - Every dead Player selects a Player to confuse. The next Round, that Player will have an extra fake Topic.
    - On the last Round, dead Players are also voting to kill a Player with everyone else.
  - After every Player submits their action, the Round will progress on its own.

### 4. Results
  - Players receiving the most votes are killed, even when there is a tie.
  - The Round is over when 
    - **Imposters** win (only **Imposters** remain)
    - **Agents** win (only **Agents** remain)
    - Everyone dies
  - If the Round is still active
    - **Scoring** 
      - Surviving **Imposters**  receive two points
      - Surviving **Agents** receive one point
    - Players _keep_ their role for the next round so they should not reveal it at this time.
    - Two new Topics are generated and the game will start another **Turns** stage for the survivors.
    - The next alive Player clockwise of the Host goes first. Rotate this first turn every Round.
  - If the Round is over
    - **Scoring**
      - Surviving **Imposters**  receive two points
      - Surviving **Agents** receive one point
      - If one group wins, all Players on that team receive three points. For example:
        - If two of three **Agents** survive, all three **Agents** receive three additional points
        - If two of three **Imposters** survive, all three **Imposters** receive three additional points
      - If everyone dies, no one receives the extra points.
    - **Imposters** are revealed at this time.
    - Game Standings will be displayed
    - The Host can start a new Round which will assign new roles for each Player, or they can end the Game.


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
