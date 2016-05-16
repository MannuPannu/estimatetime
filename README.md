Time estimate

Allows (scrum) team members to join a virtual room and vote for time estimations

Uses Angular 2, Nodejs/express with socketio

1. Clone repo
2. npm install
3. npm start
4. Goto http://localhost:8000

*** TODO ***
- Store admin info in session variable

- Add reveal option to server
- Add force reveal button for admin
- Add option to be a voter or skip it as admin

- When there are no members left in a room, destroy it (after a certian time?)
- Add debug flag on server to print console messages
- Add callback to all emits from client to make sure that it succeeds or fails
