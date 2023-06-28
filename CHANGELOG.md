# Change Log
All notable changes to this project will be documented in this file.

## [0.0.5] - 2023-06-28
### Added
- 错误处理和警告提示：代码中的各个函数现在都会在遇到错误时抛出错误，并通过`vscode.window.showErrorMessage`在VSCode中显示错误信息。这包括创建目录、读取模板文件、写入文件时可能会出现的错误。

## [0.0.1] - 2023-06-27
### Added
- 初始版本：实现了通过VSCode命令在选择的文件夹中创建特定的项目结构。用户可以选择创建`views`或`models`模式的项目结构，并为其指定模块名称。
