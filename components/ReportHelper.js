const execSync = require('child_process').execSync;
const moment = require('moment');

module.exports = class ReportHelper {

  static getReportDirName() {
    return 'reports';
  }

  static getReportDirRelativePath(target) {
    return (target.url.replace('://', '/').replace('?', '') + '/').replace('//', '/');
  }

  static mkReportDir(rootPath, target) {
    const reportDirPath = rootPath + '/' + this.getReportDirName() + '/' + this.getReportDirRelativePath(target);
    execSync(`mkdir -p ${reportDirPath}`);
    console.log('[INFO] ' + reportDirPath);
  }

  static getOutPath(target, suffix) {
    const now = moment().utcOffset(+9).format("YYYY-MM-DDTHH:mm:ss");
    return this.getReportDirName() + '/' + this.getReportDirRelativePath(target) + now + '_' + suffix;
  }

}
