const fs = require('fs');
const chalk = require('chalk');
const recursive = require('recursive-readdir');
const isImage = require('is-image');
var readline = require('readline');

function sleep(ms) {
    return new Promise((res) => {
        setTimeout(() => res(), ms);
    });
}

module.exports = async function checkTags(tags) {
    if (fs.existsSync('./src')) {
        let files = await recursive('./src');
        files = files.filter((file) => !isImage(file));

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const data = await fs.promises.readFile(file, 'utf-8');
            const dataLines = data.split(/\r?\n/);
            for (let i = 0; i < dataLines.length; i++) {
                const line = dataLines[i];

                for (let j = 0; j < tags.length; j++) {
                    const tag = tags[j];
                    if (line.indexOf(tag) !== -1) {
                        console.log(
                            chalk.white('\n\nat '),
                            chalk.underline(file + `:${i+1}:${line.indexOf(tag)+1}\n`),
                            chalk.gray(`${i+1}:${line.indexOf(tag)+1}`),
                            chalk.red(` ❌ ERROR `),
                            'found invalid identifier ',
                            chalk.bgRgb(150, 0, 0)(
                                chalk.bgRgb(100, 0, 0)(
                                    chalk.bgRgb(70, 0, 0)(' '),
                                    ' '
                                ),
                                `${tag}`,
                                chalk.bgRgb(100, 0, 0)(
                                    ' ',
                                    chalk.bgRgb(70, 0, 0)(' \n')
                                )
                            )
                        );
                        process.exit(1);
                    }
                }
            }

            readline.clearLine(process.stdout);
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`[${
                // (i + 1) / files.length * 100
                Math.round((i + 1) / files.length * 100)
            }%] ` + chalk.gray(file));

            await sleep(10);
        }

        return true;
    } else {
        console.log(
            chalk.yellow('Folder ./src wasn\'t exist.\n'),
            chalk.gray('Skip tag scanning.')
        );

        return false;
    }
};