const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

module.exports = function checkRules(config) {
    const rules = config.error_rules;
    const lintPath = path.join(process.cwd(), '.eslintrc.js');

    if (fs.existsSync(lintPath)) {
        const eslintrc = require(lintPath);
        let anyError = false;

        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];

            if (eslintrc.rules[rule] !== 'error'
                && eslintrc.rules[rule] !== 2) {
                console.log(
                    chalk.red.bold(`❌ '${rule}': '${eslintrc.rules[rule]}' → `),
                    chalk.red(`it supposed to be 'error'.\n`),
                    chalk.gray('if you want to allow it from develop mode. You can try this:\n'),
                    chalk.gray(
                        `'${rule}': process.env.NODE_ENV === 'production' ? 'error' : '${eslintrc.rules[rule]}'\n`
                    )
                );
                anyError = true;
            }
        }

        if (anyError) process.exit(1);

        return true;
    } else {
        console.log(
            chalk.yellow('.eslintrc.js wasn\'t exist.\n'),
            chalk.gray('Skip eslint rule checking.')
        );

        return false;
    }
};
