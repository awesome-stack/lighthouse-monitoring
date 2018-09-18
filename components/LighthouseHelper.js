const execSync = require('child_process').execSync;
const fs = require('fs');
const moment = require('moment');

const REPORT_DIR_NAME = 'reports';

module.exports = class LighthouseHelper {

  static getReportDirRelativePath(target) {
    return target.url.replace('://', '/');
  }

  static mkReportDir(rootPath, target) {
    const reportDirPath = rootPath + '/' + REPORT_DIR_NAME + '/' + this.getReportDirRelativePath(target);
    execSync(`mkdir -p ${reportDirPath}`);
    console.log(reportDirPath);
  }

  static getOutPath(target) {
    const now = moment().utcOffset(+9).format("YYYY-MM-DDTHH:mm:ss");
    return REPORT_DIR_NAME + '/' + this.getReportDirRelativePath(target) + now + '_lighthouse';
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
      "first-contentful-paint": Math.round(reportJson.audits["first-contentful-paint"].rawValue),
      "first-meaningful-paint": Math.round(reportJson.audits["first-meaningful-paint"].rawValue),
      "speed-index": Math.round(reportJson.audits["speed-index"].rawValue),
      "first-cpu-idle": Math.round(reportJson.audits["first-cpu-idle"].rawValue),
      "time-to-interactive": Math.round(reportJson.audits["interactive"].rawValue),
      "estimated-input-latency": Math.round(reportJson.audits["estimated-input-latency"].rawValue),
    }
  }

  static summary(rootPath, targets) {
    let latestArray = [];
    targets.forEach(target => {
      const reportDirPath = rootPath + '/' + REPORT_DIR_NAME + '/' + this.getReportDirRelativePath(target);
      const fileNames = fs.readdirSync(reportDirPath).filter(fileName => {
        return fileName.match(/_lighthouse.report.json/);
      });
      let summaryArray = [];
      for (let i = 0; i < fileNames.length; i++) {
        const fileName = fileNames[i];
        const datetimeText = fileName.replace('_lighthouse.report.json', '');
        const reportJson = require(reportDirPath + '/' + fileName);
        const summaryJson = this.getSummaryJson(reportJson, datetimeText);
        summaryArray.push(summaryJson);
        if (i === fileNames.length - 1) {
          let latestJson = Object.assign({
            "name": target.name,
            "url": target.url,
            "path": (this.getReportDirRelativePath(target) + '/summary.json').replace('//', '/'),
          }, summaryJson);
          latestArray.push(latestJson);
        }
      }
      fs.writeFileSync(reportDirPath + '/summary.json', JSON.stringify(summaryArray));
    });
    fs.writeFileSync(rootPath + '/' + REPORT_DIR_NAME + '/latest.json', JSON.stringify(latestArray));
  }

}
