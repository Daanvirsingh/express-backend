const chalk = require('chalk');


var logger = exports;
logger.debugLevel = 'warn';
logger.log = function(level, message,stack) {
  
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    };
    level=level.toUpperCase()
    if(level==='ERROR'){
        console.log(chalk.red('['+level+']: ['+stack+']: '+message));
    }else{
        console.log(chalk.cyan('['+level+']: ['+stack+']: '+message));
    }
  }

