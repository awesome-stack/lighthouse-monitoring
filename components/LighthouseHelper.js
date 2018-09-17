const execSync = require('child_process').execSync;
const fs = require('fs');
const moment = require('moment');

module.exports = class LighthouseHelper {

  static getReportDirRelativePath(target) {
    return 'reports/' + target.url.replace('://', '/');
  }

  static mkReportDir(rootPath, target) {
    const reportDirPath = rootPath + '/' + this.getReportDirRelativePath(target);
    execSync(`mkdir -p ${reportDirPath}`);
    console.log(reportDirPath);
  }

  static getOutPath(target) {
    const now = moment().utcOffset(+9).format("YYYY-MM-DDTHH:mm:ss");
    return this.getReportDirRelativePath(target) + now + '_lighthouse';
  }

  static analyze(target) {
    const outPath = this.getOutPath(target);
    execSync(`lighthouse ${target.url} --output-path ${outPath} --chrome-flags="--headless" --output json --output html --no-enable-error-reporting`);
  }

  static getSummaryJson(reportJson, datetimeText) {
    return {
      "datetime": datetimeText,
      "performance": Math.round(reportJson.categories.performance.score * 100),
      "pwa": Math.round(reportJson.categories.pwa.score * 100),
      "accessibility": Math.round(reportJson.categories.accessibility.score * 100),
      "best-practices": Math.round(reportJson.categories["best-practices"].score * 100),
      "seo": Math.round(reportJson.categories.seo.score * 100),
      "first-contentful-paint": reportJson.audits["first-contentful-paint"].displayValue,
      "first-meaningful-paint": reportJson.audits["first-meaningful-paint"].displayValue,
      "speed-index": reportJson.audits["speed-index"].displayValue,
      "first-cpu-idle": reportJson.audits["first-cpu-idle"].displayValue,
      "time-to-interactive": reportJson.audits["interactive"].displayValue,
      "estimated-input-latency": reportJson.audits["estimated-input-latency"].displayValue,
    }
  }

  static summary(rootPath, targets) {
    targets.forEach(target => {
      const reportDirPath = rootPath + '/' + this.getReportDirRelativePath(target);
      const fileNames = fs.readdirSync(reportDirPath).filter(fileName => {
        return fileName.match(/_lighthouse.report.json/);
      });
      let summaryArray = [];
      fileNames.forEach(fileName => {
        const datetimeText = fileName.replace('_lighthouse.report.json', '');
        const reportJson = require(reportDirPath + '/' + fileName);
        const summaryJson = this.getSummaryJson(reportJson, datetimeText);
        summaryArray.push(summaryJson);
      });
      fs.writeFileSync(reportDirPath + "/summary.json", JSON.stringify(summaryArray));
    });
  }

}
