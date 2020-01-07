import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Form, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ListTasks, Task} from '../../shared/task.model';
import {TaskService} from '../task.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-task-google-keep-ui',
  templateUrl: './new-task-google-keep-ui.component.html',
  styleUrls: ['./new-task-google-keep-ui.component.css']
})
export class NewTaskGoogleKeepUiComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('taskElement', {static: true}) tasksEle: ElementRef;
  taskForm: FormGroup;
  minDate = new Date();
  listOfTasks: ListTasks[] = [];
  subsData: Subscription;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.taskForm = new FormGroup({
      categoryName: new FormControl('', Validators.required),
      tasks: new FormArray([])
    });
    this.listOfTasks = this.taskService.onGetListTask();
    this.subsData = this.taskService.newListTask.subscribe((data) => {
      this.listOfTasks = data;
    });
  }

  ngOnDestroy(): void {
    this.subsData.unsubscribe();
  }

  onSubmit() {
    // console.log(this.taskForm);
    if (this.taskForm.valid) {
      this.taskService.onAddNewListTask(this.taskForm.value);
      alert('Save Success');
    } else {
      alert('data not valid');
    }
  }

  onChangeStatusTask(e: any, i: number) {
    if (e.target.checked) {
      // (this.taskForm.get('tasks') as FormArray).controls[i].get('status').value = 'implement';
      // this.taskForm.patchValue();
      (this.taskForm.get('tasks') as FormArray).controls[i].patchValue({status: 'done'});
      // this.taskForm.patchValue();
    } else {
      (this.taskForm.get('tasks') as FormArray).controls[i].patchValue({status: 'implement'});
    }
  }

  onChangeOldStatusTask(e: any, idListTask: number, idTask: number) {
    if (e.target.checked) {
      this.taskService.onChangeStatusTaskById(idListTask, idTask, 'done');
    } else {
      this.taskService.onChangeStatusTaskById(idListTask, idTask, 'implement');
    }
  }

  ngAfterViewInit(): void {
    // this.renderer2.selectRootElement('input').focus();
  }

  onNewTask(e: any) {
    (this.taskForm.get('tasks') as FormArray).push(new FormGroup({
      name: new FormControl(e.target.value, Validators.required),
      createdAt: new FormControl(new Date()),
      status: new FormControl('available', Validators.required),
      deadline: new FormControl(new Date()),
    }));
  }

  onEditTask(e: any, idListTask, idTask) {
    console.log(e.target.value);
    this.taskService.onEditTaskByName(idListTask, idTask, e.target.value);
  }

  onNewTaskOfLoaded(e: any, idListTask: number) {
    // console.log(e, idListTask);
    if (e.target.value !== '') {
      this.taskService.onPushNewTask(idListTask, new Task(e.target.value, new Date(), 'available', new Date()));
      e.target.value = '';
    }
  }

  onResetForm() {
    (this.taskForm.get('tasks') as FormArray).clear();
    this.taskForm.reset();
  }

  onRemoveListTask(id: number) {
    const result = confirm('Do you want to remove this task?');
    if (result) {
      this.taskService.onRemoveListTaskById(id);
    }
  }

  onRemoveTask(idListTask: number, idTask: number) {
    this.taskService.onRemoveTaskById(idListTask, idTask);
  }

  onDeleteTask(index: number) {
    (this.taskForm.get('tasks') as FormArray).removeAt(index);
  }
}
