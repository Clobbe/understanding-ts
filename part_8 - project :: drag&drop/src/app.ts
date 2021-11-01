class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedContent = document.importNode(
      this.templateElement.content,
      true
    ); //this will import the content of whatever the content is of the template.
    this.element = importedContent.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';
    this.attach();
  }
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element); //when calling this method, this will insert the imported template-HTML and insert this after the "opening-tag" of our div "app"
  }
}

const prjIn = new ProjectInput();
