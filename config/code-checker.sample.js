module.exports = {
    error_rules: [
        'no-console',
        'no-unused-vars',
        'no-debugger'
    ],
    tag_scanning_root: './src',
    invalid_tags: [
        '[DEV]',
        'todo',
        'TODO:',
        'NOTICE:',
        'QUESTION:',
        'WARNING:',
        'ERROR:',
        'APPROVED:',
        'ANSWER:',
        'eslint-disable',
        'var '
    ]
};