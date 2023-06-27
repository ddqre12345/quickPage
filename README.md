# QuickPage 插件

QuickPage 插件是适用于 Visual Studio Code 的插件，可根据预定义模板快速创建项目结构。

## 功能

- 创建 Views 和 Models 的项目结构。
- 自定义生成文件的模块名称。

## 系统要求

- Visual Studio Code 版本需不低于 1.79.0。

## 安装

1. 打开 Visual Studio Code。
2. 切换到扩展视图（Ctrl+Shift+X）。
3. 搜索 "QuickPage" 插件。
4. 点击 **安装** 安装插件。
5. 点击 **重新加载** 激活插件。

## 使用方法

1. 在资源管理器视图中，右键单击一个文件夹。
2. 从上下文菜单中选择 **创建项目结构**。
3. 选择要创建项目结构的模式（Views 或 Models）。
4. 输入项目的模块名称。
5. 插件将根据所选模式和模块名称生成所需的目录和文件。

## 项目结构

### Views 模式

```
.
├── less
│   └── index.less
├── locales
│   ├── en.json
│   └── zh.json
├── container
│   └── index.ts
└── utils
    └── index.ts
```

### Models 模式

```
.
├── index.ts
├── effect_request.ts
└── const.ts
```

## 扩展设置

此插件没有可配置的设置项。

## 已知问题

此插件没有已知问题。

## 发行说明

### 0.0.1

- QuickPage 插件的初始版本发布。

## 贡献

欢迎贡献！Fork 仓库并提交 Pull Request。

## 许可证

此插件基于 MIT 许可证。
