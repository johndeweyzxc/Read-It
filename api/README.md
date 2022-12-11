## How to run the backend server

1. Create a .env file

```
// Url of the database server
DATABASE_URL=mongodb://localhost:5000/ReadIt

// IP Address that are allowed by cors
ALLOWED_IP="http://192.168.1.2:3000"
ALLOWED_LOCALHOST="http://localhost:3000"

// IP Address of the backend server
SERVER_URL="http://192.168.1.2:4000"
```

2. Run the backend server

```
$ npm start
```
