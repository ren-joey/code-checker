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
    const ruleRes = checkRule(config.error_rules);
    if (ruleRes) console.log(chalk.green('✅ .eslintrc configuration correct.\n'));

    console.log(chalk.bold('\n🔍 Checking development tags:'));
    const tagRes = await checkTags(config.invalid_tags);
    if (tagRes) console.log(chalk.green('\n✅ No any invalid identifier was found\n'));
})();