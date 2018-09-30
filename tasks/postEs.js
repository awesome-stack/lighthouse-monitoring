const ElasticsearchHelper = require('../components/ElasticsearchHelper');
const esEnv = require('../configs/esEnv.json');

const esHost = esEnv['host'];
const latestJsonArray = require(__dirname + '/../' + 'reports/latest.json');
const indexName = 'web_performance';

latestJsonArray.forEach(latestJson => {
  console.log(latestJson);
  ElasticsearchHelper.postEs(esHost, indexName, latestJson);
});
