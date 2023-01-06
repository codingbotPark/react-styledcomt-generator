import * as vscode from 'vscode';
import { createNewFileService } from './service/createNewFileService';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('react-styledcomponent-file-generator.createFile', () => {
		createNewFileService()
	});
	
	
	let disposabl1 = vscode.commands.registerCommand('react-styledcomponent-file-generator.sayHello', async (folder) => {
		let newUri = folder;
		
		if (folder){ // clipboard를 활용해 path를 가져온다
			// 원래 복사한 것
			const originClipboard = await vscode.env.clipboard.readText();

			await vscode.commands.executeCommand('copyFilePath');
			folder = await vscode.env.clipboard.readText();

			await vscode.env.clipboard.writeText(originClipboard);

			vscode.window.showInformationMessage(folder)
		}
		
	});
	
	context.subscriptions.push(disposable,disposabl1);
}

export function deactivate() {}
