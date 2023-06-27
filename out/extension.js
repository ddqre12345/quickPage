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
    { templateName: 'index.ejs', outputFile: 'index.ts' },
];
const MODELS_TEMPLATE_FILES = [
    { templateName: 'index.ejs', outputFile: 'index.ts' },
    { templateName: 'effect_request.ejs', outputFile: 'effect_request.ts' },
    { templateName: 'const.ejs', outputFile: 'const.ts' },
];
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.createProjectStructure', async (folder) => {
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
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
function createModuleStructure(folderPath, mode, moduleName) {
    const templateFiles = mode === 'views' ? VIEWS_TEMPLATE_FILES : MODELS_TEMPLATE_FILES;
    const moduleDirectories = ['less', 'locales', 'container', 'utils'];
    createDirectories(moduleDirectories.map((dir) => path.join(folderPath, dir)));
    const templateData = { moduleName };
    templateFiles.forEach(({ templateName, outputFile }) => {
        const templateContent = readTemplateFileSync(templateName);
        const renderedContent = ejs.render(templateContent, templateData);
        writeFile(path.join(folderPath, outputFile), renderedContent);
    });
    if (mode === 'views') {
        writeFile(path.join(folderPath, 'const.ts'), '');
        writeFile(path.join(folderPath, 'less', 'index.less'), '');
        writeFile(path.join(folderPath, 'locales', 'en.json'), '{}');
        writeFile(path.join(folderPath, 'locales', 'zh.json'), '{}');
        writeFile(path.join(folderPath, 'utils', 'index.ts'), '');
    }
    else if (mode === 'models') {
        writeFile(path.join(folderPath, 'index.ts'), '');
    }
}
function createDirectories(directoryPaths) {
    directoryPaths.forEach((directoryPath) => {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }
    });
}
function readTemplateFileSync(templateName) {
    const templateFilePath = path.join(__dirname, '../templates/views', templateName);
    return fs.readFileSync(templateFilePath, 'utf8');
}
function writeFile(filePath, content) {
    fs.writeFileSync(filePath, content);
}
//# sourceMappingURL=extension.js.map