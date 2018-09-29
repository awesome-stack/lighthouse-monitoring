const LighthouseHelper = require('../components/LighthouseHelper');
const ReportHelper = require('../components/ReportHelper');
const targets = require('../configs/targets.json');

targets.forEach(target => {
  console.log('[INFO] ' + target.name);
  ReportHelper.mkReportDir(__dirname + '/..', target);
  const apiKey = process.env.PSI_API_KEY;
  LighthouseHelper.analyze(target, apiKey);
});
