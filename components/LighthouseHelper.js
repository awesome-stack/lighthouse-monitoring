const ReportHelper = require('./ReportHelper');
const execSync = require('child_process').execSync;
const elasticsearch = require('elasticsearch');

module.exports = class LighthouseHelper {

  static analyze(target, options) {
    const outPath = ReportHelper.getOutPath(target, 'lighthouse');
    const command = `lighthouse ${target.url} --output-path ${outPath} ${options}`;
    console.log('[INFO] ' + command);
    execSync(command);
  }

  static postEs(esHost, latestJson) {
    const client = new elasticsearch.Client({
      host: esHost,
      log: 'info'
    });
    client.bulk({
      body: [
        { "index": { "_index": "lighthouse", "_type": "lighthouse" } },
        latestJson,
      ]
    }, function (err, resp) {
      if (err !== undefined) {
        console.log(err);
      } else {
        console.log(resp);
      }
    });
  }

}
