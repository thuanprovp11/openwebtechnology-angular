export class Task {
  constructor(public name: string, public createdAt: Date, public status: string, public deadline: Date) {
  }
}

export class ListTasks {
  constructor(public categoryName: string, public tasks: Task[]) {
  }
}
