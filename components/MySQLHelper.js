const Sequelize = require('sequelize');

module.exports = class MySQLHelper {

  constructor(mysqlEnv) {
    this.sequelize = new Sequelize(mysqlEnv.database, mysqlEnv.username, mysqlEnv.password, {
      host: mysqlEnv.host,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
      operatorsAliases: false
    });
  }

  createLighthouse(jsonData) {
    jsonData.datetime = new Date(jsonData.datetime);
    const Lighthouse = this.sequelize.define('lighthouse', {
      "datetime": Sequelize.DATE,
      "performance": Sequelize.INTEGER,
      "pwa": Sequelize.INTEGER,
      "accessibility": Sequelize.INTEGER,
      "best-practices": Sequelize.INTEGER,
      "seo": Sequelize.INTEGER,
      "first-contentful-paint": Sequelize.INTEGER,
      "first-meaningful-paint": Sequelize.INTEGER,
      "speed-index": Sequelize.INTEGER,
      "first-cpu-idle": Sequelize.INTEGER,
      "time-to-interactive": Sequelize.INTEGER,
      "estimated-input-latency": Sequelize.INTEGER,
      "time-to-first-byte": Sequelize.INTEGER,
    });
    Lighthouse.sync({
      force: false,
      logging: console.log
    }).then(() => {
      return Lighthouse.create(jsonData);
    }).then(() => {
      return this.sequelize.close();
    });
  }

}
