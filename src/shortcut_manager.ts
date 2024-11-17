import ImageEditor from "./image_editor";

export class ImageEditorShortcutManager {

  protected imageEditor: ImageEditor;

  protected keyboardEventHandler: (event: KeyboardEvent) => void;

  constructor(imageEditor: ImageEditor) {
    this.imageEditor = imageEditor;
    this.keyboardEventHandler = this.handleKeyboardEvent.bind(this);
    document.addEventListener('keydown', this.keyboardEventHandler)
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    const noControlKey = !event.ctrlKey && !event.shiftKey && !event.altKey
    const ctrlOnly = event.ctrlKey && !event.shiftKey && !event.altKey;
    if (event.key === 'Delete' && noControlKey) {
      this.imageEditor.removeActiveObjects();
    } else if (ctrlOnly) {
      console.log(this.imageEditor)
      switch (event.key) {
        case 'z':
          this.imageEditor!.getHistory().undo();
          break;
        case 'y':
          this.imageEditor!.getHistory().redo();
          break;
      }
    }
  }

  destroy() {
    document.removeEventListener('keydown', this.keyboardEventHandler);
  }



}