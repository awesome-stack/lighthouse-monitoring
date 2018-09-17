const execSync = require('child_process').execSync;

module.exports = class LighthouseHelper {

  static getReportDirRelativePath(target) {
    return 'reports/' + target.url.replace('://', '/');
  }

  static mkReportDir(rootPath, target) {
    const reportDirPath = rootPath + '/' + this.getReportDirRelativePath(target);
    execSync(`mkdir -p ${reportDirPath}`);
    console.log(reportDirPath);
  }

  static analyze(target) {
    const out_path = this.getReportDirRelativePath(target) + 'lighthouse';
    execSync(`lighthouse ${target.url} --output-path ${out_path} --chrome-flags="--headless" --output json --output html --no-enable-error-reporting`);
  }

}
