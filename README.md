# Toggle Spec

Jump to the spec/source complement of the current file.

Toggle Spec will search all root-level directories within your project, ignoring `node_modules` and `bower_components`.
Once it found a match, it will learn to prioritize its directory.

![](example/run.gif)

## Usage

### Manual

Press `Ctrl+Shift+P` (`Cmd+Shift+P` on a Mac) to open the Command Pallete and type `Toggle Spec`.

### Keyboard Shortcut

Bind `extension.toggleSpec` to a keybinding.

![](example/bind.gif)

## Configuration

### Exclude Directories

To add directories to the exclude list, use the following configuration key:

```json
"toggleSpec.exclude": [
  "foo",
  "bar"
]
```

Only directories at the root of your project will be taken into account.

## Limitations

Toggle Spec does not currently work with root-level files within your project.
