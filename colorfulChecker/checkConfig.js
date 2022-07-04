/* eslint-disable @typescript-eslint/no-var-requires */

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const sampleConfigPath = path.join(__dirname, '..', 'code-checker.sample.js');
let config = require(sampleConfigPath);

const checkConfigConsole = chalk.white(
    chalk.gray('You can check the sample configuration at:\n'),
    chalk.underline(sampleConfigPath)
);

const warningConsole = (chalk) => {
    console.log(
        chalk,
        checkConfigConsole
    );
    console.log('Use default configuration.');
};

module.exports = function checkConfig() {
    const customConfigPath = path.join(process.cwd(), 'code-checker.config.js');

    if (fs.existsSync(customConfigPath)) {
        console.log('\n🔍 code-checker.config.js was found.');
        try {
            let _config = require(customConfigPath);

            if (!_config || typeof config !== 'object') {
                warningConsole(
                    chalk.yellow('⚠️ ', 'Incorrect configuration format.\n')
                );
            } else if (!_config.error_rules) {
                warningConsole(
                    chalk.yellow('❓ key ', chalk.bold.underline('error_rules'), ' wasn\'t exist.\n')
                );
            } else if (!Array.isArray(_config.error_rules)) {
                warningConsole(
                    chalk.yellow('⚠️ ', chalk.bold.underline('error_rules'), ' should be an array.')
                );
            } else if (!_config.invalid_tags) {
                warningConsole(
                    chalk.yellow('❓ key ', chalk.bold.underline('invalid_tags'), ' wasn\'t exist.\n')
                );
            } else if (!Array.isArray(_config.invalid_tags)) {
                warningConsole(
                    chalk.yellow('⚠️ ', chalk.bold.underline('invalid_tags'), ' should be an array.')
                );
            } else {
                config = _config;
                console.log(chalk.green('✅ code-checker.config.js loaded successfully.\n'));
            }
        } catch(e) {
            warningConsole(
                chalk.yellow('⚠️ ', 'Incorrect configuration format.\n')
            );
        }
    } else {
        console.log('\ncode-checker.config.js wasn\'t exist.');
        console.log(
            chalk.gray('\nUse default configuration instead.')
        );
    }

    return config;
};