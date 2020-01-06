import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Form, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ListTasks} from '../../shared/task.model';
import {TaskService} from '../task.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-task-google-keep-ui',
  templateUrl: './new-task-google-keep-ui.component.html',
  styleUrls: ['./new-task-google-keep-ui.component.css']
})
export class NewTaskGoogleKeepUiComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('taskElement', {static: true}) tasksEle: ElementRef;
  @ViewChild('taskNewValue', {static: true}) tasksNewValue: ElementRef;
  taskForm: FormGroup;
  minDate = new Date();
  listOfTasks: ListTasks[] = [];
  subsData: Subscription;

  constructor(private taskService: TaskService, private renderer2: Renderer2) {
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
    console.log(this.taskForm);
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

  onChangeOldStatusTask(e: any, i: number) {
    if (e.target.checked) {
    } else {

    }
  }

  ngAfterViewInit(): void {
    // this.renderer2.selectRootElement('input').focus();
  }

  onNewTask(e: KeyboardEvent) {
    (this.taskForm.get('tasks') as FormArray).push(new FormGroup({
      name: new FormControl(e.key, Validators.required),
      createdAt: new FormControl(new Date()),
      status: new FormControl('available', Validators.required),
      deadline: new FormControl(new Date()),
    }));
    // console.log((this.ele.nativeElement));
    // (this.ele.nativeElement as HTMLElement).focus();
    // this.renderer2.selectRootElement('#ele').focus();
    // console.log((this.tasksEle.nativeElement as HTMLElement).lastChild.previousSibling.lastChild.fo);
    // (this.tasksEle.nativeElement as HTMLElement).lastChild.previousSibling.lastChild.focus();
  }

  onResetForm() {
    (this.taskForm.get('tasks') as FormArray).clear();
    this.taskForm.reset();
  }

  onDeleteTask(index: number) {
    (this.taskForm.get('tasks') as FormArray).removeAt(index);
  }
}
