enum ProjectStatus {
  Active,
  Finished,
}
// by using enum here it's possible to get auto-correction.

class Project {
  /* the reason for implementing this as a class instead of let's say an interface
or a type is because with this approach it's now possible to instantiate a new object
that's typed correctly. Alternatively you could get the same result with an Interface, 
but then you would create a new object with the type Project instead. */
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener<T> = (items: T[]) => void;
// this is to type the listener-fn

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn); //this add a function to the list of listeners
  }
}
//Project State Manager
class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }
  /* this static getInstance()-block ensure that theres a global accessable instance of the class ProjectState. */

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // the call of .slice() is done in order to get a copy of the project.
    }
  }
}

const projectState = ProjectState.getInstance(); //by calling this method, we retrieve if there's an existing ProjectState or simply a newly created ProjectState-instance if there is none.

//implementation of validate()
interface Validatable {
  value: string | number;
  required: boolean;
  minLength?: number; // this checks the length of the value
  maxLength?: number; // this checks the length of the value
  min?: number; // this checks the actual value
  max?: number; // this checks the actual value
}

function validate(validationInput: Validatable) {
  let isValid = true;

  if (validationInput.required) {
    isValid = isValid && validationInput.value.toString().trim().length !== 0;
  }
  if (
    validationInput.minLength != null &&
    typeof validationInput.value === 'string'
  ) {
    isValid =
      isValid && validationInput.value.length > validationInput.minLength;
  }
  if (
    validationInput.maxLength != null &&
    typeof validationInput.value === 'string'
  ) {
    isValid =
      isValid && validationInput.value.length < validationInput.maxLength;
  }
  if (
    validationInput.min != null &&
    typeof validationInput.value === 'number'
  ) {
    isValid = isValid && validationInput.value >= validationInput.min;
  }
  if (
    validationInput.max != null &&
    typeof validationInput.value === 'number'
  ) {
    isValid = isValid && validationInput.value <= validationInput.max;
  }
  return isValid;
}

// autobind decorator
/* function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
} */
/* For some reason the Autobind-decorator doesn't work properly. It returns as "undefined" */

abstract class BaseClass<T extends HTMLElement, U extends HTMLElement> {
  // here the generic types T and U are used.
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtBeginning: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedContent = document.importNode(
      this.templateElement.content,
      true
    );
    //this will import the content of whatever the content is of the template.

    this.element = importedContent.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
      //the above line set the id of the HTMLElement to it's type, i.e. active-projects
    }
    this.attach(insertAtBeginning);
  }
  private attach(insertAtBeginning: boolean) {
    /* similar to the attach()-method implemented in class ProjectInput this method is responsible for "attaching" the hostElement to the "this"-keyword, but here before the end of the div-tag with id='app' */

    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'beforebegin' : 'afterbegin', //inline IF/ELSE statement, to determine location where element should be inserted...
      this.element
    ); //when calling this method, this will insert the imported template-HTML and insert this after the "opening-tag" of our div "app"
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

class ProjectItem extends BaseClass<HTMLUListElement, HTMLLIElement> {
  private project: Project;

  get persons() {
    /* this getter enables a method in the this.keyword and make sure to return the correct wording. */
    if (this.project.people === 1) {
      return '1 person';
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  configure() {}
  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}

class ProjectList extends BaseClass<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[];
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', true, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  configure() {
    projectState.addListener((projects: Project[]) => {
      const filteredProjects = projects.filter((prj) => {
        // the .filter function is built in and expect to get a critera to filter either true/false.
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
          //so, if the type is 'active' then return the enum-status from ProjectStatus.Active
        }
        return prj.status === ProjectStatus.Finished;
        //else return the enum-status from ProjectStatus.Finished
      });
      this.assignedProjects = filteredProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    /* this method is used to render the content that was first attached with the attach() method */
    const listId = `${this.type}-project-list`; // this sets the id-property on the <ul>-tag
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS'; //this is reponsible for adding the text content, i.e. the <h2>-title
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-project-list`
    )! as HTMLUListElement;
    //the above line make sure to fetch the newly created <ul>-object. And using TypeCasting to tell TS that the fetched object is a HTMLUListElement.

    listEl.innerHTML = '';
    // by adding this line, we ensure that what's about to get rendered is empty and will therefore remove the issue with duplication-rendering. This way works fine in this project, but for a larger project it would cause some performance issues, i.e. using more memory than necessary.

    for (const prjItems of this.assignedProjects) {
      //here we're looping through the array of projects that exists in this.assignedProjects-array.
      new ProjectItem(this.element.querySelector('ul')!.id, prjItems);
    }
  }
}

class ProjectInput extends BaseClass<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  //these fields are the elements inside the form. Elements which we'll want to access.

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputElement = this.element.querySelector(
      '#title'
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    )! as HTMLInputElement;
    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler.bind(this));
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    //by adding 'void' to the method we tell TS that the method can return nothing/undefined
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('invalid input, make sure all fields are filled');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }
  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people); // this line adds the input values received from the user in the form and then upon clicking submit, this will add the new project to the projects-array in the instance of ProjectState.
      this.clearInputs();
    }
  }
}

const prjIn = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
