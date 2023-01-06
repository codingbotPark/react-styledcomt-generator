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
exports.createNewFileService = void 0;
const vscode = __webpack_require__(1);
const getFSPathFn_1 = __webpack_require__(3);
const getInputFn_1 = __webpack_require__(4);
async function createNewFileService() {
    let WSEdit = new vscode.WorkspaceEdit();
    // 기본적인 userText는 현재 열린 파일
    // let userText = "default"
    let userText = settingDefaultValue();
    (0, getInputFn_1.getInputFn)({
        placeHolder: "[newFileName].[extension] (default : js)",
        prompt: "create new 'CRSC' file",
        value: userText
    }).then((ret) => {
        // 선택된 폴더도 없고, 입력도 되지 않았을 때
        if (ret === "") {
            vscode.window.showErrorMessage('do not work because there is no selected file & entered file name');
            return;
        }
        vscode.window.showInformationMessage(ret);
        // 파일 생성
        const filePath = vscode.Uri.file(`${(0, getFSPathFn_1.getFSPath)()}/${ret}`);
        vscode.window.showInformationMessage(filePath.toString());
        WSEdit.createFile(filePath);
        vscode.workspace.applyEdit(WSEdit);
    });
}
exports.createNewFileService = createNewFileService;
function settingDefaultValue() {
    if (false) {}
    else { // 아닐 때, 기본값은 
        return "";
    }
}


/***/ }),
/* 3 */
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
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getInputFn = void 0;
const vscode = __webpack_require__(1);
async function getInputFn({ placeHolder, prompt, value }) {
    const userText = await vscode.window.showInputBox({
        placeHolder: placeHolder,
        prompt: prompt,
        value: value
    });
    if (userText === undefined) {
        vscode.window.showErrorMessage(`there is no value for "${prompt}"`);
        throw new Error(`there is no value for "${prompt}"`);
    }
    return userText;
}
exports.getInputFn = getInputFn;


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
const createNewFileService_1 = __webpack_require__(2);
function activate(context) {
    let disposable = vscode.commands.registerCommand('react-styledcomponent-file-generator.createFile', () => {
        (0, createNewFileService_1.createNewFileService)();
    });
    let disposabl1 = vscode.commands.registerCommand('react-styledcomponent-file-generator.sayHello', async (folder) => {
        let newUri = folder;
        if (folder) { // clipboard를 활용해 path를 가져온다
            // 원래 복사한 것
            const originClipboard = await vscode.env.clipboard.readText();
            await vscode.commands.executeCommand('copyFilePath');
            folder = await vscode.env.clipboard.readText();
            await vscode.env.clipboard.writeText(originClipboard);
            vscode.window.showInformationMessage(folder);
        }
    });
    context.subscriptions.push(disposable, disposabl1);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map