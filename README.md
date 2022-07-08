# ESLINT 設定及關鍵字檢查工具

## 什麼情況需要 code-checker
1. 你正在開發 **前端應用** 且使用 **eslint** 進行代碼驗證
2. 你有在使用至少一個以上的開發用註記，如 `TODO`

## 🍕 code-checker 能做什麼
1. 協助確認組織規定好的 eslint 規範是否在 production 模式被設定妥善，避免不應該出現的代碼被 build 出來。 **換句話說，應該要彈 error 的 rules 不能被關掉！**
1. 檢查代碼中不允許出現在正式環境的 tag 或關鍵字，常見的有 `TODO`、`DEV`、`eslint-disable`
1. 你可以將 code-checker 設定在 github action 來確保 PR 被 merge 前都符合以上條件

## 🚀 安裝
1. 在前端應用透過 npm 進行安裝
```shell
npm install -D code-checker-j
```
2. 在根目錄建立一個檔案，命名為 code-checker.config.js，並將下列設定貼入其中
```js
module.exports = {

    // 應該要被設定為 error 的 .eslintrc rules
    error_rules: [
        'no-console',
        'no-unused-vars',
        'no-debugger'
    ],

    // 要執行 tag 關鍵字檢查的資料夾
    // 備註：圖片檔會自動忽略
    tag_scanning_root: './src',

    // 定義所有的非法關鍵字
    // 備註：不支援正規表達式
    invalid_tags: [
        '[DEV]',
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
```

## 🚩 執行
開始進行代碼驗證
```shell
npx code-checker
```
如果設定成功會看到下列字樣
```shell
# 🔍 code-checker.config.js was found.
# ✅ code-checker.config.js loaded successfully.
#
# 🔍 Checking .eslintrc configuration:
# ✅ .eslintrc configuration correct.
#
# 🔍 Checking development tags:
# [8%] src/@types/viewVariables.ts
#
# at  src/configs/ethConfig.ts:10:80
#  10:80  ❌ ERROR  found invalid identifier      [DEV]
```

## 加入 npm script
開始 `package.json` 進行編輯
```json
{
    "scripts": {
        "build:dev": "DISABLE_ESLINT_PLUGIN=true <your_build_script> build",
        "build": "npm run lint && <your_build_script> build",
        "lint": "code-checker && NODE_ENV=production eslint ./src",
    }
}
```
設定說明
- `"build:dev": "DISABLE_ESLINT_PLUGIN=true <your_build_script> build",`
    - 保留原本的 `build` 並且關閉 eslint 驗證，方便測試環境使用
- `"lint": "code-checker && NODE_ENV=production eslint ./src"`
    - 定義一個名為 `lint` 的 npm-script，先進行 eslint 設定檢查及關鍵字檢查，沒問題後才會再執行 `eslint`
- `"build": "npm run lint && <your_build_script> build"`
    - 先執行 npm-script `lint` ，沒問題之後才會進行 `build`

如果你有使用 typescript 可改用
```json
{
    "scripts": {
        "build": "npm run lint && <your_build_script> build",
        "lint": "code-checker && tsc --noEmit && NODE_ENV=production eslint ./src",
    }
}
```
如果妳有自己的 eslint method 也可改為
```json
{
    "scripts": {
        "build": "npm run lint && <your_build_script> build",
        "lint": "code-checker && tsc --noEmit && NODE_ENV=production <your_lint_script>",
    }
}
```
在 React.js 環境，你的設定會類似
```json
{
    "scripts": {
        "build": "npm run lint && react-scripts build",
        "lint": "code-checker && NODE_ENV=production eslint ./src",
    }
}
```
在 Vue.js 環境，你的設定會類似
```json
{
    "scripts": {
        "build": "npm run lint && vue-cli-service build",
        "lint": "code-checker && NODE_ENV=production vue-cli-service lint"
    }
}
```
單純進行驗證，你可以輸入
```shell
npm run lint
```
如果要驗證並打包
```shell
npm run build
```
