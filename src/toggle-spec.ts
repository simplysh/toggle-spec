import * as vscode from 'vscode';
import * as path from 'path';
import getComplement from './complement';

const { window, workspace } = vscode;

export default async function (paths: string[], onSuccess: any) {
  const exclude = workspace.getConfiguration('search.exclude');

  const active = window.activeTextEditor;

  // no editor actively open
  if (!active) {
    return window.showInformationMessage(`You need to have a file open to use Toggle Spec.`);
  }

  const name = path.basename(active.document.fileName);
  const targetName = getComplement(name);

  // couldn't figure out the file complement
  if (!targetName) {
    return window.showErrorMessage(`The current file type is not supported.`);
  }

  for (const basepath of paths) {
    const files = await workspace.findFiles(`${basepath}/**/${targetName}`, '', 1);

    if (files.length) {
      const document = await workspace.openTextDocument(files[0]);

      if (document) {
        window.showTextDocument(document);
        onSuccess(basepath);
        return;
      }
    }
  }

  window.showErrorMessage(`Can\'t find a file named '${targetName}' in the current workspace.`);

  return undefined;
}
