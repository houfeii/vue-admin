# vue-element 后台

> 本项目框架基于[a vue2.0 minimal admin template](https://github.com/PanJiaChen/vue-admin-template/)，更多请移步作者[PanJiaChen](https://github.com/PanJiaChen)

> 该分支新增的 form—making 的 views 页面，并且对 form—making 进行了 2 次开发，不是很好，所有没有 merge 到 main 分支
> 
> [FormMaking](http://docs.form.making.link/)

## 开始

```bash
# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev

# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod

# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```
