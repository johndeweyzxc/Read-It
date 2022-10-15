## How to run the Database

To run the database simply do "mongod -f mongod.config". The mongod.config file is the configuration for the mongodb server database. You need to change the value of dbpath at line 8 to point to the directory where you want to store the data of the database. You also need to change the value of logpath to point to the mongod.log file in the logs directory, this where the database logs information. By default the the server listen at localhost at PORT 5000.
