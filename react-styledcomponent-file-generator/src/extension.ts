import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {


	let disposable = vscode.commands.registerCommand('react-styledcomponent-file-generator.createFile', () => {
		vscode.window.showInformationMessage('Hello World from react-styledcomponent file generator!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
