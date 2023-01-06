import * as vscode from "vscode"
import { getFSPath } from "../functions/getFSPathFn"
import { getInputFn } from "../functions/getInputFn"

export async function createNewFileService(){
    let WSEdit = new vscode.WorkspaceEdit();
    // 기본적인 userText는 현재 열린 파일
    // let userText = "default"
    let userText = ""

    getInputFn({
        placeHolder:"[newFileName].[extension] (default : js)",
        prompt:"create new 'CRSC' file",
        value:userText
    }).then((ret) => {
        // 선택된 폴더도 없고, 입력도 되지 않았을 때
        if (ret === ""){
            vscode.window.showErrorMessage('do not work because there is no selected file & entered file name')
            return
        }

        vscode.window.showInformationMessage(ret)
        
        // 파일 생성
        const filePath = vscode.Uri.file(`${getFSPath()}/${ret}`)
        vscode.window.showInformationMessage(filePath.toString())
        WSEdit.createFile(filePath);
        vscode.workspace.applyEdit(WSEdit);

    })
}