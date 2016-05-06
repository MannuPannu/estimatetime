Time estimate

Allows (scrum) team members to join a virtual room and vote for time estimations

Uses Angular 2, Nodejs/express with socketio

1. Clone repo
2. npm install
3. npm start
4. Goto http://localhost:8000

*** TODO ***
- Add an admin role to the user creating the room
- When there are no members left in a room, destroy it
- Output the role "voter/admin" on client
- Emit events when members votes on times
- Make sure to handle the case when a user directly types in /room/# in url,
  it should look up if room exists, otherwise send you to lobby
- Add debug flag on server
