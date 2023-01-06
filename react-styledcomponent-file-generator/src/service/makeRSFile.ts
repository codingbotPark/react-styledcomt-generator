import * as vscode from "vscode"
import { getFSPath } from "../functions/getFSPathFn"
import { getInputFn } from "../functions/getInputFn"
import { makeNewFileFn } from "../functions/makeNewFileFn"

/**
 * 
 * @param folderPath folder의 path, 없다면 현재 WS의 위치이다
 */
export function makeRSFile(
    folderPath:string = getFSPath()
){
    let language = vscode.workspace.getConfiguration("CRSC-format").get("FileExtension")

    /**@todo mac일 때를 테스트해보기 */
    let userText = `${folderPath}\\${folderPath.split("\\").at(-1)}.${language}x`

    getInputFn({
        placeHolder:"[fileNameWithPath].[jsx|tsx]",
        prompt:`create new 'CRSC' file => [fileNameWithPath].[jsx|tsx], selected language is ${language}x (extension can be set with 'CRSC-format.FileExtension')`,
        value:userText
    }).then((componentPath) => {
        // 선택된 폴더도 없고, 입력도 되지 않았을 때
        if (componentPath === ""){
            vscode.window.showErrorMessage('do not work because there is no selected file & entered file name')
            return
        }

        /**@todo 생성할 때 이미있는 파일이면 link만 시키기 */
        // jsx | tsx와 style.js | ts를 만들어준다
        makeNewFileFn(componentPath)
        // 확장자는 하나뿐이기 때문에 . 을 사용
        const styledFilePath = `${componentPath.split(".")[0]}.style.${language}`
        makeNewFileFn(styledFilePath)
    })
}
