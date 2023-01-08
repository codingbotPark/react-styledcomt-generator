import * as vscode from "vscode"

/** 주어진 파일에 주어진 문자열을 추가 */
export async function addContentFn({
    filePath,
    replaceStr
}:{
    filePath:string,
    replaceStr:string
}){
    const uri = vscode.Uri.file(filePath);
    const WSEdit = new vscode.WorkspaceEdit();
    const position = new vscode.Position(0,0);
    WSEdit.insert(uri,position,replaceStr);
    const success = await vscode.workspace.applyEdit(WSEdit);
    return success
}