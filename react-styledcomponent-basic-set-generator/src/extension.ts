// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('react-styledcomponent-basic-set-generator.createFile', (uri:vscode.Uri) => {
		let selectedPath = uri.fsPath;

		console.log("in")
		
		if(selectedPath){
			vscode.window.showInformationMessage(selectedPath);
		}else{
			vscode.window.showInformationMessage("not selected");
		}  
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

// let folderName = vscode.workspace.name; // get the open folder name
// let folderPath = vscode.workspace.rootPath; // get the open folder path
