export class Component {
  private el: HTMLElement;

  constructor(innerHTML = 'Hello, webpack-typescript-boilerplate') {
    this.el = document.createElement('div');
    this.innerHTML(innerHTML);
  }

  get element(): HTMLElement {
    return this.el;
  }

  innerHTML(innerHTML: string): void {
    this.el.innerHTML = innerHTML;
  }
}
