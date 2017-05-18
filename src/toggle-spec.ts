import * as path from 'path';
import getComplement from './complement';

export default async function ({ window, workspace }: any) {
  const active = window.activeTextEditor;

  // no editor actively open
  if (!active) {
    return window.showInformationMessage(`You need to have a file open to use Toggle Spec.`);
  }

  const name = path.basename(active._documentData._uri.path);
  const targetName = getComplement(name);

  // couldn't figure out the file complement
  if (!targetName) {
    return window.showErrorMessage(`The current file type is not supported.`);
  }

  const files = await workspace.findFiles(`**/${targetName}`, '**∕node_modules∕**', 1);

  if (files.length) {
    const document = await workspace.openTextDocument(files[0]);

    if (document) {
      window.showTextDocument(document);
    }
  } else {
    window.showErrorMessage(`Can\'t find a file named '${targetName}' in the current workspace.`);
  }
}
