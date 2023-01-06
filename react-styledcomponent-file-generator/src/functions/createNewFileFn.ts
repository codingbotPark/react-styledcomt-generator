import * as vscode from "vscode"

export async function createNewFileFn(path:string){
    let WSEdit = new vscode.WorkspaceEdit();

    const filePath = vscode.Uri.file(path)
    WSEdit.createFile(filePath);
    await vscode.workspace.applyEdit(WSEdit);
}