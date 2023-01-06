/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeRSCWithMenu = void 0;
const vscode = __webpack_require__(1);
const makeRSFile_1 = __webpack_require__(3);
/**
 * folder 선택으로 RSC생성
 * 따라서 folderPath를 가져오는 작업을 하고 makeRSFile함수를 실행
 */
async function makeRSCWithMenu(folder) {
    if (folder) { // clipboard를 활용해 path를 가져온다
        // 원래 복사한 것
        const originClipboard = await vscode.env.clipboard.readText();
        await vscode.commands.executeCommand('copyFilePath');
        const folderPath = await vscode.env.clipboard.readText();
        await vscode.env.clipboard.writeText(originClipboard);
        (0, makeRSFile_1.makeRSFile)(folderPath);
    }
}
exports.makeRSCWithMenu = makeRSCWithMenu;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeRSFile = void 0;
const vscode = __webpack_require__(1);
const getFSPathFn_1 = __webpack_require__(4);
const getInputFn_1 = __webpack_require__(5);
const createNewFileFn_1 = __webpack_require__(6);
const staticContent_1 = __webpack_require__(7);
/**
 *
 * @param folderPath folder의 path, 없다면 현재 WS의 위치이다
 */
function makeRSFile(folderPath = (0, getFSPathFn_1.getFSPath)()) {
    let language = vscode.workspace
        .getConfiguration("CRSC-format")
        .get("FileExtension");
    /**@todo mac일 때를 테스트해보기 to 홍센세 */
    let userText = `${folderPath}\\${folderPath.split("\\").at(-1)}.${language}x`;
    (0, getInputFn_1.getInputFn)({
        placeHolder: "[fileNameWithPath].[jsx|tsx]",
        prompt: `create new 'CRSC' file => [fileNameWithPath].[jsx|tsx], selected language is ${language}x (extension can be set with 'CRSC-format.FileExtension')`,
        value: userText,
    }).then(async (componentPath) => {
        // 선택된 폴더도 없고, 입력도 되지 않았을 때
        if (componentPath === "") {
            vscode.window.showErrorMessage("do not work because there is no selected file & entered file name");
            return;
        }
        /**@todo 생성할 때 이미있는 파일이면 link만 시키기 */
        // jsx | tsx와 style.js | ts를 만들어준다
        await (0, createNewFileFn_1.createNewFileFn)(componentPath).then(() => { });
        // 확장자는 하나뿐이기 때문에 . 을 사용
        const styledFilePath = `${componentPath.split(".")[0]}.style.${language}`;
        await (0, createNewFileFn_1.createNewFileFn)(styledFilePath).then(async () => {
            let uri = vscode.Uri.file(styledFilePath);
            const workspaceEdit = new vscode.WorkspaceEdit();
            const position = new vscode.Position(0, 0);
            workspaceEdit.insert(uri, position, staticContent_1.styleFile);
            const success = await vscode.workspace.applyEdit(workspaceEdit);
        });
        vscode.commands.executeCommand("vscode.open", vscode.Uri.file(componentPath));
    });
}
exports.makeRSFile = makeRSFile;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFSPath = void 0;
const vscode = __webpack_require__(1);
function getFSPath() {
    if (vscode.workspace.workspaceFolders !== undefined) {
        // window
        // let wf = vscode.workspace.workspaceFolders[0].uri.path ;
        // let uri = vscode.Uri.file(f+"/hi");
        // let success = await vscode.commands.executeCommand('vscode.openFolder', uri);
        let f = vscode.workspace.workspaceFolders[0].uri.fsPath;
        vscode.window.showInformationMessage(f);
        return f;
    }
    else {
        let message = "YOUR-EXTENSION: Working folder not found, open a folder an try again";
        vscode.window.showErrorMessage(message);
    }
    throw new Error("error on getFSPathFn");
}
exports.getFSPath = getFSPath;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getInputFn = void 0;
const vscode = __webpack_require__(1);
async function getInputFn({ placeHolder, prompt, value }) {
    const userText = await vscode.window.showInputBox({
        placeHolder: placeHolder,
        prompt: prompt,
        value: value,
    });
    if (userText === undefined) {
        vscode.window.showErrorMessage(`there is no value for "${prompt}"`);
        throw new Error(`there is no value for "${prompt}"`);
    }
    return userText;
}
exports.getInputFn = getInputFn;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createNewFileFn = void 0;
const vscode = __webpack_require__(1);
async function createNewFileFn(path) {
    let WSEdit = new vscode.WorkspaceEdit();
    const filePath = vscode.Uri.file(path);
    WSEdit.createFile(filePath);
    await vscode.workspace.applyEdit(WSEdit);
}
exports.createNewFileFn = createNewFileFn;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.styleFile = void 0;
exports.styleFile = `\
import styled from "styled-components";

export const Wrapper = styled.div\`

\`

`;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
const makeRSCWithMenu_1 = __webpack_require__(2);
const makeRSFile_1 = __webpack_require__(3);
function activate(context) {
    let getWithCommand = vscode.commands.registerCommand('react-styledcomponent-file-generator.createRSC', () => {
        (0, makeRSFile_1.makeRSFile)();
    });
    let getWithMenu = vscode.commands.registerCommand('react-styledcomponent-file-generator.createRSCWithMenu', async (folder) => {
        (0, makeRSCWithMenu_1.makeRSCWithMenu)(folder);
    });
    context.subscriptions.push(getWithCommand, getWithMenu);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map