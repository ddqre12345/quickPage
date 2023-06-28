"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const VIEWS_TEMPLATE_FILES = [
    { templateName: 'cfg.en.ejs', outputFile: 'cfg.en.ts' },
    { templateName: 'cfg.zh.ejs', outputFile: 'cfg.zh.ts' },
    { templateName: 'interface.ejs', outputFile: 'interface.ts' },
    { templateName: 'index.ejs', outputFile: 'index.tsx' },
];
const MODELS_TEMPLATE_FILES = [
    { templateName: 'index.ejs', outputFile: 'index.ts' },
    { templateName: 'effect_request.ejs', outputFile: 'effect_request.ts' },
    { templateName: 'const.ejs', outputFile: 'const.ts' },
];
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.createProjectStructure', async (folder) => {
        try {
            if (!folder) {
                vscode.window.showInformationMessage('请先选择一个文件夹。');
                return;
            }
            const folderPath = folder.fsPath;
            const mode = await vscode.window.showQuickPick(['views', 'models'], { placeHolder: '选择模式' });
            if (!mode) {
                return;
            }
            const moduleName = await vscode.window.showInputBox({ prompt: '输入模块名称' });
            if (!moduleName) {
                return;
            }
            createModuleStructure(folderPath, mode, moduleName);
        }
        catch (error) {
            if (error instanceof Error) {
                vscode.window.showErrorMessage(`创建模块结构出错: ${error.message}`);
            }
            else {
                vscode.window.showErrorMessage(`创建模块结构出错: ${String(error)}`);
            }
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
function createModuleStructure(folderPath, mode, moduleName) {
    try {
        const templateFiles = mode === 'views' ? VIEWS_TEMPLATE_FILES : MODELS_TEMPLATE_FILES;
        const moduleDirectories = ['less', 'locales', 'container', 'utils'];
        const templateData = { moduleName };
        if (mode === 'views') {
            createDirectories(moduleDirectories.map((dir) => path.join(folderPath, dir)));
            templateFiles.forEach(({ templateName, outputFile }) => {
                const templateContent = readTemplateFileSync(templateName, mode);
                if (!templateContent) {
                    throw new Error(`模板文件${templateName}的内容为空或未定义`);
                }
                const renderedContent = ejs.render(templateContent, templateData);
                writeFile(path.join(folderPath, outputFile), renderedContent);
            });
            writeFile(path.join(folderPath, 'const.ts'), '');
            writeFile(path.join(folderPath, 'less', 'index.less'), '');
            writeFile(path.join(folderPath, 'locales', 'en.json'), '{}');
            writeFile(path.join(folderPath, 'locales', 'zh.json'), '{}');
            writeFile(path.join(folderPath, 'utils', 'index.ts'), '');
        }
        else if (mode === 'models') {
            templateFiles.forEach(({ templateName, outputFile }) => {
                const templateContent = readTemplateFileSync(templateName, mode);
                if (!templateContent) {
                    throw new Error(`模板文件${templateName}的内容为空或未定义`);
                }
                const renderedContent = ejs.render(templateContent, templateData);
                writeFile(path.join(folderPath, outputFile), renderedContent);
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            vscode.window.showErrorMessage(`创建模块结构出错: ${error.message}`);
        }
        else {
            vscode.window.showErrorMessage(`创建模块结构出错: ${String(error)}`);
        }
    }
}
function createDirectories(directoryPaths) {
    try {
        directoryPaths.forEach((directoryPath) => {
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath);
            }
        });
    }
    catch (error) {
        if (error instanceof Error) {
            vscode.window.showErrorMessage(`创建项目结构出错: ${error.message}`);
        }
        else {
            vscode.window.showErrorMessage(`创建项目结构出错: ${String(error)}`);
        }
    }
}
function readTemplateFileSync(templateName, mode) {
    try {
        const templateFilePath = path.join(__dirname, `../templates/${mode}`, templateName);
        return fs.readFileSync(templateFilePath, 'utf8');
    }
    catch (error) {
        if (error instanceof Error) {
            vscode.window.showErrorMessage(`读取模板文件出错: ${error.message}`);
        }
        else {
            vscode.window.showErrorMessage(`读取模板文件出错: ${String(error)}`);
        }
    }
}
function writeFile(filePath, content) {
    try {
        fs.writeFileSync(filePath, content);
    }
    catch (error) {
        if (error instanceof Error) {
            vscode.window.showErrorMessage(`写入文件出错: ${error.message}`);
        }
        else {
            vscode.window.showErrorMessage(`写入文件出错: ${String(error)}`);
        }
    }
}
//# sourceMappingURL=extension.js.map