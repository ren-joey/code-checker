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

    // process.stdin
    //         .setEncoding("utf8")
    //         .on("error", reject);

    const config = checkConfig();

    console.log(chalk.bold('\n🔍 Checking .eslintrc configuration:'));
    checkRule(config.error_rules);
    console.log(chalk.green('✅ .eslintrc configuration correct.\n'));

    console.log(chalk.bold('\n🔍 Checking development tags:'));
    await checkTags(config.invalid_tags);
    console.log(chalk.green('\n✅ No any invalid identifier was found\n'));
})();