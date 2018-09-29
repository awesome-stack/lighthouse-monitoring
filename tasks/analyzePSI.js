const PageSpeedInsightsHelper = require('../components/PageSpeedInsightsHelper');
const ReportHelper = require('../components/ReportHelper');
const targets = require('../configs/targets.json');

const apiKey = process.env.PSI_API_KEY;
if (apiKey === undefined) {
  console.log('Please set the Environment variable "PSI_API_KEY".');
  return;
}

targets.forEach(target => {
  console.log('[INFO] PageSpeedInsights: ' + target.name);
  ReportHelper.mkReportDir(__dirname + '/..', target);
  PageSpeedInsightsHelper.analyze(target, apiKey);
});
