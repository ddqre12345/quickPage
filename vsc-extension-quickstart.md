# VSC 插件快速入门

本指南将指导您使用 "vsc-extension-quickstart" 模板创建 Visual Studio Code 插件。

## 先决条件

- Node.js（版本 12 或更高）
- Visual Studio Code

## 入门步骤

1. 打开终端并运行以下命令来安装 Yeoman 和 "vsc-extension-quickstart" 生成器：

   ```shell
   npm install -g yo generator-code
   ```

2. 创建一个新的目录用于您的插件项目，并进入该目录：

   ```shell
   mkdir my-extension && cd my-extension
   ```

3. 运行生成器并按照提示进行操作：

   ```shell
   yo code
   ```

   从选项列表中选择 "New Extension (TypeScript)"。

4. 提供插件的相关信息：

   - 插件名称
   - 标识符（例如 `myExtension`）
   - 描述
   - 作者姓名
   - Marketplace 发布者名称（可选）
   - 许可证

5. 生成器完成后，用 Visual Studio Code 打开项目：

   ```shell
   code .
   ```

6. 开始编写您的插件！生成的项目包含一个示例的 "Hello World" 命令，您可以在此基础上进行开发。

## 插件开发

生成的插件项目为您的开发提供了基础。以下是一些重要的文件和目录：

- `src/extension.ts`：您的插件的入口点。您可以在此定义插件的激活事件、注册命令等。
- `package.json`：包含有关插件的元数据，包括名称、描述、版本和依赖项。
- `.vscode/launch.json`：用于调试插件的配置文件。
- `test/extension.test.ts`：包含插件的示例测试。

有关插件开发的更多信息，请参阅官方的 [VS Code 扩展 API 文档](https://code.visualstudio.com/api)。

## 插件发布

要将插件发布到 Visual Studio Code Marketplace，请按照以下步骤操作：

1. 在 [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/) 上创建帐户。
2. 在 `package.json` 文件中使用您的 Marketplace 发布者名称更新 `publisher` 字段。
3. 运行以下命令以打包您的插件：

   ```shell
   vsce package
   ```

4. 使用 [Visual Studio Code CLI](https://code.visualstudio.com/docs/editor/command-line) 登录到 Visual Studio Code Marketplace，运行以下命令：

   ```shell
   code --install-extension <extension-file>.vsix
   ```

   将 `<extension-file>` 替换为生成的插件文件名。

5. 最后，按照 [发布扩展](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) 指南发布您的插件。
