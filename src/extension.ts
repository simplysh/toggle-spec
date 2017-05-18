import * as vscode from 'vscode';
import toggleSpec from './toggle-spec';
import Finder from './Finder';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const finder = new Finder();

    const trigger = vscode.commands.registerCommand('extension.toggleSpec', () => {
        toggleSpec(finder.getPaths(), finder.promote.bind(finder));
    });

    context.subscriptions.push(finder, trigger);
}

// this method is called when your extension is deactivated
export function deactivate() { }
