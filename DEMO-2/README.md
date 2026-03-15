# 📦 本地仓库 · 简易商城

一个基于 SQLite + Express 的本地数据库演示项目，实现简单的商品管理功能。

## 项目结构

```
local-db-demo/
├── server.js          # Express 后端服务器
├── db.js             # SQLite 数据库操作模块
├── index.html        # 前端页面
├── cli.js            # 命令行工具（待完善）
├── package.json      # 项目配置
└── .gitignore        # Git 忽略文件
```

## 功能特性

- ✅ 商品列表展示
- ✅ 新增商品
- ✅ 库存扣减（下单）
- ✅ 删除商品
- ✅ RESTful API
- ✅ 实时数据刷新（3 秒自动更新）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动后端服务

```bash
node server.js
```

服务将运行在 `http://localhost:3000`

### 3. 打开前端页面

直接在浏览器中打开 `index.html` 文件，或者使用 Live Server 等工具。

## API 接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/api/products` | 获取所有商品 |
| POST | `/api/products` | 新增商品 |
| PUT | `/api/products/:id/stock` | 扣减库存 |
| DELETE | `/api/products/:id` | 删除商品 |

## 技术栈

- **后端**: Node.js + Express.js
- **数据库**: SQLite3
- **前端**: 原生 HTML/CSS/JavaScript
- **API**: RESTful

## 注意事项

- 首次运行时会自动创建 SQLite 数据库文件（data.db）
- 数据库文件已添加到 `.gitignore`，不会被提交到 Git
- 确保端口 3000 未被占用

## License

ISC
