import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as debounce from 'lodash.debounce';

const isDirectory = base => file => fs.lstatSync(path.join(base, file)).isDirectory();
const excludeFrom = list => file => list.indexOf(file) === -1;

export default class Finder extends vscode.Disposable {
  private watcher: vscode.FileSystemWatcher;
  private includes: string[];

  constructor() {
    const watcher = vscode.workspace.createFileSystemWatcher('**/**');
    super(watcher.dispose);

    const thisRegenerateIncludes = debounce(
      this.regenerateIncludes.bind(this),
      10,
      { leading: false, trailing: true }
    );
    watcher.onDidCreate(thisRegenerateIncludes);
    watcher.onDidChange(thisRegenerateIncludes);
    watcher.onDidDelete(thisRegenerateIncludes);
    vscode.workspace.onDidChangeConfiguration(thisRegenerateIncludes);

    this.watcher = watcher;
    this.includes = [];

    this.regenerateIncludes();
  }

  public getPaths(): string[] {
    return this.includes;
  }

  public promote(dirname: string) {
    const hero = this.includes.indexOf(dirname);

    if (hero !== -1) {
      this.includes = [
        this.includes[hero],
        ...this.includes.slice(0, hero),
        ...this.includes.slice(hero + 1)
      ]
    }
  }

  private regenerateIncludes() {
    const { excludes } = vscode.workspace.getConfiguration('toggleSpec');
    const root = vscode.workspace.rootPath;

    this.includes = fs.readdirSync(vscode.workspace.rootPath)
      .filter(isDirectory(root))
      .filter(excludeFrom(['node_modules', 'bower_components']))
      .filter(excludeFrom(excludes || []));
  }
}
