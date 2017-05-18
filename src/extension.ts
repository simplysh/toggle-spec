'use strict';

import * as vscode from 'vscode';
import toggleSpec from './toggle-spec';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.toggleSpec', toggleSpec.bind(this, vscode));

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
