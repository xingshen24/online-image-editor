
export class ConfirmPrompt {

  readonly confirmCallback: () => void;

  readonly cancelCallback: () => void;

  constructor(confirmCallback: () => void, cancelCallback: () => void) {
    this.confirmCallback = confirmCallback;
    this.cancelCallback = cancelCallback;
  }

  showDialog() {

  }

  confirm() {

  }

  cancel() {

  }
}