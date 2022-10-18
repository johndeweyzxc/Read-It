## How to run the Database

1. Create a mongodb.config to store database configuration

```
## Specify IP address, listens only to localhost and not on LAN.
bind_ip = localhost

## Specify PORT
port = 5000

## Path to which mongodb will store data
dbpath = C:\Specify\your\path\here\MongodData

## Path to the log file
logpath = C:\The\path\to\mongodb\mongod.log

## Append every logs to the file instead of overwriting with new logs
logappend = true
```

2. Run the Database server

```
$ mongod -f mongodb.config
```
