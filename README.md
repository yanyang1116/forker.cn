# forker.cn

先 csr，晚点在改 ssr

## husky v8 的安装流程

1. 安装 @commitlint/cli、@commitlint/config-conventional、husky、lint-staged
2. 配置 commitlint.config.js、在 package.json 中配置 lint-staged 相关参数
3. 配置本目录命令: husky install 并运行（当然全局或者 npx 也可以）
4. npx husky add .husky/pre-commit "npm test" (npm test 预检测时会运行的脚本)
5. git add .husky/pre-commit git commit -m "把生成的内容提交"
6. npx husky add .husky/commit-msg 'npx --no -- commitlint --edit'（用 npx 生成 commitlint 文件）

此时，package.json 中不需要制定任何和 commit-msg 相关的内容，commit-msg 会根据 commitlint.config.js 运行
lint-staged 建议在 package.json 中指定
` "lint-staged": { "*.{js,jsx,ts,tsx}": [ "git add" ] }`

这个 git add 是为了下面这一些格式化，然后做的一个命令，如果不配合下面这些格式化，实际上没太大意义

husky TODO:

-   ts
-   eslint 格式化
-   prettierrc 格式化

`"prettier": "prettier --write ."` 这个命令在 `lint staged` 的时候应该写成 `"prettier": "prettier --write"` 只覆盖当前

es lint、ts lint、style lint TODO

## webpack https 调试 TODO

## 生产模式 dll，ts fork 优化 TODO

## 生产配置 TODO

## tsconfig 和目前 webpack 关系

## webpack 5 代理？？？

## 前端监控及用户行为复现的思路

TODO:

1. 行为日志，按日维度，直接打数据包

-   分完数据包，直接断点续传
-   传递完成，删除分完的包

2. 错误日志，上传最近 1 小时的数据操作

-   也要分包，断点续传
-   传完删除分包

3. 源数据什么时间点删除？

-   行为日志操作完成后，删除前天之前的

4. 上传日志、分包都要用 webwork；store、state 的读写可以不用，因为最好是同步的，让数据真正写入
