import * as vscode from 'vscode';
import { makeRSCWithMenu } from './service/makeRSCWithMenu';
import { makeRSFile } from './service/makeRSFile';

export function activate(context: vscode.ExtensionContext) {

	let getWithCommand = vscode.commands.registerCommand('react-styledcomponent-file-generator.createRSC', () => {
		makeRSFile()
	});
	
	
	let getWithMenu = vscode.commands.registerCommand('react-styledcomponent-file-generator.createRSCWithMenu', async (folder) => {
		makeRSCWithMenu(folder)
	});
	
	context.subscriptions.push(getWithCommand,getWithMenu);
}

export function deactivate() {}
