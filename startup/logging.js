require('express-async-errors');
// require('winston-mongodb');
const winston = require('winston');

module.exports  = function() {
    winston.exceptions.handle(
        new winston.transports.File({filename: 'test.log' })
    )
     
     process.on('unhandledRejection', (ex) => {
         throw ex;
     })
     
     winston.add(new winston.transports.File({
         filename: 'logfile.log'
     }))

    //  winston.add(new winston.transports.Console())

    //  winston.add(new winston.transports.MongoDB({
    //      db: 'mongodb://127.0.0.1:27017/playground',
    //      level: 'info'
    //  }));
}