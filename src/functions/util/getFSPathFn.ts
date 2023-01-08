import * as vscode from "vscode"

export function getFSPath(){
    if(vscode.workspace.workspaceFolders !== undefined) {
        // window
        // let wf = vscode.workspace.workspaceFolders[0].uri.path ;
        // let uri = vscode.Uri.file(f+"/hi");
        // let success = await vscode.commands.executeCommand('vscode.openFolder', uri);

        let f = vscode.workspace.workspaceFolders[0].uri.fsPath ; 
        vscode.window.showInformationMessage(f);

        return f    
    } 
    else {
        let message = "YOUR-EXTENSION: Working folder not found, open a folder an try again" ;
    
        vscode.window.showErrorMessage(message);
    }
    throw new Error("error on getFSPathFn")
}

