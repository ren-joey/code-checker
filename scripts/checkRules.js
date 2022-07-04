/* eslint-disable @typescript-eslint/no-var-requires, max-len */
const chalk = require('chalk');
const fs = require('fs');

module.exports = function checkRules(rules) {
    if (fs.existsSync('./eslintrc.js')) {
        const eslintrc = require('./eslintrc.js');

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

            return true;
        }
    } else {
        console.log(
            chalk.yellow('.eslintrc.js wasn\'t exist.\n'),
            chalk.gray('Skip eslint rule checking.')
        );

        return false;
    }
};
