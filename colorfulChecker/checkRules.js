/* eslint-disable @typescript-eslint/no-var-requires, max-len */
const chalk = require('chalk');

const eslintrc = require('../../../.eslintrc.js');
module.exports = function checkRules(rules) {
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];

        if (eslintrc.rules[rule] !== 'error') {
            console.log(
                chalk.red.bold(`❌ '${rule}': '${eslintrc.rules[rule]}' → `),
                chalk.red(`it supposed to be 'error'.\n`),
                chalk.gray('if you want to allow it from develop mode. You can try this:\n'),
                chalk.gray(
                    `'${rule}': process.env.NODE_ENV === 'production' ? 'error' : '${eslintrc.rules[rule]}'\n`
                )
            );
            process.exit(1);
        }
    }
};
