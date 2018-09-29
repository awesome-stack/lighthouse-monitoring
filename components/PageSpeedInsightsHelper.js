const ReportHelper = require('./ReportHelper');
const execSync = require('child_process').execSync;

const PSI_API_URL = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed';

module.exports = class PageSpeedInsightsHelper {

  static analyze(target, apiKey) {
    if (apiKey === undefined) {
      console.log('Please set the api key.');
      return;
    }
    const outPath = ReportHelper.getOutPath(target, 'psi.report.json');
    const command = `curl -s "${PSI_API_URL}?strategy=mobile&key=${apiKey}&url=${target.url}" -o ${outPath}`;
    console.log('[INFO] ' + command);
    execSync(command);
  }

}
