# chisai-node
The Chisai (小さい) Urlshortener rebuild with nodeJS

## Requirements
- node.js (> V 0.12.5)
- rethinkdb (> V 2.0.4)

## Install the Application
1. Get the repository
2. Run `npm install`
3. Make sure RethinkDB is running on the default ports
4. Run `npm start`
5. In your brower, move to `localhost:3000`
6. Have fun
7. Don't use it in an live enviroment ... Bleeding Edge and stuff ;D

## Run Tests
rethinkdb needs to be runnig for the Tests (mainly because we are only testing the Repository Functions...)
At the moment the Application is using the default 'Test' Database provided by RethinkDB...

1. Run `npm test`
2. See a Happy Nyancat
