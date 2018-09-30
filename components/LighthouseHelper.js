const ReportHelper = require('./ReportHelper');
const execSync = require('child_process').execSync;

module.exports = class LighthouseHelper {

  static analyze(target, options) {
    const outPath = ReportHelper.getOutPath(target, 'lighthouse');
    const command = `lighthouse ${target.url} --output-path ${outPath} ${options}`;
    console.log('[INFO] ' + command);
    execSync(command);
  }

}
