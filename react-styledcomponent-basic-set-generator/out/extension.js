"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    let disposable = vscode.commands.registerCommand('react-styledcomponent-basic-set-generator.createFile', (uri) => {
        let selectedPath = uri.fsPath;
        console.log("in");
        if (selectedPath) {
            vscode.window.showInformationMessage(selectedPath);
        }
        else {
            vscode.window.showInformationMessage("not selected");
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
// let folderName = vscode.workspace.name; // get the open folder name
// let folderPath = vscode.workspace.rootPath; // get the open folder path
//# sourceMappingURL=extension.js.map