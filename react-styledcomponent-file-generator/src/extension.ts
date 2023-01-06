import * as vscode from 'vscode';
import { createNewFileService } from './service/createNewFileService';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('react-styledcomponent-file-generator.createFile', () => {
		createNewFileService()
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
