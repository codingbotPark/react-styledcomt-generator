import * as vscode from "vscode"

export function makeNewFileFn(path:string){
    let WSEdit = new vscode.WorkspaceEdit();

    const filePath = vscode.Uri.file(path)
    WSEdit.createFile(filePath);
    vscode.workspace.applyEdit(WSEdit);
}