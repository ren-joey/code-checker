/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * 將 node 改為 production 模式
 */
process.env.NODE_ENV = 'production';

require('v8-compile-cache');
const chalk = require('chalk');
const checkRule = require('../colorfulChecker/checkRules');
const checkTags = require('../colorfulChecker/checkTags');
const checkConfig = require('../colorfulChecker/checkConfig');

(async function main() {
    const config = checkConfig();

    console.log(chalk.bold('\n🔍 Checking .eslintrc configuration:'));
    const ruleRes = checkRule(config.error_rules);
    if (ruleRes) console.log(chalk.green('✅ .eslintrc configuration correct.\n'));

    console.log(chalk.bold('\n🔍 Checking development tags:'));
    const tagRes = await checkTags(config.invalid_tags);
    if (tagRes) console.log(chalk.green('\n✅ No any invalid identifier was found\n'));
})();