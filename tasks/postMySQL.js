const MySQLHelper = require('../components/MySQLHelper');
const mysqlEnv = require('../configs/mysqlEnv.json');

const latestJsonArray = require(__dirname + '/../' + 'reports/latest.json');

mySQLHelper = new MySQLHelper(mysqlEnv);

latestJsonArray.forEach(latestJson => {
  mySQLHelper.createLighthouse(latestJson);
});
