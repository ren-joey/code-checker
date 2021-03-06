#!/usr/bin/env node

process.env.NODE_ENV = 'production';

require('v8-compile-cache');
const chalk = require('chalk');
const checkRule = require('../scripts/checkRules');
const checkTags = require('../scripts/checkTags');
const checkConfig = require('../scripts/checkConfig');

(async function main() {
    const config = checkConfig();

    console.log(chalk.bold('\nš Checking .eslintrc configuration:'));
    const ruleRes = checkRule(config);
    if (ruleRes) console.log(chalk.green('ā .eslintrc configuration correct.'));

    console.log(chalk.bold('\nš Checking development tags:'));
    const tagRes = await checkTags(config);
    if (tagRes) console.log(chalk.green('\nā No any invalid identifier was found\n'));
})();