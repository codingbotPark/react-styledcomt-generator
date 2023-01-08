import * as vscode from "vscode"

export async function getInputFn({
    placeHolder,prompt,value
}:{
    placeHolder:string,
    prompt:string,
    value:string
}){
    const userText = await vscode.window.showInputBox({
        placeHolder:placeHolder,
        prompt:prompt,
        value:value,
    })
    if (userText === undefined){
        vscode.window.showErrorMessage(`there is no value for "${prompt}"`)
        throw new Error(`there is no value for "${prompt}"`)
    }
    return userText
}