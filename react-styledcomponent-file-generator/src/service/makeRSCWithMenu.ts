import * as vscode from "vscode"
import { makeRSFile } from "./makeRSFile";

/** 
 * folder 선택으로 RSC생성
 * 따라서 folderPath를 가져오는 작업을 하고 makeRSFile함수를 실행
 */
export async function makeRSCWithMenu(folder:string){
    if (folder){ // clipboard를 활용해 path를 가져온다
        // 원래 복사한 것
        const originClipboard = await vscode.env.clipboard.readText();

        await vscode.commands.executeCommand('copyFilePath');
        const folderPath = await vscode.env.clipboard.readText();

        await vscode.env.clipboard.writeText(originClipboard);

        makeRSFile(folderPath)
    }
}