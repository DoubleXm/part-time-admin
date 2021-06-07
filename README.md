1, element 按需引入官网下载的插件会报错, 可以下载 `npm install babel-preset-env@next -D` 并且修改 `babel.config.js` 文件内容

```
{
  presets: ["@vue/cli-plugin-babel/preset", ["env", { "modules": false }]],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
};
``` 

代码提交测试