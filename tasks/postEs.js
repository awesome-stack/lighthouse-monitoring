const LighthouseHelper = require('../components/LighthouseHelper');
const esEnv = require('../configs/esEnv.json');

const esHost = esEnv["host"];
const latestJsonArray = require(__dirname + '/../' + 'reports/latest.json');

latestJsonArray.forEach(latestJson => {
  console.log(latestJson);
  LighthouseHelper.postEs(esHost, latestJson);
});
