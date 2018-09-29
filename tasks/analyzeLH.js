const LighthouseHelper = require('../components/LighthouseHelper');
const ReportHelper = require('../components/ReportHelper');
const targets = require('../configs/targets.json');

// Specify options except output-path.
// c.f.) https://github.com/GoogleChrome/lighthouse#cli-options
let common_options = '--no-enable-error-reporting --output json --output html';

if (process.env.SHOW_CHROME !== 'yes') {
  common_options += ' --chrome-flags="--headless"'
}

targets.forEach(target => {
  console.log('[INFO] Lighthouse: ' + target.name);
  let options = common_options;
  // c.f) https://developers.google.com/web/tools/lighthouse/v3/migration
  if (target.device === 'desktop') {
    console.log('[INFO] as Desktop.');
    console.log('[INFO] No emulation, No throttling.');
    options += ' --emulated-form-factor none'; //"mobile", "desktop", "none" (default: mobile)
    options += ' --throttling-method=provided'; //"devtools", "provided", "simulate" (default: simulate)
  } else {
    console.log('[INFO] as Mobile.');
  }
  // If headers exist, add option.
  if (target.headers !== undefined) {
    const headers_options = JSON.stringify(target.headers).replace(/"/g, '\\\"');
    options += ' --extra-headers ' + headers_options;
  }
  ReportHelper.mkReportDir(__dirname + '/..', target);
  LighthouseHelper.analyze(target, options);
});
