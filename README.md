# express-sqlite-react

## Demo
[Client](https://denis-react-appco.herokuapp.com/) 

[Server](https://murmuring-lake-79455.herokuapp.com/) 

## Quick Start
``` bash
# Install dependencies for server
cd .\server
npm install
npm start

# Install dependencies for client
cd .\client
npm install
npm start

# Server runs on http://localhost:3001 and client on http://localhost:3000
```

## Api Routes
``` bash
http://localhost:3001/api/users?page=1&limit=10
# page,limit -> optional

http://localhost:3001/api/user?id=1&from=2021-04-19&to=2021-05-20
# id -> required
# from,to -> optional
```
