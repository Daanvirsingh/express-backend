const Pool = require("pg").Pool;
var logger = require("./logger");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432
});

async function insertQuery(sql, input) {
  var stack = new Error().stack;
  stack = stack.split("\n")[2];
  return await new Promise((resolve, reject) => {
    pool.query(sql, input, (error, results) => {
      if (error) {
        logger.log("error", error, stack);
        resolve(error);
        throw error;
      }
      logger.log("info", sql, stack);
      resolve(results);
    });
  });
}

async function executeQuery(sql) {
  var stack = new Error().stack;
  stack = stack.split("\n")[2];
  return await new Promise((resolve, reject) => {
      pool.query(sql, (error, results) => {
    if (error) {
      logger.log("error", sql, stack);
      resolve(error);
      throw error;
    } 
    logger.log("info", sql, stack);
    resolve(results);
    })
  });
}

module.exports.insertQuery = insertQuery;
module.exports.executeQuery = executeQuery;
