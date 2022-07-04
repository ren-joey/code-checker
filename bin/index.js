#!/usr/bin/env node

process.env.NODE_ENV = 'production';

require('v8-compile-cache');
const chalk = require('chalk');
const checkRule = require('../scripts/checkRules');
const checkTags = require('../scripts/checkTags');
const checkConfig = require('../scripts/checkConfig');

(async function main() {
    const config = checkConfig();

    console.log(chalk.bold('\n🔍 Checking .eslintrc configuration:'));
    const ruleRes = checkRule(config);
    if (ruleRes) console.log(chalk.green('✅ .eslintrc configuration correct.'));

    console.log(chalk.bold('\n🔍 Checking development tags:'));
    const tagRes = await checkTags(config);
    if (tagRes) console.log(chalk.green('\n✅ No any invalid identifier was found\n'));
})();