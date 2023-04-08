module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['off', 2],
        'eol-last': 0,
        "func-call-spacing": 0,
        "object-curly-spacing": 0,
        quotes: 0,
        semi: 0,
        "space-before-blocks": 0,
        "keyword-spacing": 0,
        "space-before-function-paren": 0,
        "key-spacing": 0,
        "no-trailing-spaces": 0,
        "vue/no-mutating-props": 0,
        "no-undef": 0
    }
}