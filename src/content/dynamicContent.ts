import * as vscode from "vscode"

/**
 * @param fileName 되도록이면 파일의 경로를 제외한 파일이름
 * @returns 완성된 react component기본세팅
 */
export function componentContentProvider(fileName:string){

    const styleFileName = getStyleFileName(getFileNameFromPath(fileName))
    const onlyName = fileName.split(".")[0]
    const extension = vscode.workspace.getConfiguration("CRSC-format").get("FileExtension")

    return `\
import React from 'react';
import * as ${styleFileName} from "./${onlyName}.style.${extension}"

const ${onlyName} = () => {
    return (
        <${styleFileName}.Wrapper>

        </${styleFileName}.Wrapper>
    )
}

export default ${onlyName};
`
}

function getStyleFileName(fileName:string){
    let styleFileNamingWay = vscode.workspace.getConfiguration("CRSC-format").get("ImportStyleFileName")
    if (styleFileNamingWay === "ComponentFirstLetter"){
        return fileName[0]
    } else if (styleFileNamingWay === "S"){
        return "S"
    } else if (styleFileNamingWay === "otherThing"){
        let otherLetter = vscode.workspace.getConfiguration("CRSC-format").get("CustomImportName")
        // otherLetter가 아무 것도 없을 때는 그냥 S를 리턴
        return otherLetter ?? "S"
    }
}

function getFileNameFromPath(fileName:string):string{
    const filteredFileName = fileName.split("\\").at(-1)
    if (filteredFileName) {
        return filteredFileName
    } else {
        vscode.window.showErrorMessage("잘못된 fileName이 들어와서 reactFile을 만드는데 실패했습니다")
        throw new Error("잘못된 fileName이 들어왔습니다")
    }
}