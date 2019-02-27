// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');


// // this method is called when your extension is activated
// // your extension is activated the very first time the command is executed
// function activate(context) {

//     // Use the console to output diagnostic information (console.log) and errors (console.error)
//     // This line of code will only be executed once when your extension is activated
//     console.log('Congratulations, your extension "filesize" is now active!');

//     // The command has been defined in the package.json file
//     // Now provide the implementation of the command with  registerCommand
//     // The commandId parameter must match the command field in package.json
//     let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
//         // The code you place here will be executed every time your command is executed

//         // Display a message box to the user
//         console.error(JSON.stringify(window.activeTextEditor.document.fileName))
//         vscode.window.showInformationMessage('Hello World!');
//     });

//     context.subscriptions.push(disposable);
// }
// exports.activate = activate;

// // this method is called when your extension is deactivated
// function deactivate() {
// }
// exports.deactivate = deactivate;


// 获得当前文件大小
function getCurrentFileSize(statusItem) {
    new Promise((resolve) => {
        let _filepath = vscode.window.activeTextEditor.document.fileName // 获得当前文件的文件路径
        resolve(_filepath)
    }).then((filepath) => {
        let _size = fs.statSync(filepath).size // 获得当前文件大小
        let _sizeText = convertSize(_size)

        // let statusBarRightItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000) 
        statusItem.text = _sizeText
        statusItem.show()
    })
}

// 将文件大小数字格式化展示
function convertSize(size){
    if(size < 1024){
        return `${size} B`
    }else if(size >= 1024 && size < 1048576){
        return `${Math.floor(size / 10.24/100)} KB`
    }else if(size > 1048576){
        return `${Math.floor(size / 10485.76) / 100} MB`
    }
}

function activate() {
    let statusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000)  // 获得状态栏(右)信息
    
    // 一进入IDE执行触发
    getCurrentFileSize(statusItem)

    // 切换活跃编辑器时触发
    vscode.window.onDidChangeActiveTextEditor(function(){
        getCurrentFileSize(statusItem)
    })

    // 保存当前编辑器内容触发
    vscode.workspace.onDidSaveTextDocument(function(){
        getCurrentFileSize(statusItem)
    })
}

exports.activate = activate;